import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import Message from "../models/messageModel";

export const sendContacUsMessage = catchAsync(
  async (req: Request, res: Response) => {
    const { firstName, lastName, email, message } = req.body;
    const payload = { firstName, lastName, email, message };
    await Message.create(payload);
    res.status(200).json({
      status: "success",
    });
  }
);
