import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./src/routes/index.js";

const app = express();
dotenv.config(); // Initialize dotenv
const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(router);

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
            
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });

