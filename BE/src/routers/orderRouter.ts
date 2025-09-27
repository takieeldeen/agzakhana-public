import { Router } from "express";
import { getOrderDetails } from "../controllers/orderController";
import { authenticateUser } from "../utils/auth";

const ordersRouter = Router();

ordersRouter.route("/:stripeSessionId").get(authenticateUser, getOrderDetails);

export default ordersRouter;
