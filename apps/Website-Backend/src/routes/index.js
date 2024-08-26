import Express from "express";
const router = Express.Router();

router.get("/api", (req, res) => {
    console.log('hi')
    res.send("API is working");
});

export default router;