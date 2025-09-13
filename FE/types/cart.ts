import { Medicine } from "./medcines";
import { Offer } from "./offers";

export type CartList = {
  product: Partial<Medicine>;
  deal: Partial<Offer>;
  qty: number;
  _id: string;
}[];

export type Cart = {
  _id: string;
  cart: CartList;
  createdAt: Date;
  updatedAt: Date;
};
