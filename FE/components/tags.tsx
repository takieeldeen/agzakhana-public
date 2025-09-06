"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { ComponentProps, ReactNode } from "react";
import { motion } from "framer-motion";

type Props = ComponentProps<"span">;

function AnimateTag({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      {children}
    </motion.div>
  );
}

export function IncartTag(props: Props) {
  const t = useTranslations();
  return (
    <AnimateTag>
      <span
        {...props}
        className={cn(
          "bg-agzakhana-primary rounded-full text-white px-4 py-1 flex flex-row items-center gap-2 w-fit font-semibold",
          props.className
        )}
      >
        <Icon icon="hugeicons:shopping-cart-check-02" />
        {t("PRODUCTS_LISTING_PAGE.IN_YOUR_CART")}
      </span>
    </AnimateTag>
  );
}
export function FreeShippingTag(props: Props) {
  const t = useTranslations();
  return (
    <span
      {...props}
      className={cn(
        "bg-[#2980b9] rounded-full text-white px-4 py-1 flex flex-row items-center gap-2 w-fit font-semibold",
        props.className
      )}
    >
      <Icon icon="la:shipping-fast" />
      {t("PRODUCTS_LISTING_PAGE.FREE_SHIPPING_TAG")}
    </span>
  );
}
