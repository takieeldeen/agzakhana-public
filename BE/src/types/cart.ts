import mongoose from "mongoose";
import { ProductType } from "./products";
import { UserType } from "./users";

export type CartType = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | UserType;
  cart: {
    product: mongoose.Types.ObjectId;
    qty: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
