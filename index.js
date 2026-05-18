const moviesContainer = document.getElementById('movies-container');
const seriesContainer = document.getElementById('series-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const moviesHeading = document.getElementById('movies-heading');
const seriesHeading = document.getElementById('series-heading');

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

async function pobierzPopularneFilmy() {
    const odpowiedz = await fetch(`${API_URL}/movie/popular?language=pl-PL&page=1`, opcjeZapytania);
    const dane = await odpowiedz.json();
    wyswietlFilmy(dane.results.slice(0, 10)); 
}

async function pobierzPopularneSeriale() {
    const odpowiedz = await fetch(`${API_URL}/tv/popular?language=pl-PL&page=1`, opcjeZapytania);
    const dane = await odpowiedz.json();
    wyswietlSeriale(dane.results.slice(0, 10));
}

async function szukajWApi(slowo) {
    const odpowiedz = await fetch(`${API_URL}/search/multi?query=${slowo}&language=pl-PL&page=1`, opcjeZapytania);
    const dane = await odpowiedz.json();
    const tylkoFilmyISeriale = dane.results.filter(item => item.media_type !== 'person');
    wyswietlFilmy(tylkoFilmyISeriale);
}

function wyswietlFilmy(listaFilmow) {
    moviesContainer.innerHTML = ''; 
    
    listaFilmow.forEach(film => {
        const tytul = film.title || film.name; 
        const ocena = film.vote_average ? film.vote_average.toFixed(1) + '/10' : 'Brak';
        
        const plakatWizualny = film.poster_path 
            ? `<img src="${IMG_URL}${film.poster_path}" alt="${tytul}" class="movie-poster">`
            : `<div class="poster-placeholder">PLAKAT</div>`;

        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${film.id})">
                ${plakatWizualny}
                <h3>${tytul}</h3>
                <p>Ocena: ⭐ ${ocena}</p>
            </article>
        `;
        moviesContainer.innerHTML += kafelekHTML;
    });
}

function wyswietlSeriale(listaSeriali) {
    seriesContainer.innerHTML = ''; 
    
    listaSeriali.forEach(serial => {
        const tytul = serial.name;
        const ocena = serial.vote_average ? serial.vote_average.toFixed(1) + '/10' : 'Brak';
        
        const plakatWizualny = serial.poster_path 
            ? `<img src="${IMG_URL}${serial.poster_path}" alt="${tytul}" class="movie-poster">`
            : `<div class="poster-placeholder">PLAKAT</div>`;

        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${serial.id})">
                ${plakatWizualny}
                <h3>${tytul}</h3>
                <p>Ocena: ⭐ ${ocena}</p>
            </article>
        `;
        seriesContainer.innerHTML += kafelekHTML;
    });
}

searchBtn.addEventListener('click', function() {
    const wpisaneSlowo = searchInput.value.trim();
    const sekcjaSeriali = seriesContainer.parentElement;

    if (wpisaneSlowo === '') {
        moviesHeading.innerText = 'POPULARNE W TYM TYGODNIU: FILMY';
        seriesHeading.innerText = 'POPULARNE W TYM TYGODNIU: SERIALE';
        sekcjaSeriali.style.display = 'block';
        moviesContainer.classList.remove('search-mode');
        
        pobierzPopularneFilmy();
        pobierzPopularneSeriale();
    } else {
        moviesHeading.innerText = `WYNIKI WYSZUKIWANIA: "${wpisaneSlowo.toUpperCase()}"`;
        sekcjaSeriali.style.display = 'none';
        moviesContainer.classList.add('search-mode');
        
        szukajWApi(wpisaneSlowo);
    }
});

searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchBtn.click();
    }
});

function zapiszIPrzejdz(id) {
    localStorage.setItem('kliknieteID', id);
    window.location.href = 'detale.html';
}

pobierzPopularneFilmy();
pobierzPopularneSeriale();