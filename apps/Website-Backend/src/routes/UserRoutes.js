import Express from "express";
import { checkAuthentication, findUserById, userContactUs, userLogin, userSignUp } from "../controllers/UserController/UserController.js";
import verifyJWT from "../middlewares/Auth.middleware.js"
import { upload } from "../middlewares/Multer.middleware.js";
const UserRouter = Express.Router();

UserRouter.post("/usersignup", upload.fields([
    { name: 'avatar', maxCount: 1 }
]), userSignUp);
UserRouter.post("/userlogin", userLogin);
UserRouter.get("/checkauth", verifyJWT, checkAuthentication);
UserRouter.get("/findbyid/:userId", verifyJWT, findUserById);
UserRouter.post("/contactus",userContactUs);

export default UserRouter;