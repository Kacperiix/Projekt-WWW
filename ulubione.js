const favoritesContainer = document.getElementById('favorites-container');
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjlhZjE3ODhhZjQ2NTA0MzhiNTdhMDU0MzQ0MGNiNyIsIm5iZiI6MTc3MjMwMDMwMC45MTI5OTk5LCJzdWIiOiI2OWEzMjgwY2Q0YWFhNGZiYWNkZThiZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.45vJNS3Y-jtt7uM0pD68V9u4-nSyVkxi2S8HCulZMnU';
const API_URL = 'https://api.themoviedb.org/3';

const opcjeZapytania = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
    }
};

const ulubioneFilmy = JSON.parse(localStorage.getItem('ulubione')) || [];

async function wyswietlUlubione() {
    favoritesContainer.innerHTML = ''; 

    if (ulubioneFilmy.length === 0) {
        favoritesContainer.innerHTML = '<p style="grid-column: 1 / -1; color: white; padding: 20px 0; font-size: 18px;">Nie masz jeszcze żadnych dodanych filmów ani seriali.</p>';
        return; 
    }

    for (const item of ulubioneFilmy) {
        try {
            const odpowiedz = await fetch(`${API_URL}/${item.typ}/${item.id}?language=pl-PL`, opcjeZapytania);
            const dane = await odpowiedz.json();

            const tytul = dane.title || dane.name;
            const ocena = dane.vote_average ? dane.vote_average.toFixed(1) + '/10' : 'Brak';
            
            const plakatWizualny = dane.poster_path 
                ? `<img src="${IMG_URL}${dane.poster_path}" alt="${tytul}" class="movie-poster">`
                : `<div class="poster-placeholder">PLAKAT</div>`;

            const kafelekHTML = `
                <article class="card" onclick="zapiszIPrzejdz(${dane.id}, '${item.typ}')">
                    ${plakatWizualny}
                    <h3>${tytul}</h3>
                    <p>Ocena: ⭐ ${ocena}</p>
                </article>
            `;
            favoritesContainer.innerHTML += kafelekHTML;
        } catch (error) {
            console.error("Błąd pobierania elementu z API TMDB:", error);
        }
    }
}

function zapiszIPrzejdz(id, typ) {
    localStorage.setItem('kliknieteID', id);
    localStorage.setItem('typMedia', typ);
    window.location.href = 'detale.html';
}

wyswietlUlubione();