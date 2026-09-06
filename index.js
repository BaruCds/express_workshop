const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');

app.get("/", (req, res, next) => {
    res.status(200);    
    res.send("Welcome to the Pokedex!");
});

app.get('/pokemon/all', (req, res, next) => {
    res.status(200);
    res.send(pokemon);
});


app.get('/pokemon/:id', (req, res, next) => {
    if (!/^\d{1,3}$/.test(req.params.id)) {
        return next(); 
    }
    const id = Number(req.params.id) - 1;
    if (id >= 0 && id <= 150) {
        res.status(200);
        return res.send(pokemon[id]);
    }
    res.status(404);
    res.send("Pokemon Not found");
});

app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name;
    for (let i = 0; i < pokemon.length; i++) {
        if (pokemon[i].name == name) {
            res.status(200);
            return res.send(pokemon[i]);
        }
    }
    res.status(404);
    res.send("Pokemon Not found");
});

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});