import mongoose from "mongoose";
import { DashboardUserType } from "./users";

export type BranchType = {
  _id: string;
  nameAr: string;
  nameEn: string;
  status: string;
  location: { type: string; coordinates: [number, number] };
  address: {
    lng: number;
    lat: number;
    displayName: string;
  };
  phoneNumber: string;
  manager: mongoose.Types.ObjectId | DashboardUserType;
  startHour: string;
  endHour: string;
};
