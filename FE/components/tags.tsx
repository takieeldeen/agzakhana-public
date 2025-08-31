"use client";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { ComponentProps } from "react";

type Props = ComponentProps<"span">;
export function IncartTag(props: Props) {
  const t = useTranslations();
  return (
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
  );
}
