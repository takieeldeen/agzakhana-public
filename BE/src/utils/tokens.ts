import { Response } from "express";
import { UserType } from "../types/users";
import { sign } from "jsonwebtoken";

export function generateToken(res: Response, user: UserType) {
  const token = sign({ id: user?.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.TOKEN_EXP! as any,
  });
  res.cookie("token", token, {
    secure: true,
    httpOnly: true,
    maxAge: +process.env.TOKEN_COOKIE_AGE!,
  });
}
