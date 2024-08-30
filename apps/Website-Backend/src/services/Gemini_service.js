const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Use CORS middleware with specific options
app.use(cors({
    origin: '*', // Allow requests from this origin
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(bodyParser.json());



// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
