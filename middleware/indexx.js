module.exports = (req, res, next) => {
     
   return res.status(200).json({ code: 1, message: "Welcome to the Pokedex!" });
}