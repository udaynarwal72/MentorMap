import Express from "express";
import verifyJWT from "../middlewares/Auth.middleware.js";
import {getAllBlogs, postBlog} from "../controllers/BlogController/BlogController.js"
import { upload } from "../middlewares/Multer.middleware.js";
const BlogRouter = Express.Router();

BlogRouter.post("/postblog", verifyJWT, postBlog);
BlogRouter.get("/bulk", getAllBlogs) 

export default BlogRouter;