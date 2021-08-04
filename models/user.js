const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: String
})

const User = new mongoose.Model("user", userSchema);

module.exports = User;