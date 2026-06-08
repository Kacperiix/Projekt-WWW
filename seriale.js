const seriesPageContainer = document.getElementById('series-page-container');

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlZjlhZjE3ODhhZjQ2NTA0MzhiNTdhMDU0MzQ0MGNiNyIsIm5iZiI6MTc3MjMwMDMwMC45MTI5OTk5LCJzdWIiOiI2OWEzMjgwY2Q0YWFhNGZiYWNkZThiZTUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.45vJNS3Y-jtt7uM0pD68V9u4-nSyVkxi2S8HCulZMnU';
const API_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

const filterBtn = document.querySelector('.filter-btn');
const sortSelect = document.getElementById('sort-rating');
const checkboxes = document.querySelectorAll('.checkbox-group input');

const mapaGatunkow = {
    0: 10759, 
    1: 10765, 
    2: 35,    
    3: 18,    
    4: 9648   
};

const opcjeZapytania = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_TOKEN}`
    }
};

async function pobierzSerialeZApi(sortujPo = 'popularity.desc', gatunkiIds = '') {
    let url = `${API_URL}/discover/tv?language=pl-PL&page=1&sort_by=${sortujPo}`;
    
    if (sortujPo.includes('vote_average')) {
        url += '&vote_count.gte=100';
    }
    
    if (gatunkiIds) {
        url += `&with_genres=${gatunkiIds}`;
    }

    const odpowiedz = await fetch(url, opcjeZapytania);
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

filterBtn.addEventListener('click', function() {
    const wybranySort = sortSelect.value === 'desc' ? 'vote_average.desc' : 'vote_average.asc';
    
    let wybraneGatunki = [];
    checkboxes.forEach((box, index) => {
        if (box.checked) {
            wybraneGatunki.push(mapaGatunkow[index]);
        }
    });
    
    const gatunkiString = wybraneGatunki.join('|');
    pobierzSerialeZApi(wybranySort, gatunkiString);
});

pobierzSerialeZApi();