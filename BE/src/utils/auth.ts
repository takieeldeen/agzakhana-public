import { NextFunction, Request, Response } from "express";
import catchAsync, { ProtectedRequest } from "./catchAsync";
import { decode, verify } from "jsonwebtoken";
import User from "../models/usersModel";

export const authenticateUser = catchAsync(
  async (
    req: ProtectedRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    const { token } = req.cookies;
    if (!token)
      return res.status(401).json({
        status: "fail",
        message: "Please Log in to be able to use this endpoint",
      });
    const { id: userId } =
      (verify(token!, process.env.JWT_SECRET!, (err: any, decoded: any) => {
        if (err) return undefined;
        return decoded;
      }) as { id: string; iat: number; exp: number } | undefined) ?? {};
    if (!userId) {
      return res.status(401).json({
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
