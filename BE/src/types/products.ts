import { LocalizaedObject } from "./common";

export type ProductType = {
  id: string;
  nameAr: string;
  nameEn: string;
  category: LocalizaedObject;
  rating: number;
  manufacturer: string;
  price: number;
  beforeDiscount: number;
  tag: string | null;
  imageUrl: string;
  descriptionAr: string;
  descriptionEn: string;
  concentration?: string[];
  indicationsAr: string;
  indicationsEn: string;
  dosageAr: string;
  dosageEn: string;
  qty: number;
  maxQty: number;
};
