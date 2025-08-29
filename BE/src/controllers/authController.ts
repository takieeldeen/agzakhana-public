import { NextFunction, Request, Response } from "express";
import User from "../models/usersModel";
import { compare } from "bcrypt";
import catchAsync from "../utils/catchAsync";
import { AppError } from "../utils/errors";
import { sign, verify } from "jsonwebtoken";
import axios from "axios";
import { generateToken } from "../utils/tokens";

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = {
      email: req?.body?.email,
      password: req?.body?.password,
      passwordConfirmation: req?.body?.passwordConfirmation,
    };
    await User.create(newUser);
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

    const user = await User.findOne({ email, provider: "LOCAL" }).select(
      "+password"
    );
    if (!user?.password)
      return next(new AppError(400, req.t("LOGIN.WRONG_CREDENTIALS")));
    const valid = await compare(password, user.password);
    if (!valid)
      return next(new AppError(400, req.t("LOGIN.WRONG_CREDENTIALS")));
    generateToken(res, user);
    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
      user: user,
    });
  }
);

export const loginWithGoogle = catchAsync(
  async (req: Request, res: Response) => {
    const CLIENT_ID = process.env.OAUTH_CLIENT_ID;
    const REDIRECT_URI = process.env.OAUTH_REDIRECT_URL;
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=profile email`;
    res.redirect(url);
  }
);

export const googleLoginCallback = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.query;
    const { data } = await axios.post("https://oauth2.googleapis.com/token", {
      client_id: process.env.OAUTH_CLIENT_ID,
      client_secret: process.env.OAUTH_CLIENT_SECRET,
      code,
      redirect_uri: process.env.OAUTH_REDIRECT_URL,
      grant_type: "authorization_code",
    });

    const { access_token, id_token } = data;

    // Use access_token or id_token to fetch user profile
    const { data: profile } = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: { Authorization: `Bearer ${access_token}` },
      }
    );
    let user = await User.findOne({ email: profile?.email });
    if (!user) {
      const { email, name, picture } = profile;
      const newUser = {
        name,
        email,
        imageUrl: picture,
        provider: "GOOGLE",
      };
      user = await User.create(newUser);
    }
    generateToken(res, user);
    res.redirect("http://localhost:3000");

    res.status(200).json({ status: "success" });
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
