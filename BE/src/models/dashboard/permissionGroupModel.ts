import mongoose, { Schema } from "mongoose";
import { PermissionGroupsType } from "../../types/permissionsGroups";
import { tr } from "../../utils/string";

const permissionGroupSchema = new Schema<PermissionGroupsType>({
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
  permissions: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

const PermissionGroup = mongoose.model<PermissionGroupsType>(
  "PermissionGroup",
  permissionGroupSchema
);
export default PermissionGroup;
