import { Router } from "express";
import {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
} from "../controllers/cartController";
import { authenticateUser } from "../utils/auth";

const cartRouter = Router();

cartRouter
  .route("/")
  .get(authenticateUser, getCart)
  .post(authenticateUser, addToCart);

cartRouter
  .route("/:cartItemId")
  .delete(authenticateUser, removeFromCart)
  .patch(authenticateUser, updateCartItem);
export default cartRouter;
