const moviesContainer = document.getElementById('movies-container');
const seriesContainer = document.getElementById('series-container');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const moviesHeading = document.getElementById('movies-heading');
const seriesHeading = document.getElementById('series-heading');

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

const series = [
    { id: 101, title: "Breaking Bad", rating: "9.5/10" },
    { id: 102, title: "Gra o Tron", rating: "9.2/10" },
    { id: 103, title: "The Office", rating: "8.9/10" },
    { id: 104, title: "Stranger Things", rating: "8.7/10" },
    { id: 105, title: "Czarnobyl", rating: "9.4/10" },
    { id: 106, title: "The Last of Us", rating: "8.8/10" },
    { id: 107, title: "Sukcesja", rating: "8.8/10" },
    { id: 108, title: "Wiedźmin", rating: "8.1/10" },
    { id: 109, title: "Narcos", rating: "8.8/10" },
    { id: 110, title: "Peaky Blinders", rating: "8.8/10" }
];

function wyswietlFilmy(listaFilmow) {
    moviesContainer.innerHTML = ''; 
    
    listaFilmow.forEach(film => {
        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${film.id})">
                <div class="poster-placeholder">PLAKAT</div>
                <h3>${film.title}</h3>
                <p>Ocena: ${film.rating}</p>
            </article>
        `;
        moviesContainer.innerHTML += kafelekHTML;
    });
}

function wyswietlSeriale(listaSeriali) {
    seriesContainer.innerHTML = ''; 
    
    listaSeriali.forEach(serial => {
        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${serial.id})">
                <div class="poster-placeholder">PLAKAT</div>
                <h3>${serial.title}</h3>
                <p>Ocena: ${serial.rating}</p>
            </article>
        `;
        seriesContainer.innerHTML += kafelekHTML;
    });
}

searchBtn.addEventListener('click', function() {
    const wpisaneSlowo = searchInput.value.toLowerCase().trim();
    const sekcjaSeriali = seriesContainer.parentElement;

    if (wpisaneSlowo === '') {
        moviesHeading.innerText = 'POPULARNE W TYM TYGODNIU: FILMY';
        seriesHeading.innerText = 'POPULARNE W TYM TYGODNIU: SERIALE';
        
        sekcjaSeriali.style.display = 'block';

        wyswietlFilmy(movies);
        wyswietlSeriale(series);
    } else {
        moviesHeading.innerText = `WYNIKI WYSZUKIWANIA: "${wpisaneSlowo.toUpperCase()}"`;
        sekcjaSeriali.style.display = 'none';

        const przefiltrowaneFilmy = movies.filter(film => {
            return film.title.toLowerCase().includes(wpisaneSlowo);
        });

        const przefiltrowaneSeriale = series.filter(serial => {
            return serial.title.toLowerCase().includes(wpisaneSlowo);
        });

        const polaczoneWyniki = przefiltrowaneFilmy.concat(przefiltrowaneSeriale);
        wyswietlFilmy(polaczoneWyniki);
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

wyswietlFilmy(movies);
wyswietlSeriale(series);