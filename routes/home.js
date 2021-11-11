const express = require("express");
const controllers = require("../route-controllers/home.js");
const router = express.Router();


router.get("/", controllers.homeGet);

router.get("/obras",controllers.obrasGet);


//Lazy loading images api
router.get("/api/getLastImages",controllers.getLastImages);
router.get("/api/getImage/:obraID",controllers.getObraImg);



module.exports = router;