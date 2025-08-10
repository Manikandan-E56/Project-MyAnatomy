const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        const db = await mongoose.connect(url)
        console.log("DB CONNECTED!!")
    } catch (err) {
        console.log("FAILED TO CONNECT TO DB - ", err)
    }
} 
module.exports = connectDB;