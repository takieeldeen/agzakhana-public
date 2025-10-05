import mongoose, { Schema } from "mongoose";
import { OrderType } from "../types/order";
import { tr } from "../utils/string";

const orderSchema = new Schema<OrderType>({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.USER",
        },
      }) as string,
    ],
  },
  total: {
    type: Number,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.TOTAL",
        },
      }),
    ],
  },
  currency: {
    type: String,
    default: "EGP",
  },
  status: {
    type: String,
    default: "pending",
    enum: ["pending", "paid", "failed"],
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.STATUS",
        },
      }),
    ],
  },
  stripeSessionId: {
    type: String,
    required: [true, "Please enter stripe session id"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  shippingDetails: {
    type: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      state: String,
      postalCode: Number,
    },
  },
  items: {
    type: [
      {
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
        nameAr: {
          type: String,
          required: [
            true,
            tr("VALIDATIONS.REQUIRED_FIELD", {
              placeholders: {
                field: "FIELDS.NAME_AR",
              },
            }),
          ],
        },
        nameEn: {
          type: String,
          required: [
            true,
            tr("VALIDATIONS.REQUIRED_FIELD", {
              placeholders: {
                field: "FIELDS.NAME_EN",
              },
            }),
          ],
        },
        imageUrl: {
          type: String,
          default: null,
        },
        price: {
          type: Number,
          validate: {
            validator: (val: number) => val >= 0,
            message: tr("VALIDATIONS.POSITVE_NUMBER", {
              placeholders: {
                field: "FIELDS.PRICE",
              },
            }),
          },
          required: [
            true,
            tr("VALIDATIONS.REQUIRED_FIELD", {
              placeholders: {
                field: "FIELDS.PRICE",
              },
            }),
          ],
        },
        qty: {
          type: Number,
          validate: {
            validator: (val: number) => val >= 0,
            message: tr("VALIDATIONS.POSITVE_NUMBER", {
              placeholders: {
                field: "FIELDS.QTY",
              },
            }),
          },
          required: [
            true,
            tr("VALIDATIONS.REQUIRED_FIELD", {
              placeholders: {
                field: "FIELDS.QTY",
              },
            }),
          ],
        },
      },
    ],
    validate: {
      validator: (itemsArr) => itemsArr?.length > 0,
      message: tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.ITEMS",
        },
      }),
    },
  },
});

const Order = mongoose.model<OrderType>("Order", orderSchema);

export default Order;
