import { NextFunction, Request, Response } from "express";
import catchAsync, { ProtectedRequest } from "../utils/catchAsync";
import Order from "../models/orderModel";

export const getOrderDetails = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { stripeSessionId } = req?.params;
    const userId = req?.user?._id;
    const order = await Order.findOne({ stripeSessionId, userId });
    if (!order)
      res.status(200).json({
        status: "success",
        message: "Order Not Found",
        content: null,
      });
    res.status(200).json({
      status: "success",
      content: order,
    });
  }
);
