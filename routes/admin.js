const express = require("express");

const Obra = require("../models/obra.js");
const User = require("../models/user.js");
const admin = require("../route-controllers/admin.js");
const router = express.Router();
const passport = require("passport");

router.get("/", admin.adminGet)

router.get("/login", (req,res) => {
   res.render("admin/login");
})


router.get("/obras/:obraID", admin.obrasGet)


router.post("/submit", admin.addObras);

router.post("/delete",admin.deleteObra);

router.post("/update/:obraID", admin.updateObra);

router.post("/login",  passport.authenticate('local', { failureRedirect: '/admin/login', successRedirect: "/admin"}));




module.exports = router;