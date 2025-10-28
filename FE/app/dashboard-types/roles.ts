import { User } from "./users";

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
  createdBy: Partial<User>;
  createdAt: string;
};

export type Permission = {
  _id: string;
  nameAr: string;
  nameEn: string;
  value: string;
};
