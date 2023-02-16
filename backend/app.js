//import express
const express = require('express')
    //import mongoose
const mongoose = require('mongoose')


const Plat = require('./models/plat')

//import body-parser
const bodyParser = require("body-parser")
    //module de node
const path = require('path')

//create instance of express in app 

const app = express()
app.use('/images', express.static(path.join('backend/images')))
    // Security Configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});

//Connect to database
mongoose.connect('mongodb://localhost:27017/meanFev22', { useNewUrlParser: true, useUnifiedTopology: true });

//Integration bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//import user route
const userRoute = require('./routes/user_route')
app.use('/users', userRoute)

//import user route
const platRoute = require('./routes/plat_route')
app.use('/plats', platRoute)


//export app 
//doit etre la derniere ligne 
module.exports = app;