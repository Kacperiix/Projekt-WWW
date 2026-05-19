const favoritesContainer = document.getElementById('favorites-container');
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const ulubioneFilmy = JSON.parse(localStorage.getItem('ulubione')) || [];

function wyswietlUlubione() {
    favoritesContainer.innerHTML = ''; 

    if (ulubioneFilmy.length === 0) {
        favoritesContainer.innerHTML = '<p style="grid-column: 1 / -1; color: white; padding: 20px 0; font-size: 18px;">Nie masz jeszcze żadnych dodanych filmów ani seriali.</p>';
        return; 
    }

    ulubioneFilmy.forEach(item => {
        const ocena = item.vote_average ? item.vote_average.toFixed(1) + '/10' : 'Brak';
        
        const plakatWizualny = item.poster_path 
            ? `<img src="${IMG_URL}${item.poster_path}" alt="${item.title}" class="movie-poster">`
            : `<div class="poster-placeholder">PLAKAT</div>`;

        const typMedia = item.typ || 'movie';

        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${item.id}, '${typMedia}')">
                ${plakatWizualny}
                <h3>${item.title}</h3>
                <p>Ocena: ⭐ ${ocena}</p>
            </article>
        `;
        favoritesContainer.innerHTML += kafelekHTML;
    });
}

function zapiszIPrzejdz(id, typ) {
    localStorage.setItem('kliknieteID', id);
    localStorage.setItem('typMedia', typ);
    window.location.href = 'detale.html';
}

wyswietlUlubione();