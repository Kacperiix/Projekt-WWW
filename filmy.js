const moviesPageContainer = document.getElementById('movies-page-container');

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

async function pobierzFilmyZApi() {
    const odpowiedz = await fetch(`${API_URL}/discover/movie?language=pl-PL&page=1&sort_by=popularity.desc`, opcjeZapytania);
    const dane = await odpowiedz.json();
    wyswietlWszystkieFilmy(dane.results);
}

function wyswietlWszystkieFilmy(listaFilmow) {
    moviesPageContainer.innerHTML = ''; 
    
    listaFilmow.forEach(film => {
        const tytul = film.title; 
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
        moviesPageContainer.innerHTML += kafelekHTML;
    });
}

function zapiszIPrzejdz(id) {
    localStorage.setItem('kliknieteID', id);
    window.location.href = 'detale.html';
}

pobierzFilmyZApi();