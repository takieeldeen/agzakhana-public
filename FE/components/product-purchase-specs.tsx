"use client";

import { Medicine } from "@/types/medcines";
import AddToCartButton from "./add-to-cart";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  product: Medicine;
};
export default function ProductPurchaseSpecs({ product }: Props) {
  const [quantity, setQuantity] = useState<number>(1);
  const [variant, setVariant] = useState<string>(
    product?.concentration?.[0] ?? ""
  );
  const t = useTranslations();
  const handleToggleVariant = useCallback(
    (newVal: string) => {
      if (newVal === variant) {
        setVariant("");
      } else {
        setVariant(newVal);
      }
    },
    [variant]
  );
  return (
    <div>
      <div className="flex flex-col mb-2">
        <p className="font-bold text-lg mb-3">
          {t("PRODUCTS_LISTING_PAGE.CONCENTRATION")}
        </p>
        <ul className="flex flex-row gap-2 font-semibold text-gray-500 ">
          {product?.concentration?.map((el) => (
            <li
              onClick={() => {
                handleToggleVariant(el);
              }}
              className={cn(
                "border-2 p-2 px-4 rounded-md select-none cursor-pointer hover:border-gray-500 transition-all duration-300",
                variant === el &&
                  "border-2 border-gray-500 text-gray-700 font-bold"
              )}
              key={el}
            >
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row gap-2">
        <input
          type="number"
          className="border-agzakhana-primary border-2 px-3 py-2 text-xl font-semibold rounded-lg w-28 text-center"
          value={quantity}
          onChange={(e) => setQuantity(+e.target.value)}
        />
        {/* <Button className="h-12 w-48 bg-agzakhana-primary text-white text-[16px] hover:bg-agzakhana-primary flex items-center justify-center gap-2">
              <Icon icon="mynaui:cart" className="h-6! w-6!" />
              {t("PRODUCTS_LISTING_PAGE.ADD_TO_CART")}
            </Button> */}
        <AddToCartButton
          product={product}
          className="h-full bg-agzakhana-primary text-white w-32 text-lg font-medium hover:bg-agzakhana-primary"
        />
      </div>
      <span className="text-lg text-gray-500 font-semibold">
        {t("PRODUCTS_LISTING_PAGE.AVAILABLE_QTY", { count: 9 })}
      </span>
    </div>
  );
}
