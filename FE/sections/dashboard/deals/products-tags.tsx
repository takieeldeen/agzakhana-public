"use client";
import { useGetCartItems } from "@/client-api/cart";
import { IncartTag } from "@/components/tags";
import { Medicine } from "@/types/medcines";
import { Offer } from "@/types/offers";
import { AnimatePresence } from "framer-motion";

type Props = {
  product: Medicine | Offer;
};
export default function ProductsTags({ product }: Props) {
  const { cart } = useGetCartItems(false);
  // HELPER CONSTANTS //////////////////////////////////////////
  const CART_ITEM = cart?.find(
    (item) =>
      item?.product?._id === product?._id || item?.deal?._id === product?._id
  );
  const ALREADY_IN_CART = !!CART_ITEM;
  return (
    <div className="flex flex-row gap-2">
      <AnimatePresence>{ALREADY_IN_CART && <IncartTag />}</AnimatePresence>
      {/* <FreeShippingTag /> */}
    </div>
  );
}
