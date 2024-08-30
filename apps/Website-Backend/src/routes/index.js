import Express from "express";
import UserRouter from "./UserRoutes.js";
const router = Express.Router();

router.get("/", (req, res) => {
    res.send("API is working");
});
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

router.use("/api/v1/user",UserRouter);

export default router;