import mongoose, { Schema, Types } from "mongoose";
import { ProductType } from "../types/products";

const productSchema = new Schema<ProductType>({
  nameAr: {
    type: String,
    required: true,
  },
  nameEn: {
    type: String,
    required: true,
  },
  category: {
    type: Types.ObjectId,
    ref: "Category",
  },
  rating: Number,
  manufacturer: String,
  price: Number,
  beforeDiscount: Number,
  tag: String,
  imageUrl: String,
  descriptionAr: String,
  descriptionEn: String,
  concentration: [String],
  indicationsAr: String,
  indicationsEn: String,
  dosageAr: String,
  dosageEn: String,
  qty: {
    type: Number,
    default: 1,
    required: true,
  },
  maxQty: {
    type: Number,
    default: 1,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
