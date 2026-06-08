const titleElement = document.getElementById('details-title');
const ratingElement = document.getElementById('details-rating');
const posterElement = document.getElementById('details-poster');
const yearElement = document.getElementById('details-year');
const genresElement = document.getElementById('details-genres');
const descElement = document.getElementById('details-desc');
const castElement = document.getElementById('details-cast');
const favBtn = document.getElementById('fav-btn');

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjlhZjE3ODhhZjQ2NTA0MzhiNTdhMDU0MzQ0MGNiNyIsIm5iZiI6MTc3MjMwMDMwMC45MTI5OTk5LCJzdWIiOiI2OWEzMjgwY2Q0YWFhNGZiYWNkZThiZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.45vJNS3Y-jtt7uM0pD68V9u4-nSyVkxi2S8HCulZMnU';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const opcjeZapytania = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
    }
};

const savedId = localStorage.getItem('kliknieteID');
const savedType = localStorage.getItem('typMedia') || 'movie';

async function pobierzDetale() {
    if (!savedId) {
        titleElement.innerText = "Nie wybrano żadnego tytułu";
        return;
    }

    try {
        let url = `${API_URL}/${savedType}/${savedId}?language=pl-PL&append_to_response=credits`;
        let odpowiedz = await fetch(url, opcjeZapytania);
        let dane = await odpowiedz.json();

        if (dane.id) {
            wypelnijDane(dane);
            obslugaUlubionych(dane);
        } else {
            titleElement.innerText = "Nie znaleziono tytułu w bazie";
        }

    } catch (error) {
        titleElement.innerText = "Błąd pobierania danych";
    }
}

function wypelnijDane(dane) {
    const tytul = dane.title || dane.name;
    titleElement.innerText = tytul;

    const ocena = dane.vote_average ? dane.vote_average.toFixed(1) + '/10' : 'Brak';
    ratingElement.innerText = `⭐ ${ocena}`;

    const dataWydania = dane.release_date || dane.first_air_date || 'Brak daty';
    yearElement.innerText = `📅 ${dataWydania.split('-')[0]}`;

    const gatunki = dane.genres && dane.genres.length > 0 
        ? dane.genres.map(g => g.name).join(', ') 
        : 'Brak określonego gatunku';
    genresElement.innerText = `🎬 ${gatunki}`;

    descElement.innerText = dane.overview || 'Baza TMDB nie posiada jeszcze polskiego opisu fabuły dla tego tytułu.';

    const obsada = dane.credits && dane.credits.cast && dane.credits.cast.length > 0 
        ? dane.credits.cast.slice(0, 5).map(aktor => aktor.name).join(', ') 
        : 'Brak danych o obsadzie';
    castElement.innerText = obsada;

    if (dane.poster_path) {
        posterElement.innerHTML = `<img src="${IMG_URL}${dane.poster_path}" alt="${tytul}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">`;
        posterElement.style.backgroundColor = "transparent";
    } else {
        posterElement.innerHTML = "BRAK PLAKATU";
    }
}

function obslugaUlubionych(dane) {
    let ulubioneFilmy = JSON.parse(localStorage.getItem('ulubione')) || [];
    let czyWulubionych = ulubioneFilmy.some(film => film.id === dane.id);
    const tytul = dane.title || dane.name;

    if (czyWulubionych) {
        favBtn.innerText = "❤️ W ULUBIONYCH";
        favBtn.style.backgroundColor = "#38bdf8";
        favBtn.style.color = "#05080f";
    }

    favBtn.addEventListener('click', function() {
        if (czyWulubionych) {            
            ulubioneFilmy = ulubioneFilmy.filter(film => film.id !== dane.id);
            localStorage.setItem('ulubione', JSON.stringify(ulubioneFilmy));
            czyWulubionych = false;
            
            favBtn.innerText = "❤ Dodaj do ulubionych";
            favBtn.style.backgroundColor = "transparent";
            favBtn.style.color = "#38bdf8";
        } else {
            const filmDoZapisu = {
                id: dane.id,
                typ: savedType
            };
            
            ulubioneFilmy.push(filmDoZapisu);
            localStorage.setItem('ulubione', JSON.stringify(ulubioneFilmy));
            czyWulubionych = true;
            
            favBtn.innerText = "❤️ W ULUBIONYCH";
            favBtn.style.backgroundColor = "#38bdf8";
            favBtn.style.color = "#05080f";
        }
    });
}

pobierzDetale();