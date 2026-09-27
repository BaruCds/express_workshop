const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post("/", (req, res, next) => {
    console.log(pk);
    return res.status(200).send(req.body);
});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query('SELECT * FROM pokemon');
    console.log(pkmn);
    return res.status(200).send("Hola");
});

pokemon.get('/:id', (req, res, next) => {
    if (!/^\d{1,3}$/.test(req.params.id)) {
        return next(); 
    }
    const id = Number(req.params.id) - 1;
    if (id >= 0 && id <= 150) {
        return res.status(200).send(pk[id]);
    }
    return res.status(404).send("Pokemon Not found");  
});

pokemon.get('/:name', (req, res, next) => {
    const name = req.params.name;

        if (!/^[A-Za-z]+$/.test(name)) {
        return res.status(404).send('Nombre inválido');
    }
   const pkmn = pk.filter((p) => {
         return p.name.toUpperCase() === name.toUpperCase(); 
   });   
     (pk.length > 0) ?  res.status(200).send(pkmn) : res.status(404).send("Pokemon Not found"); 
});

module.exports = pokemon;