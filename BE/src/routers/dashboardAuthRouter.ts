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

authRouter.route("/register").post(authController.register);
