const bodyParser = require('body-parser');
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemom=require('./routes/pokemon');


app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/pokemon", pokemom);

app.get("/", (req, res, next) => {
     
   return res.status(200).send("Welcome to the Pokedex!");
});



app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});