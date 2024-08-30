import Express, { response } from "express";
import UserRouter from "./UserRoutes.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
const router = Express.Router();

router.get("/", (req, res) => {
    res.send("API is working");
});
router.post('/chat', async (req, res) => {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = "Help me with this statement:" + req.body.message;

    const result = await model.generateContent(prompt);
    console.log(result.response.text());
    res.send({ message: result.response.text() });
});

router.use("/api/v1/user", UserRouter);

export default router;