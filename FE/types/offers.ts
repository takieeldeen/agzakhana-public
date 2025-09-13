import { Tags } from "./medcines";

export type Offer = {
  _id: string;
  nameAr: string;
  nameEn: string;
  rating: number;
  manufacturer: string;
  price: number;
  beforeDiscount: number;
  imageUrl: string;
  expiresAt: string;
  createdAt: string;
  descriptionAr: string;
  descriptionEn: string;
  indicationsAr: string;
  indicationsEn: string;
  dosageAr: string;
  dosageEn: string;
  tag: Tags | null;
  maxQty: number;
  qty: number;
};
