import mongoose, { Schema } from "mongoose";
import { CommentType } from "../types/comment";
import { tr } from "../utils/string";
import { t } from "i18next";

const commentSchema = new Schema<CommentType>({
  comment: {
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "REVIEWS.COMMENT",
        },
      }),
    ],
  },
  rate: {
    type: Number,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "REVIEWS.RATE",
        },
      }),
    ],
    validate: [
      {
        validator: (val) => val >= 1,
        message: tr("VALIDATIONS.MIN_VAL", {
          placeholders: {
            field: "REVIEWS.RATE",
          },
          value: 1,
        }),
      },
      {
        validator: (val) => val <= 5,
        message: tr("VALIDATIONS.MAX_VAL", {
          placeholders: {
            field: "REVIEWS.RATE",
          },
          value: 5,
        }),
      },
    ],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  productId: {
    type: mongoose.Types.ObjectId,
    ref: "Product",
    default: null,
  },
  dealId: {
    type: mongoose.Types.ObjectId,
    ref: "Deal",
    default: null,
  },
});

const Comment = mongoose.model<CommentType>("Comment", commentSchema);
export default Comment;
