const express = require("express");
const controllers = require("../route-controllers/home.js");
const router = express.Router();


router.get("/", controllers.homeGet);


module.exports = router;