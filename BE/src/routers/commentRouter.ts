import { Router } from "express";
import { authenticateUser } from "../utils/auth";
import {
  createComment,
  deleteComment,
  getAllComments,
  updateComment,
} from "../controllers/commentController";

const commentRouter = Router({ mergeParams: true });

commentRouter
  .route("/")
  .get(getAllComments)
  .post(authenticateUser, createComment);

commentRouter
  .route("/:commentId")
  .delete(authenticateUser, deleteComment)
  .patch(authenticateUser, updateComment);

export default commentRouter;
