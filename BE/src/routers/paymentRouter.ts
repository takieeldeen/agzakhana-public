import { Router } from "express";
import { createCheckoutSession } from "../controllers/paymentController";
import { authenticateUser } from "../utils/auth";

export const paymentRouter = Router();

paymentRouter.post(
  "/create-checkout-session",
  authenticateUser,
  createCheckoutSession
);
