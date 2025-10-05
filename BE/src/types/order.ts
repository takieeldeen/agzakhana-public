import mongoose from "mongoose";
import { UserType } from "./users";

export type OrderType = {
  userId: mongoose.Types.ObjectId | UserType;
  items: {
    productId: mongoose.Types.ObjectId | null;
    dealId: mongoose.Types.ObjectId | null;
    nameAr: string;
    nameEn: string;
    imageUrl: string;
    price: number;
    qty: number;
  }[];
  total: number;
  currency: string;
  status: "pending" | "paid" | "failed";
  stripeSessionId: string;
  shippingDetails?: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    state: string;
    postalCode: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
