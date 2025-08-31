import mongoose, { Schema, Types } from "mongoose";
import { DealType } from "../types/deals";

const dealsSchema = new Schema<DealType>({
  nameAr: String,
  nameEn: String,
  rating: Number,
  manufacturer: String,
  price: Number,
  beforeDiscount: {
    type: Number,
  },
  imageUrl: String,
  expiresAt: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
  },
  qty: {
    required: true,
    type: Number,
  },
  maxQty: {
    type: Number,
    default: 1,
  },
});

const Deal = mongoose.model<DealType>("Deal", dealsSchema);
export default Deal;
