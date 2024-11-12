const express = require('express'); // kõik lingid, mis toetavad express raamistiku tööd
const app = express(); //muutuja, initsialiseerib serveri vahemälus rakendused/ appid

app.use(express.static('public')); // annab serverile loa saata staatilisi faile public kaustast koos html-ga 

app.get('/', (request, response) => { //kui tuleb kasutaja get tüüpi päring pealehele. serverile päring brauseripoolne (req) ja vastus (res) (serverilt kasutajale)
    response.sendFile(__dirname + '/index.html'); // Server edastab kasutajale html koodi vastusena. index.html toimib kui asub serveriga ühel tasemel. Dirname projektifaili absoluutasukoht
}); 

app.get('/about', (request, response) => { // req-- päring kasutaja käest, res- vastus serverilt
    response.send('Hello, I am Huko. Nice to meet you.');
});

app.listen(3000, ()=> { // ootab kasutaja päringut portil 3000
    console.log('Server is running on Port 3000'); // Tagasiside
});

// public kaust vajalik, sest muidu server ei väljasta
//css väljastatakse iga get päring, restart ei ole vajalik
