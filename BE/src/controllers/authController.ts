import { NextFunction, Request, Response } from "express";
import User from "../models/usersModel";
import { compare } from "bcrypt";
import catchAsync from "../utils/catchAsync";
import { AppError } from "../utils/errors";
import { JwtPayload, sign, verify } from "jsonwebtoken";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = {
      email: req?.body?.email,
      password: req?.body?.password,
      passwordConfirmation: req?.body?.passwordConfirmation,
    };
    await User.insertOne(newUser);
    res.status(201).json({
      status: "success",
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError(400, req.t("LOGIN.MISSING_CREDENTIALS")));

    const user = await User.findOne({ email }).select("+password");
    if (!user?.password)
      return next(new AppError(400, req.t("LOGIN.WRONG_CREDENTIALS")));
    const valid = await compare(password, user.password);
    if (!valid)
      return next(new AppError(400, req.t("LOGIN.WRONG_CREDENTIALS")));
    const token = sign({ id: user?.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.TOKEN_EXP! as any,
    });
    res.cookie("token", token, {
      secure: true,
      httpOnly: true,
      maxAge: +process.env.TOKEN_COOKIE_AGE!,
    });
    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
    });
  }
);

export const checkAuth = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    if (!token) {
      res.status(200).json({
        status: req.t("COMMON.SUCCESS"),
        isAuthenticated: false,
        user: null,
      });
    }
    const decoded = verify(
      token,
      process?.env?.JWT_SECRET!,
      function (err: any, decoded: any) {
        if (err) {
          res.status(200).json({
            status: req.t("COMMON.SUCCESS"),
            isAuthenticated: false,
            user: null,
          });
        } else {
          return decoded;
        }
      }
    ) as any;
    const user = await User.findById(decoded?.id!);
    if (!user) {
      res.status(200).json({
        status: req.t("COMMON.SUCCESS"),
        isAuthenticated: false,
        user: null,
      });
    }
    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
      isAuthenticated: true,
      user,
    });
  }
);

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "");
    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
    });
  }
);
