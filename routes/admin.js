const express = require("express");

const Obra = require("../models/obra.js");
const admin = require("../route-controllers/admin.js");
const router = express.Router();

router.get("/", async (req,res) => {
    const obras = await Obra.find();
     
   res.render("admin/admin.ejs", {obras:obras})
})

router.get("/login", (req,res) => {
   res.send("Admin/Login works");
})

router.get("/obras/:obraID", async (req,res) => {
   const obra = await Obra.findById(req.params.obraID);
   
   res.render("admin/admin-obra.ejs",{
      obra: obra
   })
})


router.post("/submit", admin.addObras);

router.post("/delete",admin.deleteObra);

router.post("/update/:obraID", admin.updateObra);




module.exports = router;