const express = require("express");
const router = express.Router();

router.get("/",(req,res) => {
    res.send("Obras funciona");
})

router.get("/:obraID", (req,res) => {
    const obraID = req.params.obraID;
    res.send("La obra " + obraID + " funciona");
})

module.exports = router;