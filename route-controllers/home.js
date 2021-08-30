const Obra = require("../models/obra.js");

exports.homeGet = async (req,res) => {
    try{
        const obras = await Obra.find();
        let inicio = obras.length - 4;
        let final = obras.lenght;
        const lastObras = obras.slice(inicio, final);
        
        res.render("home", {obras:lastObras});
    }catch(err){
        res.send(err.message);
    }
 
}


exports.obrasGet = async (req,res) => {
    try{
        const obras = await Obra.find();

        res.render("obras",{obras:obras});
    }catch(err){
        res.send(err.message);
    }

}

exports.obraGet = async (req,res) => {

    try{
        const obra = await Obra.findById(req.params.obraID);

        res.render("obra", {obra:obra});
    }catch(err){
        res.send(err.message);
    }
    
}