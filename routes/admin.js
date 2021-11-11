const express = require("express");

const Obra = require("../models/obra.js");
const User = require("../models/user.js");
const admin = require("../route-controllers/admin.js");
const router = express.Router();
const passport = require("passport");

const fs = require('fs');
const path = require('path');

// Set up multer for storing uploaded files
  
const multer = require('multer');
  
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '/uploads/'))
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
var upload = multer({ storage: storage, limits: { fieldSize: 10 * 1024 * 1024 } });



router.get("/", admin.adminGet)

router.get("/login", (req,res) => {
   res.render("admin/login");
})


router.get("/obras/:obraID", admin.obrasGet)


router.post("/submit",upload.single('image'), (req,res) => {
   const {titulo, resumen, contenido, fecha} = req.body;
  
   const obra = {
       titulo: titulo,
       resumen:resumen,
       contenido:contenido,
       fecha:fecha,
       img: {
           data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
           contentType: 'image/png'
       }
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

});

router.post("/delete",admin.deleteObra);

router.post("/update/:obraID", admin.updateObra);

router.post("/login",  passport.authenticate('local', { failureRedirect: '/admin/login', successRedirect: "/admin"}));




module.exports = router;