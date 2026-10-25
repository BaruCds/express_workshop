//Dependencies
const morgan = require('morgan');
const express = require('express');
const app = express();

//routes
const pokemom=require('./routes/pokemon');
const user= require('./routes/user');

//middlewares
const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const indexx = require('./middleware/indexx');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", indexx);
app.use("/user", user);

app.use(auth);

app.use("/pokemon", pokemom);


app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log("Server is running...");
});