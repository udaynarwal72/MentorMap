import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/index.js";
import cors from "cors";

dotenv.config(); // Initialize dotenv

const app = express();
const port = process.env.PORT || 3000; // Provide a fallback port

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
