import mongoose from "mongoose";
import { ProductType } from "./products";
import { UserType } from "./users";
import { DealType } from "./deals";

export type CommentType = {
  _id: string;
  comment: string;
  rate: number;
  createdAt: Date;
  updatedAt: Date;
  userId: mongoose.Types.ObjectId | UserType;
  productId: mongoose.Types.ObjectId | ProductType;
  dealId: mongoose.Types.ObjectId | DealType;
};
