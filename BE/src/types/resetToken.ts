import mongoose from "mongoose";
import { UserType } from "./users";

export type ResetTokenType = {
  _id: string;
  userId: mongoose.Types.ObjectId | UserType;
  hashedToken: string;
  createdAt: Date;
  expiresAt: Date;
  used: boolean;
};
