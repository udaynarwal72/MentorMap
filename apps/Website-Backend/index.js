import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './src/routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { Server } from 'socket.io';
import http from 'http';

// Initialize dotenv
dotenv.config();

// Initialize Express
const app = express();
const port = process.env.PORT || 3000; // Provide a fallback port

// Middleware
app.use(cors({ origin: ["http://localhost:5173","http://localhost:8000"], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(router);

  

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MongoDB connected");

        // Create an HTTP server
        const server = http.createServer(app);

        // Initialize Socket.io
        const io = new Server(server, {
            pingTimeout: 60000,
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
                credentials: true,
            },
        });

        // Socket.io connection handling
        io.on("connection", (socket) => {
            console.log("User connected", socket.id);

            // You can add custom events here, e.g., for messaging or notifications
            socket.on("disconnect", () => {
                console.log("User disconnected", socket.id);
            });
        });

        // Start the server
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
