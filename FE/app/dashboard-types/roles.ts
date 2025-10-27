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
};

export type Permission = {
  _id: string;
  nameAr: string;
  nameEn: string;
  value: string;
};
