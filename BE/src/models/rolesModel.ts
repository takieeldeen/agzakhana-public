import mongoose, { Schema } from "mongoose";
import { RoleType } from "../types/roles";
import { tr } from "../utils/string";

const roleSchema = new Schema<RoleType>(
  {
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
    descriptionAr: {
      type: String,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.DESC_AR",
          },
        }),
      ],
    },
    descriptionEn: {
      type: String,
      required: [
        true,
        tr("VALIDATIONS.REQUIRED_FIELD", {
          placeholders: {
            field: "FIELDS.DESC_EN",
          },
        }),
      ],
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
    permissions: [{ type: mongoose.Schema.Types.ObjectId, ref: "Permission" }],
  },
  { timestamps: true }
);

export const Role = mongoose.model<RoleType>("Role", roleSchema, "roles"); // ✅ explicitly bind collection if needed
