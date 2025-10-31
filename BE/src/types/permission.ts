import { PermissionGroupsType } from "./permissionsGroups";

export type PermissionType = {
  _id: string;
  nameAr: string;
  nameEn: string;
  value: string;
  permissionGroup: PermissionGroupsType | string;
};
