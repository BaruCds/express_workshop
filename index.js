
const morgan = require('morgan');
const express = require('express');
const app = express();
const pokemom=require('./routes/pokemon');
const user=require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
     
   return res.status(200).json({ code: 1, message: "Welcome to the Pokedex!" });
});

app.use("/pokemon", pokemom);
app.use("/user", user);

app.use((req, res, next) => {
    return res.status(404).json("code: 404, message: 'URL not found'");;
});
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});