import { NextFunction, Request, Response } from "express";
import User from "../models/usersModel";
import { compare } from "bcrypt";
import catchAsync, { ProtectedRequest } from "../utils/catchAsync";
import { AppError } from "../utils/errors";
import { verify } from "jsonwebtoken";
import axios from "axios";
import { generateToken } from "../utils/tokens";
import { sendMail } from "../services/emailServices";
import { generateMailTemplate } from "../templates/mails";
import { clientLocale } from "../app";
import { createHash, randomBytes } from "crypto";
import ResetToken from "../models/resetTokenModel";
import { UserType } from "../types/users";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export const register = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: Partial<UserType> = {
      email: req?.body?.email,
      password: req?.body?.password,
      passwordConfirmation: req?.body?.passwordConfirmation,
      isActive: false,
    };
    const plainToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(plainToken).digest("hex");
    newUser.activationToken = hashedToken;

    await User.create(newUser);
    await sendMail({
      to: [newUser.email!],
      subject: "Agzakhana | Welcome To Agzakhana",
      html: generateMailTemplate({
        title: req.t("MAILS.TITLE.SIGN_UP", { lng: clientLocale }),
        content: req.t("MAILS.CONTENT.SIGN_UP", { lng: clientLocale }),
        user: newUser?.email!,
        actionTitle: req.t("MAILS.ACTION_TITLE.SIGN_UP", {
          lng: clientLocale,
        }),
        actionSubtitle: req.t("MAILS.ACTION_SUBTITLE.SIGN_UP", {
          lng: clientLocale,
        }),
        actionLink: `${process.env.CLIENT_URL}/sign-up?token=${plainToken}`,
      }),
    });
    res.status(201).json({
      status: "success",
    });
  }
);

export const checkEmailValidity = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const user = await User.findOneAndUpdate(
      {
        activationToken: hashedToken,
      },
      { $set: { activationToken: null } },
      { new: true }
    );
    if (!user)
      return next(new AppError(400, req.t("MESSAGES.TOKEN_NOT_FOUND")));
    generateToken(res, user);

    res.status(200).json({
      status: "success",
      content: user,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password)
      return next(new AppError(400, req.t("LOGIN.MISSING_CREDENTIALS")));

    const user = await User.findOne({
      email,
      provider: "LOCAL",
    }).select("+password");
    if (!user?.password)
      return next(new AppError(400, req.t("LOGIN.WRONG_CREDENTIALS")));
    const valid = await compare(password, user.password);
    if (!valid)
      return next(new AppError(400, req.t("LOGIN.WRONG_CREDENTIALS")));
    if (!user?.isActive)
      return next(new AppError(400, req.t("LOGIN.INACTIVE_ACCOUNT")));
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
        isActive: true,
      };
      user = await User.create(newUser);
    }
    generateToken(res, user);
    res.redirect("http://localhost:3000");

    res.status(200).json({ status: "success" });
  }
);
export const checkAuth = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
      isAuthenticated: false,
      user: null,
    });
    return;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    const user = await User.findById(decoded.id);

    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
      isAuthenticated: !!user,
      user,
    });
  } catch (err) {
    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
      isAuthenticated: false,
      user: null,
    });
  }
});

export const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.cookie("token", "");
    res.status(200).json({
      status: req.t("COMMON.SUCCESS"),
    });
  }
);

export const forgetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    //1. Disable all other tokens for the same user
    await ResetToken.updateMany(
      {
        userId: user?._id,
        used: false,
        expiresAt: { $gt: new Date() },
      },
      {
        $set: {
          expiresAt: new Date(Date.now() - 1000 * 60 * 60),
        },
      }
    );

    // 2. Create new Valid token for this user
    const plainToken = randomBytes(32).toString("hex");
    const hashedToken = createHash("sha256").update(plainToken).digest("hex");
    await ResetToken.create({
      hashedToken,
      userId: user?._id,
    });
    // 3. Send Email to the user with the new token
    if (!!user) {
      await sendMail({
        to: email,
        subject: "Agzakhana | reset your password",
        html: generateMailTemplate({
          title: req.t("MAILS.TITLE.RESET_PASSWORD", { lng: clientLocale }),
          content: req.t("MAILS.CONTENT.RESET_PASSWORD", { lng: clientLocale }),
          user: user?.name,
          actionTitle: req.t("MAILS.ACTION_TITLE.RESET_PASSWORD", {
            lng: clientLocale,
          }),
          actionSubtitle: req.t("MAILS.ACTION_SUBTITLE.RESET_PASSWORD", {
            lng: clientLocale,
          }),
          actionLink: `${process.env.CLIENT_URL}/reset-password?token=${plainToken}`,
        }),
      });
    }
    res.status(200).json({
      status: "success",
      message: req.t("MESSAGES.FORGET_PASSWORD_SUCCESSFUL", {
        lng: clientLocale,
      }),
    });
  }
);

export const checkResetToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body;
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const tokenData = await ResetToken.findOne({
      hashedToken,
      expiresAt: { $gt: new Date() },
      used: false,
    }).populate({
      path: "userId",
      select: "name email imageUrl",
    });
    if (!tokenData)
      return next(new AppError(400, req.t("MESSAGES.TOKEN_NOT_FOUND")));
    res.status(200).json({
      status: "success",
      user: tokenData?.userId,
    });
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { token, password, passwordConfirmation } = req.body;
    // 1.Check that the token is still valid
    const hashedToken = createHash("sha256").update(token).digest("hex");
    const tokenData = await ResetToken.findOne({
      hashedToken,
      expiresAt: { $gt: new Date() },
      used: false,
    });
    if (!tokenData)
      return next(new AppError(400, req.t("MESSAGES.TOKEN_NOT_FOUND")));
    // 2.Update the user data
    const user = await User.findById(tokenData?.userId);
    if (!user)
      return next(new AppError(400, req.t("MESSAGES.TOKEN_NOT_FOUND")));
    user.password = password;
    user.passwordConfirmation = passwordConfirmation;
    await user.save();
    // 2.Invalidate the token
    await ResetToken.findByIdAndUpdate(tokenData?._id, { used: true });
    generateToken(res, user);
    res.status(200).json({
      status: "success",
      content: tokenData?.userId,
    });
  }
);

export const updateProfile = catchAsync(
  async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    const { name, phoneNumber, address, gender, imageUrl, birthDate } =
      req.body;
    const { file } = req;
    const userData = {
      name,
      phoneNumber,
      address,
      gender,
      imageUrl,
      birthDate,
    };
    if (file && typeof file !== "string") {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
      const imageName = `${req?.user?.email?.split("@")?.[0]}`;
      await supabase.storage
        .from("agzakhana-profilepic")
        .upload(imageName, file.buffer, {
          upsert: true,
          contentType: file?.mimetype,
        });
      const { data } = supabase.storage
        .from("agzakhana-profilepic")
        .getPublicUrl(imageName);
      userData.imageUrl = data?.publicUrl;
    }
    const user = await User.findByIdAndUpdate(req?.user?._id, userData, {
      new: true,
    });
    res.status(201).json({
      status: "success",
      user,
    });
  }
);
