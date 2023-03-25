const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const galleryRoutes = require('./galleryRoutes.js');
const dotenv = require("dotenv");

dotenv.config();

const app = express();

//middleuse
app.use(cors());
app.use(bodyParser.json());

//routes
app.use('/api', galleryRoutes);

//connection with db;
const connectDb = async () => {
    try{
        const conn = await mongoose.connect(process.env.DB);
        console.log("Successfully connected to databse");
    }catch(e){
        console.log(e);
    }
}

connectDb();
//server part
const port = 5000;
app.listen(port, ()=>{
    console.log(`App is running at ${port}`);
})