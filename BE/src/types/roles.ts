import { PermissionType } from "./permission";

export type RoleType = {
  _id: string;
  nameEn: string;
  nameAr: string;
  descriptionAr: string;
  descriptionEn: string;
  status: "ACTIVE" | "INACTIVE";
  permissions: PermissionType[];
};
