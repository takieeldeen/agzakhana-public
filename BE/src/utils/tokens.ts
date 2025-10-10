import { Response } from "express";
import { UserType } from "../types/users";
import { sign } from "jsonwebtoken";

export function generateToken(res: Response, user: UserType) {
  const token = sign({ id: user?._id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.TOKEN_EXP! as any,
  });
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // HTTPS only in prod
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // needed for cross-site cookies
    maxAge: +process.env.TOKEN_COOKIE_AGE!,
  });
}
