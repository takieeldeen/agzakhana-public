import { LocalizedObject } from "./common";

export type Tags = "HOT" | "SALE" | "NEW" | "DISCOUNT";

export type Medicine = {
  _id: string;
  nameAr: string;
  nameEn: string;
  category: LocalizedObject;
  rating: number;
  manufacturer: string;
  price: number;
  beforeDiscount: number;
  tag: Tags | null;
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

export type ManufacturerListItem = {
  name: string;
  count: number;
};
