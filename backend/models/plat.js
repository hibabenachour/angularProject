//import mongoose
const mongoose = require("mongoose");
//generate schema
const platSchema = mongoose.Schema({
        platName: String,
        description: String,
        price: String,
        idChef: String,
        img: String,

    })
    //generate model
const plat = mongoose.model('Plat', platSchema)
    //export model 
module.exports = plat