const movieTitle = document.querySelector('.movie-title'); // . sest klass
const releaseDate = document.querySelector('.release-date'); // releaseDate - muutuja, kuhu salvestatakse andmed
const movieGenres = document.querySelector('.genres');
const movieDuration = document.querySelector('.movie-duration');
const moviePoster = document.querySelector('.movie-poster-container img'); //valib klassi nime ja siis päring elemendile divi sees
const movieQuote = document.querySelector('.movie-info-quote');
const movieOverview = document.querySelector('.movie-info-overview');
const footerYear = document.querySelector('.year'); // dünaamiline aasta

// käsk, mis pannakse käima peale dokumenti alla laadimist
window.onload = () => { // kui veebilehitseja aken on valmis
    let url = 'https://api.themoviedb.org/3/movie/157336?api_key=8d99420b04a2ec7a516f47042c2691aa'; // kust andmeid võetakse, let sest const ei saa hiljem muuta

    fetch(url) // päring serverile. ootab vastust fetch sees, sest koodi loetakse ülevalt alla ja viite korral muidu ei toimi
    .then(response => { // kui saab vastuse kätte
       return response.json(); // tagastab vastuse vahemällu, muutes see json-ks
    })
    .then(data => { // siis saab andmed kätte
        console.log(data);
        movieTitle.textContent = data.title; // toob title esile

        let date = new Date(data.release_date); // aja formaadi muutmiseks
        releaseDate.textContent = `${date.getFullYear()} ${data.production_countries[0].iso_3166_1}`; // = ... peab olema sama, mis json-is. prod_countr - andmemassiiv. kutsub objekti kohal 0
        movieDuration.textContent = `${data.runtime} minutes`; // andmetükk + tekst
        movieQuote.textContent = data.tagline; // puhtalt andmed data objektist
        movieOverview.textContent = data.overview;

        let posterUrl = `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${data.poster_path}`; // asendab url lõpu
        moviePoster.src = posterUrl; // pildil pole textContentit, ainult source
        moviePoster.alt = `${data.title} Poster`; // alt asemel filmi pealkiri

        let genresToDisplay = ''; // ei ole sama, mis üleval - js muutuja vahemälus.  genres on massiivid
        
        data.genres.forEach(genre => { // iga genre jaoks, mis asub massiivis genres
            genresToDisplay = genresToDisplay + `${genre.name}, `; // kleebib üles tühja väärtuse sisse, loopides
        });

        let genresUpdated = genresToDisplay.slice(0, -2) + '.'; // lõikab viimase elemendi (,) välja ja asendab/liidab .
        
        movieGenres.textContent = genresUpdated; // näitab uut genret

        let currentYear = new Date().getFullYear(); // dün aaasta - tagastab praeguse aasta
        footerYear.textContent = currentYear; // aasta = praegune aasta
    });


 }