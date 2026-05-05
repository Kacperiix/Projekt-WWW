const seriesPageContainer = document.getElementById('series-page-container');

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

function wyswietlWszystkieSeriale() {
    seriesPageContainer.innerHTML = ''; 
    series.forEach(serial => {
        const kafelekHTML = `
            <article class="card" onclick="zapiszIPrzejdz(${serial.id})">
                <div class="poster-placeholder">PLAKAT</div>
                <h3>${serial.title}</h3>
                <p>Ocena: ${serial.rating}</p>
            </article>
        `;
        seriesPageContainer.innerHTML += kafelekHTML;
    });
}

function zapiszIPrzejdz(id) {
    localStorage.setItem('kliknieteID', id);
    window.location.href = 'detale.html';
}
wyswietlWszystkieSeriale();