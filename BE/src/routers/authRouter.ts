import { Router } from "express";
import * as authController from "../controllers/authController";

const authRouter = Router();

// authRouter.route("/login").post();
authRouter.route("/register").post(authController.register);
authRouter.route("/login").post(authController.login);
authRouter.route("/checkAuth").post(authController.checkAuth);
authRouter.route("/logout").post(authController.logout);

export default authRouter;
