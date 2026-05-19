const seriesPageContainer = document.getElementById('series-page-container');

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

async function pobierzSerialeZApi() {
    const odpowiedz = await fetch(`${API_URL}/discover/tv?language=pl-PL&page=1&sort_by=popularity.desc`, opcjeZapytania);
    const dane = await odpowiedz.json();
    wyswietlWszystkieSeriale(dane.results);
}

function wyswietlWszystkieSeriale(listaSeriali) {
    seriesPageContainer.innerHTML = ''; 
    
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
        seriesPageContainer.innerHTML += kafelekHTML;
    });
}

function zapiszIPrzejdz(id) {
    localStorage.setItem('kliknieteID', id);
    localStorage.setItem('typMedia', 'tv');
    window.location.href = 'detale.html';
}

pobierzSerialeZApi();