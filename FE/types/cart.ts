import { Medicine } from "./medcines";

export type CartList = {
  product: Partial<Medicine>;
  qty: number;
  _id: string;
}[];

export type Cart = {
  _id: string;
  cart: CartList;
  createdAt: Date;
  updatedAt: Date;
};
