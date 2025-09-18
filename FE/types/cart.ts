import { Medicine } from "./medcines";
import { Offer } from "./offers";

export type CartListItem = {
  product: Partial<Medicine>;
  deal: Partial<Offer>;
  qty: number;
  _id: string;
};

export type CartList = CartListItem[];

export type Cart = {
  _id: string;
  cart: CartList;
  createdAt: Date;
  updatedAt: Date;
};
