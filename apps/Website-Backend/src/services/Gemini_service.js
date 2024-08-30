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

// Endpoint to handle chat messages
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await axios.post('https://api.gemini.com/ask', {
            question: message
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GEMINI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ reply: response.data.answer });
    } catch (error) {
        console.error('Error communicating with Gemini:', error);
        res.status(500).json({ reply: 'Sorry, something went wrong. Please try again later.' });
    }
});

// Start server
app.listen(5000, () => {
    console.log('Server running on port 5000');
});
