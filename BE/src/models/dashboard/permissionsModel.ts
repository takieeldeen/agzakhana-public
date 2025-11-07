import mongoose, { Schema } from "mongoose";
import { PermissionType } from "../../types/permission";
import { tr } from "../../utils/string";

const permissionsSchema = new Schema<PermissionType>({
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
  value: {
    select: false,
    type: String,
    required: [
      true,
      tr("VALIDATIONS.REQUIRED_FIELD", {
        placeholders: {
          field: "FIELDS.VALUE",
        },
      }),
    ],
  },
  permissionGroup: {
    type: mongoose.Types.ObjectId,
    ref: "PermissionGroup",
  },
});

const Permission = mongoose.model<PermissionType>(
  "Permission",
  permissionsSchema
);
export default Permission;
