const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName:{
        type: String
    },
    lastname: {
        type: String
    },
    gender: {
        type: String
    },
    emailID: {
        type: String 
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
});

module.exports = mongoose.model("User", userSchema);