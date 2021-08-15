require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");


const app = express();

const homeRoutes = require("./routes/home.js");
const adminRoutes = require("./routes/admin.js");
const obrasRoutes = require("./routes/obras.js");

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(session({                      //express-session para iniciar una sesión, guardada por cockies
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized:false
  }));
  app.use(passport.initialize());        //inicializar y configurar passport para trabajar con la sesión previamente creada
  app.use(passport.session());

const PORT = process.env.PORT || 3000


app.use("/", homeRoutes);
app.use("/admin", adminRoutes);
app.use("/obras", obrasRoutes);


mongoose.connect(process.env.DB_URL,{useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false})
    .then(() => {app.listen(PORT, err => {
        if(!err){console.log("Sariak, bonita, te como. Y el server se ha iniciado en: " + PORT)}
    })})
    .catch(err => console.log(err))



