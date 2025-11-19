import { LocalizedObject } from "@/types/common";

export type BranchListItem = {
  _id: string;
  nameAr: string;
  nameEn: string;
  status: string;
  address: {
    lat: number;
    lng: number;
    displayName: string;
  };
  phoneNumber: string;
  manager: LocalizedObject;
  startHour: string;
  endHour: string;
};
export type BranchType = {
  _id: string;
  nameAr: string;
  nameEn: string;
  status: string;
  address: {
    lat: number;
    lng: number;
    displayName: string;
  };
  phoneNumber: string;
  manager: LocalizedObject;
  startHour: string;
  endHour: string;
};
