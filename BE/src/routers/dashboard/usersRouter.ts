import { Request, Router } from "express";
import {
  activateUser,
  createUser,
  deactivateUser,
  deleteUser,
  deleteUserRole,
  editUser,
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

userRouter
  .route("/:userId")
  .get(getUserDetails)
  .patch(upload?.single?.("imageUrl"), editUser)
  .delete(deleteUser);
// Action
userRouter.route("/:userId/roles/:roleId").post(deleteUserRole);
userRouter.route("/:userId/activate").post(activateUser);
userRouter.route("/:userId/deactivate").post(deactivateUser);
export default userRouter;
