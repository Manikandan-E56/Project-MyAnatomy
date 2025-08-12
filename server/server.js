import express from 'express';

import cors from 'cors';
import dotenv from 'dotenv';
import db from './middlewares/db.js';

import { login, register } from './controllers/StudentController.js';
import { adminlogin, adminregister } from './controllers/AdminController.js';

dotenv.config(); 

const app = express();


app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173' }));

db.connect(); 

app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/admin/register', adminregister);
app.post('/api/auth/admin/login',adminlogin);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});
