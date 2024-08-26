import Express from "express";
import UserRouter from "./UserRoutes.js";
const router = Express.Router();

router.get("/", (req, res) => {
    res.send("API is working");
});

router.use("/api/v1/user",UserRouter);

export default router;