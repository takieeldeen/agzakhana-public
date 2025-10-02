"use client";

import { Medicine } from "@/types/medcines";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGetCartItems, useMutateCart } from "@/api/cart";
import { ComponentProps, useCallback } from "react";
import { cn } from "@/lib/utils";
import CircularProgress from "./circular-progress";
import { useAuth } from "@/hooks/useAuth";
import { Offer } from "@/types/offers";

type Props = {
  product: Medicine | Offer;
  isProduct?: boolean;
} & ComponentProps<"button">;
export default function AddToCartButton({
  product,
  isProduct = true,
  ...other
}: Props) {
  // Custom Hooks //////////////////////////////////////////
  const t = useTranslations();
  const { isAuthenticated } = useAuth();
  // Data Fetching Hooks //////////////////////////////////
  const { addToCart, removeFromCart } = useMutateCart();
  const { isPending: isAdding } = addToCart;
  const { isPending: isRemoving } = removeFromCart;
  const { cart } = useGetCartItems(false);
  // Helper Constants //////////////////////////////////
  const CART_ITEM = isProduct
    ? cart?.find((item) => item?.product?._id === product?._id)
    : cart?.find((item) => item?.deal?._id === product?._id);
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
        addToCart.mutate({
          productId: isProduct ? product?._id : undefined,
          offerId: isProduct ? undefined : product?._id,
          qty: 1,
        });
      }
    },
    [
      ALREADY_IN_CART,
      CART_ITEM?._id,
      addToCart,
      isProduct,
      product?._id,
      removeFromCart,
    ]
  );
  if (!isAuthenticated) return null;
  return (
    <Button
      {...other}
      onClick={handleClick}
      className={cn(
        "bg-green-100 text-green-800 font-bold flex flex-row items-center gap-2 hover:bg-green-200  dark:bg-transparent dark:text-agzakhana-primary dark:border-agzakhana-primary dark:border-1",
        ALREADY_IN_CART &&
          "bg-agzakhana-primary hover:bg-agzakhana-primary text-green-100  dark:bg-agzakhana-primary dark:text-white",

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
