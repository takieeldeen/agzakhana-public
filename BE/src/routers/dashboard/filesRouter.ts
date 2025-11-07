import { Router } from "express";
import {
  removeFile,
  uploadFile,
} from "../../controllers/dashboard/filesController";
import multer, { memoryStorage } from "multer";

const filesRouter = Router();

const fileStorage = memoryStorage();
const upload = multer({ storage: fileStorage });

filesRouter.route("/").post(upload.single("file"), uploadFile);

filesRouter.route("/:fileId").delete(removeFile);

export default filesRouter;
