import mongoose, { Schema } from "mongoose";
import { tr } from "../utils/string";
import { ResetTokenType } from "../types/resetToken";

const resetTokenSchema = new Schema<ResetTokenType>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.USER",
        },
      }),
    ],
  },
  hashedToken: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.RESET_TOKEN",
        },
      }),
    ],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  expiresAt: {
    type: Date,
    default: new Date(Date.now() + 1000 * 60 * 60 * 1),
  },
  used: {
    type: Boolean,
    default: false,
  },
});

const ResetToken = mongoose.model<ResetTokenType>(
  "ResetToken",
  resetTokenSchema
);

export default ResetToken;
