import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import http from 'http';


// Import all your route handlers
import adminRoutes from './router/AdminRoute.js';
import studentRoutes from './router/StudentRoute.js';
import clubRoutes from './router/ClubRoute.js';
import postRoutes from './router/PostRoute.js';
import ChatRoute from './router/ChatRoute.js';

// --- INITIAL SETUP ---
dotenv.config(); 
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors()); 
app.use(express.json()); 

// --- MIDDLEWARE ---
app.use('/api/admin', adminRoutes);
app.use('/api/student', studentRoutes);
app.use('/api/club', clubRoutes);
app.use('/api/post', postRoutes);
app.use('/api/message', ChatRoute);


// A simple root route to check if the server is running
app.get('/', (req, res) => {
    res.send('Student Club Management API is running...');
});



// --- SOCKET.IO INTEGRATION ---
const httpServer = http.createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: [
      "http://localhost:5173", 
      "https://student-club-management.vercel.app"
    ],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Listen for new connections
io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);



  socket.on('joinRoom', (conversationId) => {
    socket.join(conversationId);
    console.log(`User ${socket.id} joined room ${conversationId}`);
  });

  // Event to handle sending a new message
  socket.on('sendMessage', (messageData) => {
    // Here you would save the message to MongoDB
    // ... save logic for MessageSchema ...

    // Then, broadcast the message to everyone in that specific room
    io.to(messageData.conversationId).emit('receiveMessage', messageData);
  });

  socket.on('disconnect', () => {
    console.log(`User Disconnected: ${socket.id}`);
  });
});
// --- END SOCKET.IO ---


// --- DATABASE CONNECTION & SERVER START ---
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Successfully connected to MongoDB database.');
    
    // IMPORTANT: Use httpServer.listen, NOT app.listen
    httpServer.listen(PORT, () => {
        console.log(`Server is running on port: ${PORT}`);
    });
})
.catch((err) => {
    console.error('Database connection failed!', err.message);
});

console.log("Render assigned PORT:", PORT);

