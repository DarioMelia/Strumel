const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const passport = require("passport");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String
})

userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("user", userSchema);

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {     //Nos transforma los datos para que la sesion pueda guardarlos y usarlos
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {    //MIsmo proceso a la inversa, estan en la sesión y los volvemos a traducir a objetos
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


module.exports = User;