import { LocalizedObject } from "@/types/common";
import { localizedObject } from "./common";

export type UserListItem = {
  _id: string;
  nameAr: string;
  nameEn: string;
  status: "ACTIVE" | "INACTIVE";
  email: string;
  imageUrl: string;
  roles: localizedObject[];
  joiningDate: string;
  branch: localizedObject;
  address: {
    lat: number;
    lng: number;
    displayName: string;
  };
  phoneNumber: string;
  gender: "MALE" | "FEMALE";
};

export type User = {
  _id: string;
  imageUrl: "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/Dashboard-profile-pics/islam-29803280104899";
  nameAr: string;
  nameEn: string;
  email: string;
  phoneNumber: string;
  branch: LocalizedObject;
  status: "ACTIVE" | "INACTIVE";
  gender: "MALE" | "FEMALE";
  birthDate: Date;
  joiningDate: Date;
  nationalId: string;
  nationality: LocalizedObject;
  city: LocalizedObject;
  roles: (LocalizedObject & { status: string })[];
  location: {
    lat: number;
    lng: number;
    displayName: string;
  };
  permissionGroups: {
    _id: string;
    nameAr: string;
    nameEn: string;
    permissions: LocalizedObject[];
  }[];
  googleMapUrl: string;
  lastLogin: string;
  updatedAt: string;
  files: (
    | File
    | { _id: string; name: string; type: string; url: string; size: number }
  )[];
};
