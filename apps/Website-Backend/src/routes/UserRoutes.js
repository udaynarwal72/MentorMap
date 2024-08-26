import Express from "express";
import { userSignUp } from "../controllers/UserController/UserController.js";
const UserRouter = Express.Router();

UserRouter.get("/usersignup", userSignUp);

export default UserRouter;