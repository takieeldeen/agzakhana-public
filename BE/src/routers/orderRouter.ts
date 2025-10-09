import { Router } from "express";
import { getMyOrders, getOrderDetails } from "../controllers/orderController";
import { authenticateUser } from "../utils/auth";

const ordersRouter = Router();

ordersRouter.route("/my-orders").get(authenticateUser, getMyOrders);
ordersRouter.route("/:stripeSessionId").get(authenticateUser, getOrderDetails);

export default ordersRouter;
