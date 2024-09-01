import Express from "express";
import verifyJWT from "../middlewares/Auth.middleware.js";
import {getAllBlogs, getBlogById, postBlog} from "../controllers/BlogController/BlogController.js"
import { upload } from "../middlewares/Multer.middleware.js";
const BlogRouter = Express.Router();

BlogRouter.post("/postblog", verifyJWT, postBlog);
BlogRouter.get("/bulk", getAllBlogs) 
BlogRouter.get("/getblogbyid/:id",getBlogById)

export default BlogRouter;