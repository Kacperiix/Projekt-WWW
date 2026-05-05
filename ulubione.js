const favoritesContainer = document.getElementById('favorites-container');

const ulubioneFilmy = JSON.parse(localStorage.getItem('ulubione')) || [];

function wyswietlUlubione() {
    favoritesContainer.innerHTML = ''; 
    if (ulubioneFilmy.length === 0) {
        favoritesContainer.innerHTML = '<p style="color: white; padding: 20px;">Nie masz jeszcze żadnych dodanych filmów ani seriali.</p>';
        return; 
    }
    ulubioneFilmy.forEach(item => {
        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${item.id})">
                <div class="poster-placeholder">PLAKAT</div>
                <h3>${item.title}</h3>
                <p>Ocena: ${item.rating}</p>
            </article>
        `;
        favoritesContainer.innerHTML += kafelekHTML;
    });
}

function zapiszIPrzejdz(id) {
    localStorage.setItem('kliknieteID', id);
    window.location.href = 'detale.html';
}
wyswietlUlubione();