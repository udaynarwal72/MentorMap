import Express, { response } from "express";
import UserRouter from "./UserRoutes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import BlogRouter from "./BlogRoutes.js";
const router = Express.Router();

router.get("/", (req, res) => {
    res.send("API is working");
});
router.post('/chat', async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Help me with this statement:Give answer in a decent english language" + req.body.message;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({ message: result.response.text() });
});

// router.get('/mentorlist', async (req, res) => {
//     try {
//       const mentors = await Mentor.find();
//       res.status(200).json(mentors);
//     } catch (error) {
//       console.error('Error fetching mentor list:', error); 
//       res.status(500).json({ error: 'Error fetching mentor list' });
//     }
//   });

router.use("/api/v1/user", UserRouter);
router.use("/api/v1/blog", BlogRouter);

export default router;