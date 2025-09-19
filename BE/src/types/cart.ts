import mongoose from "mongoose";
import { ProductType } from "./products";
import { UserType } from "./users";
import { DealType } from "./deals";

export type CartType = {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId | UserType;
  cart: {
    product: mongoose.Types.ObjectId | ProductType;
    deal: mongoose.Types.ObjectId | DealType;
    qty: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
};
