import mongoose, { Schema } from "mongoose";
import { CommentType } from "../types/comment";

const commentSchema = new Schema<CommentType>({
  comment: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
});

const Comment = mongoose.model<CommentType>("Comment", commentSchema);
export default Comment;
