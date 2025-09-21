import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// Import all your route handlers
import adminRoutes from './router/AdminRoute.js';
import studentRoutes from './router/StudentRoute.js';
import clubRoutes from './router/ClubRoute.js';
import postRoutes from './router/PostRoute.js';

// --- INITIAL SETUP ---
dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors()); 
app.use(express.json()); 



app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/post', postRoutes);

// A simple root route to check if the server is running
app.get('/', (req, res) => {
    res.send('Student Club Management API is running...');
});


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Successfully connected to MongoDB database.');
   
    app.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection failed!', err.message);
});

console.log("Render assigned PORT:", PORT);