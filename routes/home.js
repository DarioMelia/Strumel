const express = require("express");
const controllers = require("../route-controllers/home.js");
const router = express.Router();


router.get("/", controllers.homeGet);

router.get("/obras",controllers.obrasGet);

router.get("/api/getLastImages",controllers.getLastImages);



module.exports = router;