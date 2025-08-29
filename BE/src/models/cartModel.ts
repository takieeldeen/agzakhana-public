import mongoose, { Schema } from "mongoose";
import { CartType } from "../types/cart";

const cartItemSchema = new Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
  },
  qty: Number,
});

const cartSchema = new Schema<CartType>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
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
