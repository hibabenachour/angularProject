//import mongoose
const mongoose = require("mongoose");
//generate schema
const userSchema = mongoose.Schema({
        firstName: { type: String, required: true },
        lastName: String,
        email: { type: String, required: true },
        password: String,
        tel: String,
        role: String,
        speciality: String,
        experience: String,
        dateOfBirth: { type: Date, default: Date.now },
    })
    //generate model
const user = mongoose.model('User', userSchema)
    //export model 
module.exports = user