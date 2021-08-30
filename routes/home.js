const express = require("express");
const controllers = require("../route-controllers/home.js");
const router = express.Router();


router.get("/", controllers.homeGet);

router.get("/obras",controllers.obrasGet);

router.get("/obras/:obraID", (req,res) => {
    const obraID = req.params.obraID;
    res.send("La obra " + obraID + " funciona");
})


module.exports = router;