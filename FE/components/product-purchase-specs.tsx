"use client";

import { Medicine } from "@/types/medcines";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { LoadingButton } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RHFForm from "./rhf-form";
import RHFTextfield from "./rhf-textfield";

type Props = {
  product: Medicine;
};
export default function ProductPurchaseSpecs({ product }: Props) {
  const t = useTranslations();

  const specsSchema = z.object({
    qty: z.coerce
      .number()
      .min(1, "Quantity must be at leat 1")
      .max(
        product?.maxQty,
        t("VALIDATIONS.MAX_VAL", {
          field: t("PRODUCTS_LISTING_PAGE.QUANTITY"),
          max: product?.maxQty,
        })
      ),
    concentration: z.string().min(1, "Please Select a concentration"),
  });
  const defaultValues = {
    qty: 1,
    concentration: product?.concentration?.[0] ?? "",
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(specsSchema),
    mode: "onChange",
  });
  const { watch, setValue } = methods;
  const values = watch();
  const handleToggleVariant = useCallback(
    (newVal: string) => {
      if (newVal === values?.concentration) {
        setValue("concentration", "");
      } else {
        setValue("concentration", newVal);
      }
    },
    [setValue, values?.concentration]
  );
  const onSubmit = useCallback((data: any) => {
    alert(JSON.stringify(data));
  }, []);
  return (
    <RHFForm methods={methods} onSubmit={onSubmit}>
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
                  values.concentration === el &&
                    "border-2 border-gray-500 text-gray-700 font-bold"
                )}
                key={el}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row gap-2 items-stretch">
          {/* <input
            type="number"
            className="border-agzakhana-primary border-2 px-3 py-2 text-xl font-semibold rounded-lg w-28 text-center"
            value={quantity}
            onChange={(e) => setQuantity(+e.target.value)}
          /> */}
          <RHFTextfield
            name="qty"
            inputProps={{
              type: "number",
              className:
                "border-agzakhana-primary border-2 px-3 py-2 text-xl! font-semibold rounded-lg w-28 text-center h-12",
            }}
          />
          <LoadingButton
            className="h-full text-base bg-agzakhana-primary"
            onClick={onSubmit}
          >
            <Icon icon="mynaui:cart" />
            {t("PRODUCTS_LISTING_PAGE.ADD_TO_CART")}
          </LoadingButton>
        </div>
        <span className="text-lg text-gray-500 font-semibold">
          {t("PRODUCTS_LISTING_PAGE.AVAILABLE_QTY", { count: 9 })}
        </span>
      </div>
    </RHFForm>
  );
}
