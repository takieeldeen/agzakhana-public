import { NextFunction, Request, Response } from "express";
import catchAsync, { ProtectedRequest } from "./catchAsync";
import { decode } from "jsonwebtoken";
import User from "../models/usersModel";

export const authenticateUser = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    const userId = (decode(token) as any)?.id;
    if (!userId) {
      res.status(401).json({
        status: "fail",
        message: "Please Log in to be able to use this endpoint",
      });
    } else {
      const user = await User.findById(userId);
      req.user = user!;
      next();
    }
  }
);
