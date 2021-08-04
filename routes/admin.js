const express = require("express");
const router = express.Router();

router.get("/", (req,res) => {
   res.send("Admin works");
})

router.get("/login", (req,res) => {
   res.send("Admin/Login works");
})

router.get("/submit", (req,res) => {
    res.send("Admin/submit works")
})


module.exports = router;