import mongoose from "mongoose";
import { ProductType } from "./products";
import { UserType } from "./users";

export type CommentType = {
  _id: string;
  comment: string;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
  userId: mongoose.Types.ObjectId | UserType;
  productId: mongoose.Types.ObjectId | ProductType;
};
