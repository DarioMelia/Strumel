const mongoose = require("mongoose");

const obraSchema = new mongoose.Schema({
    titulo:String,
    resumen: String,
    contenido:String,
    fecha: Date,
    imgUrl: String
})

const Obra = new mongoose.model("obra", obraSchema);

module.exports = Obra;