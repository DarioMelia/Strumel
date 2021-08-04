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


router.post("/submit", admin.addObras);




module.exports = router;