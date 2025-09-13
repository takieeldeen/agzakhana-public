import mongoose, { Schema } from "mongoose";
import { CartType } from "../types/cart";

const cartItemSchema = new Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  deal: {
    type: mongoose.Types.ObjectId,
    ref: "Deal",
  },
  qty: Number,
});

const cartSchema = new Schema<CartType>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    select: false,
  },
  cart: {
    type: [cartItemSchema],
    default: [],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
