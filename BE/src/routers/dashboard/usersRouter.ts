import { Request, Router } from "express";
import {
  createUser,
  deleteUserRole,
  getAllUsers,
  getUserDetails,
} from "../../controllers/dashboard/userController";
import multer from "multer";

const userRouter = Router();

const imageStorage = multer.memoryStorage();
const fileFilter = (req: Request, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  }
};
const upload = multer({ storage: imageStorage, fileFilter });
userRouter
  .route("/")
  .post(upload?.single?.("imageUrl"), createUser)
  .get(getAllUsers);

userRouter.route("/:userId").get(getUserDetails);
userRouter.route("/:userId/roles/:roleId").post(deleteUserRole);

export default userRouter;
