
const Obra = require("../models/obra.js");
const passport = require("passport");


exports.adminGet = async (req,res) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stal   e=0, post-check=0, pre-check=0');
    if(req.isAuthenticated()){
       const obras = await Obra.find();
      
       res.render("admin/admin.ejs", {obras:obras})
    }else{
       res.redirect("/admin/login")
    }
     
 }

exports.obrasGet = async (req,res) => {
    if(req.isAuthenticated()){
 
    const obra = await Obra.findById(req.params.obraID);
    
    res.render("admin/admin-obra.ejs",{
       obra: obra
    })
 }else{
    res.redirect("/admin/login");
 }
 }



// %%%%%%%%%%%%%%% API %%%%%%%%%%%%%%%%

exports.deleteObra = (req,res) => {
    const id = req.body.delete;
    Obra.deleteOne({_id:id}, err => {
        if(!err){
            res.redirect("/admin");
        }else{
            console.log("No se pudo borrar por " + err.message)
        }
    })
}


exports.updateObra = (req,res) => {
    const id = req.params.obraID;
    const {titulo, resumen, contenido} = req.body;
    
    Obra.findByIdAndUpdate(id,{
        titulo:titulo,
        resumen:resumen,
        contenido:contenido,
    }, err => {
        if(!err){
            res.redirect("/admin/obras/" + id);
        }else{
            console.log("No se ha podido actualizar por: " + err.message);
        }
    })
}



