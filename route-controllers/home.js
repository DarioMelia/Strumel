const Obra = require("../models/obra.js");

exports.homeGet = async (req,res) => {
 const obras = await Obra.find();
 let inicio = obras.length - 4;
 let final = obras.lenght;
 const lastObras = obras.slice(inicio, final);
 
 res.render("home", {obras:lastObras});
}