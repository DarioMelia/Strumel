const Obra = require("../models/obra.js");



exports.addObras = (req,res) => {
    const {titulo, resumen, contenido, fecha, imgUrl} = req.body;
    console.log(titulo + resumen + contenido + fecha);
    const obra = {
        titulo: titulo,
        resumen:resumen,
        contenido:contenido,
        fecha:fecha,
        imgUrl:imgUrl
    }
    const newObra = new Obra(obra);
    try{
        
        newObra.save(err => {
            if(!err){
                res.redirect("/admin")
            }else{
                res.status(409).json({message:err.message})
            }
            
        })
    } catch(err){
        res.status(409).json({message:err.message})
    }

}