import { UserType } from "./users";

export type RoleType = {
  nameAr: string;
  nameEn: string;
  status: "ACTIVE" | "INACTIVE";
  descriptionAr: string;
  descriptionEn: string;
  createdBy: UserType;
  updatedAt: Date;
  permissionGroups: { _id: string; nameAr: string; nameEn: string }[];
};

export type Permission = {
  _id: string;
  nameAr: string;
  nameEn: string;
  value: string;
};
