import { PermissionType } from "./permission";

export type PermissionGroupsType = {
  _id: string;
  nameAr: string;
  nameEn: string;
  permissions: PermissionType[];
};
