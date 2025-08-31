"use client";

import { Medicine } from "@/types/medcines";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetCartItems, useMutateCart } from "@/api/cart";
import { ComponentProps, useCallback } from "react";
import { cn } from "@/lib/utils";
import CircularProgress from "./circular-progress";

type Props = {
  product: Medicine;
} & ComponentProps<"button">;
export default function AddToCartButton({ product, ...other }: Props) {
  // Custom Hooks //////////////////////////////////////////
  const t = useTranslations();
  // Data Fetching Hooks //////////////////////////////////
  const { addToCart, removeFromCart } = useMutateCart();
  const { isPending: isAdding } = addToCart;
  const { isPending: isRemoving } = removeFromCart;
  const { cart } = useGetCartItems(false);
  // Helper Constants //////////////////////////////////
  const CART_ITEM = cart?.find((item) => item?.product?._id === product?._id);
  const ALREADY_IN_CART = !!CART_ITEM;
  const IS_LOADING = isAdding || isRemoving;
  // Callbacks  ////////////////////////////////////////
  const handleClick = useCallback(
    (e: any) => {
      e.stopPropagation();
      e.preventDefault();
      if (ALREADY_IN_CART) {
        removeFromCart.mutate(CART_ITEM?._id);
      } else {
        addToCart.mutate({ productId: product?._id, qty: 1 });
      }
    },
    [ALREADY_IN_CART, CART_ITEM?._id, addToCart, product?._id, removeFromCart]
  );
  return (
    <Button
      {...other}
      onClick={handleClick}
      className={cn(
        "bg-green-100 text-green-800 font-bold flex flex-row items-center gap-2 hover:bg-green-200 ",
        ALREADY_IN_CART &&
          "bg-agzakhana-primary hover:bg-agzakhana-primary text-green-100",
        other?.className
      )}
      disabled={IS_LOADING}
    >
      {IS_LOADING && <CircularProgress className="border-white h-5 w-5" />}
      <Icon icon={ALREADY_IN_CART ? "bi:cart-x" : "mynaui:cart"} />
      {ALREADY_IN_CART ? t("HOME_PAGE.REMOVE") : t("HOME_PAGE.ADD")}
    </Button>
  );
}
