export type Order = {
  userId: string;
  items: {
    productId: string | null;
    dealId: string | null;
    nameAr: string;
    nameEn: string;
    imageUrl: string;
    price: number;
    qty: number;
  }[];
  total: number;
  currency: string;
  status: "pending" | "paid" | "failed";
  stripeSessionId: string;
  shippingDetails?: {
    city: string;
    country: string;
    line1: string;
    line2: string;
    state: string;
    postalCode: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
};
