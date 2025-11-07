import { UserListItem } from "./users";

export type Role = {
  _id: string;
  nameEn: string;
  nameAr: string;
  descriptionEn: string;
  descriptionAr: string;
  status: string;
  permissionsCount: number;
  usersCount: number;
  permissionGroups: {
    _id: string;
    nameAr: string;
    nameEn: string;
    permissions: Permission[];
  }[];
  createdBy: Partial<UserListItem>;
  createdAt: string;
  updatedAt: string;
};

export type RoleListItem = Omit<
  Role,
  "permissionGroups" | "createdBy" | "createdAt" | "updatedAt"
>;

export type Permission = {
  _id: string;
  nameAr: string;
  nameEn: string;
  value: string;
};
