import { LocalizaedObject } from "./common";

export type DealType = {
  _id: string;
  nameAr: string;
  nameEn: string;
  rating: number;
  manufacturer: string;
  price: number;
  beforeDiscount: number;
  imageUrl: string;
  expiresAt: Date;
  createdAt: Date;
  qty: number;
  maxQty: number;
  category: LocalizaedObject;
};
