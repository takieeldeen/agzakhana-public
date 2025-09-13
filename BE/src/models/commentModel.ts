import mongoose, { Schema } from "mongoose";
import { CommentType } from "../types/comment";
import i18next, { t } from "i18next";

const commentSchema = new Schema<CommentType>({
  comment: {
    type: String,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    min: [1, (() => t("COMMON.FIELD_MIN_VAL"))()] as any,
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
    default: null,
  },
  dealId: {
    type: mongoose.Types.ObjectId,
    ref: "Deal",
    default: null,
  },
});

const Comment = mongoose.model<CommentType>("Comment", commentSchema);
export default Comment;
