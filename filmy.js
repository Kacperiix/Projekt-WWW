const moviesPageContainer = document.getElementById('movies-page-container');

const movies = [
    { id: 1, title: "Mroczny Rycerz", rating: "9.0/10" },
    { id: 2, title: "Incepcja", rating: "8.8/10" },
    { id: 3, title: "Interstellar", rating: "8.6/10" },
    { id: 4, title: "Matrix", rating: "8.7/10" },
    { id: 5, title: "Diuna", rating: "8.3/10" },
    { id: 6, title: "Gladiator", rating: "8.5/10" },
    { id: 7, title: "Władca Pierścieni", rating: "9.0/10" },
    { id: 8, title: "Joker", rating: "8.4/10" },
    { id: 9, title: "Oppenheimer", rating: "8.6/10" },
    { id: 10, title: "Spider-Man", rating: "8.2/10" }
];

function wyswietlWszystkieFilmy() {
    moviesPageContainer.innerHTML = ''; 
    movies.forEach(film => {
        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${film.id})">
                <div class="poster-placeholder">PLAKAT</div>
                <h3>${film.title}</h3>
                <p>Ocena: ${film.rating}</p>
            </article>
        `;
        moviesPageContainer.innerHTML += kafelekHTML;
    });
}
function zapiszIPrzejdz(id) {
    localStorage.setItem('kliknieteID', id);
    window.location.href = 'detale.html';
}
wyswietlWszystkieFilmy();