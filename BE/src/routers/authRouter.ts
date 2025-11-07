import { Request, Router } from "express";
import * as authController from "../controllers/authController";
import multer from "multer";
import { authenticateUser } from "../utils/auth";

const authRouter = Router();

const imageStorage = multer.memoryStorage();
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  }
};
const upload = multer({ storage: imageStorage, fileFilter });

// authRouter.route("/login").post();
authRouter
  .route("/update-profile")
  .patch(
    upload?.single?.("imageUrl"),
    authenticateUser,
    authController.updateProfile
  );
authRouter.route("/register").post(authController.register);
authRouter.route("/forget-password").post(authController.forgetPassword);
authRouter.route("/reset-password").post(authController.resetPassword);
authRouter.route("/check-reset-token").post(authController.checkResetToken);
authRouter.route("/login").post(authController.login);
authRouter.route("/checkAuth").post(authController.checkAuth);
authRouter
  .route("/check-email-activation")
  .post(authController.checkEmailValidity);
authRouter.route("/logout").post(authController.logout);
authRouter.route("/login-with-google").get(authController.loginWithGoogle);
authRouter.route("/google/callback").get(authController.googleLoginCallback);

export default authRouter;
