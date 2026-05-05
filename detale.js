const titleElement = document.getElementById('details-title');
const ratingElement = document.getElementById('details-rating');
const favBtn = document.getElementById('fav-btn');

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

const allMedia = movies.concat(series);
const savedId = localStorage.getItem('kliknieteID');
let wybranyTytul = null;

if (savedId) {
    wybranyTytul = allMedia.find(item => item.id == savedId);

    if (wybranyTytul) {
        titleElement.innerText = wybranyTytul.title;
        ratingElement.innerText = `⭐ ${wybranyTytul.rating}`;
    }
} else {
    titleElement.innerText = "Nie wybrano żadnego tytułu";
    ratingElement.innerText = "-";
}

let ulubioneFilmy = JSON.parse(localStorage.getItem('ulubione')) || [];

if (wybranyTytul) {
    let czyWulubionych = ulubioneFilmy.some(film => film.id == wybranyTytul.id);

    if (czyWulubionych) {
        favBtn.innerText = "❤️ W ULUBIONYCH";
        favBtn.style.backgroundColor = "#38bdf8";
        favBtn.style.color = "#05080f";
    }

    favBtn.addEventListener('click', function() {
        if (czyWulubionych) {            
            ulubioneFilmy = ulubioneFilmy.filter(film => film.id != wybranyTytul.id);
            
            localStorage.setItem('ulubione', JSON.stringify(ulubioneFilmy));
            czyWulubionych = false;
            
            favBtn.innerText = "❤ Dodaj do ulubionych";
            favBtn.style.backgroundColor = "transparent";
            favBtn.style.color = "#38bdf8";
            
            alert(`Usunięto "${wybranyTytul.title}" z ulubionych.`);
            
        } else {
            ulubioneFilmy.push(wybranyTytul);
            
            localStorage.setItem('ulubione', JSON.stringify(ulubioneFilmy));
            czyWulubionych = true;
            
            favBtn.innerText = "❤️ W ULUBIONYCH";
            favBtn.style.backgroundColor = "#38bdf8";
            favBtn.style.color = "#05080f";
            
            alert(`Dodano "${wybranyTytul.title}" do ulubionych!`);
        }
    });
}