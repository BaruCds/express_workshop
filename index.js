const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const { pokemon } = require('./pokedex.json');


/** 
 * HTTP Methods
 * GET - obtener recursos
 * POST - crear recursos
 * PUT - actualizar recursos
 * DELETE - eliminar recursos
 * PATCH - actualizar parcialmente un recurso

 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }))



app.get("/", (req, res, next) => {
     
   return res.status(200).send("Welcome to the Pokedex!");
});



app.post("/pokemon", (req, res, next) => {
    
    return res.status(200).send(req.body);
});



app.get('/pokemon/all', (req, res, next) => {
    return res.status(200).send(pokemon);
});




app.get('/pokemon/:id', (req, res, next) => {
    if (!/^\d{1,3}$/.test(req.params.id)) {
        return next(); 
    }
    const id = Number(req.params.id) - 1;
    if (id >= 0 && id <= 150) {
        return res.status(200).send(pokemon[id]);
    }
    return res.status(404).send("Pokemon Not found");  
});



app.get('/pokemon/:name', (req, res, next) => {
    const name = req.params.name;

        if (!/^[A-Za-z]+$/.test(name)) {
        return res.status(400).send('Nombre inválido');
    }

 
   
   const pk = pokemon.filter((p) => {
         return p.name.toUpperCase() === name.toUpperCase();
    

   });
    

     (pk.length > 0) ?  res.status(200).send(pk) : res.status(404).send("Pokemon Not found");
    
    
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});