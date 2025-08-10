const express = require('express');
const connectDB = require('./middlewares/db');
const cors = require('cors');
require('dotenv').config();

const studentController = require('./controllers/studentController');

const app = express();

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}));
connectDB();

app.post('/api/auth/register', studentController.register);
app.post('/api/auth/login', studentController.login);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});