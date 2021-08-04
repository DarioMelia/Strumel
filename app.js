require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

const homeRoutes = require("./routes/home.js");
const adminRoutes = require("./routes/admin.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use("/", homeRoutes);
app.use("/admin", adminRoutes);

const PORT = process.env.PORT || 3000


mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {app.listen(PORT, err => {
        if(!err){console.log("Server started on port: " + PORT)}
    })})
    .catch(err => console.log(err.message))



