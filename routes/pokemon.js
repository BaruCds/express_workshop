const express = require('express');
const pokemon = express.Router();
const db = require('../config/database');


pokemon.post("/", async (req, res, next) => {

    const { pok_name, pok_height, pok_weight, pok_base_experience } = req.body;
    
    if (pok_name && pok_height && pok_weight && pok_base_experience) {

    
    let query ="INSERT INTO pokemon (pok_name, pok_height,pok_weight,pok_base_experience)";

    query += ` VALUES ('${pok_name}', ${pok_height}, ${pok_weight}, ${pok_base_experience})`;

    const rows = await db.query(query);
    console.log(rows);


    if (rows.affectedRows === 1) {
        return res.status(201).json({ code: 201, message: "Pokemon created successfully" });
    }

    return res.status(500).json({ code: 500, message: "Error creating Pokemon" });
}
    return res.status(500).json({ code: 500, message: "Missing required fields" });

});

pokemon.get('/', async (req, res, next) => {
    const pkmn = await db.query('SELECT * FROM pokemon');
    console.log(pkmn);
    return res.status(200).json({ code: 1, message: pkmn });
});

pokemon.get('/:id', async (req, res, next) => {
    if (!/^\d{1,3}$/.test(req.params.id)) {
        return next(); 
    }
    const id = Number(req.params.id) - 1;
    if (id >= 1 && id <= 722) {
        return res.status(200).json({ code: 1, message: pkmn[id] });
    }
    return res.status(404).json({ code: 404, message: "Pokemon Not found" });  
});

pokemon.get('/:name', async (req, res, next) => {
    const name = req.params.name;

    if (!/^[A-Za-z]+$/.test(name)) {
        return res.status(400).json({ code: 400, message: "Nombre inválido" });
    }

    const pkmn = await db.query('SELECT * FROM pokemon WHERE pok_name = ?', [name]);

    if (pkmn.length > 0) {
        return res.status(200).json({ code: 1, message: pkmn[0] });
    }
    return res.status(404).json({ code: 404, message: "Pokemon Not found" });
});
   

module.exports = pokemon;