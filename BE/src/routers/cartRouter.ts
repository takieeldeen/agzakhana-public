import { Router } from "express";
import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController";
import { authenticateUser } from "../utils/auth";

const cartRouter = Router();

cartRouter
  .route("/")
  .get(authenticateUser, getCart)
  .post(authenticateUser, addToCart)
  .delete(authenticateUser, clearCart);

cartRouter
  .route("/:cartItemId")
  .delete(authenticateUser, removeFromCart)
  .patch(authenticateUser, updateCartItem);
export default cartRouter;
