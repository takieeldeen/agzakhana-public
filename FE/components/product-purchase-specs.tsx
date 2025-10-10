"use client";

import { Medicine } from "@/types/medcines";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RHFForm from "./rhf-form";
import { useGetCartItems, useMutateCart } from "@/client-api/cart";
import CircularProgress from "./circular-progress";
import RHFError from "./rhf-error";
import Fade from "./Fade";
import { Offer } from "@/types/offers";

type Props = {
  product: Medicine | Offer;
};
export default function ProductPurchaseSpecs({ product }: Props) {
  const t = useTranslations();
  const { addToCart, removeFromCart, updateCartItem } = useMutateCart();
  const { isPending: isAdding } = addToCart;
  const { isPending: isRemoving } = removeFromCart;
  const { isPending: isUpdating } = updateCartItem;
  const { cart } = useGetCartItems(false);
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
    concentration: product?.hasOwnProperty("concentration")
      ? z.string().min(1, "Please Select a concentration")
      : z.string(),
  });
  const defaultValues = {
    qty: 1,
    concentration: product?.hasOwnProperty("concentration")
      ? (product as Medicine)?.concentration?.[0] ?? ""
      : "",
  };
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(specsSchema),
    mode: "onChange",
  });
  const { watch, setValue, trigger } = methods;
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
  // Helper Constants //////////////////////////////////
  const CART_ITEM = cart?.find((item) => item?.product?._id === product?._id);
  const ALREADY_IN_CART = !!CART_ITEM;
  const IS_LOADING = isAdding || isRemoving || isUpdating;
  const onSubmit = useCallback(
    (data: any) => {
      if (data?.qty === 0) {
        removeFromCart.mutate(CART_ITEM!._id);
      } else if (!CART_ITEM) {
        addToCart.mutate({
          productId: !product?.hasOwnProperty("concentration")
            ? undefined
            : product?._id,
          qty: data?.qty,
          offerId: product?.hasOwnProperty("concentration")
            ? undefined
            : product?._id,
        });
      } else {
        updateCartItem.mutate({
          cartItemId: CART_ITEM._id,
          payload: { qty: data?.qty },
        });
      }
    },
    [CART_ITEM, addToCart, product, removeFromCart, updateCartItem]
  );
  const handleDecrements = useCallback(async () => {
    const currentQty = values.qty as number;
    if (currentQty > 1) {
      setValue("qty", currentQty - 1, { shouldValidate: true });
      const isValid = await trigger("qty");
      if (isValid) {
        onSubmit({ ...values, qty: currentQty - 1 });
      }
    } else {
      onSubmit({ ...values, qty: 0 });
    }
  }, [onSubmit, setValue, trigger, values]);
  const handleIncrements = useCallback(async () => {
    const currentQty = values.qty as number;
    setValue("qty", currentQty + 1, { shouldValidate: true });
    const isValid = await trigger("qty");
    if (isValid) {
      onSubmit({ ...values, qty: currentQty + 1 });
    }
  }, [onSubmit, setValue, trigger, values]);
  return (
    <RHFForm methods={methods} onSubmit={onSubmit} className="">
      <div>
        <div className="flex flex-col mb-2">
          <p className="font-bold text-lg mb-3 dark:text-gray-300">
            {t("PRODUCTS_LISTING_PAGE.CONCENTRATION")}
          </p>
          {product.hasOwnProperty("concentration") && (
            <ul className="flex flex-row gap-2 font-semibold text-gray-500 ">
              {(product as Medicine)?.concentration?.map((el) => (
                <li
                  onClick={() => {
                    handleToggleVariant(el);
                  }}
                  className={cn(
                    "border-2 p-2 px-4 rounded-md select-none cursor-pointer hover:border-gray-500 transition-all duration-300 dark:border-gray-300/15 dark:text-gray-300",
                    values.concentration === el &&
                      "border-2 border-gray-500 text-gray-700 font-bold"
                  )}
                  key={el}
                >
                  {el}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div
          className={cn(
            "flex flex-row gap-2 items-center bg-agzakhana-primary rounded-md px-2 py-2 text-white md:w-fit w-full min-w-64 justify-center transition-all min-h-13 mb-2",
            !ALREADY_IN_CART && "hover:brightness-90 cursor-pointer "
          )}
        >
          <Fade condition={!ALREADY_IN_CART && !IS_LOADING}>
            <Button className="font-bold min-h-auto h-auto bg-transparent drop-shadow-none shadow-none hover:brightness-100 dark:text-white">
              {t("PRODUCTS_LISTING_PAGE.ADD_TO_CART")}
            </Button>
          </Fade>
          {ALREADY_IN_CART && !IS_LOADING && (
            <div className="flex flex-row items-center justify-between w-full">
              <Button
                type="button"
                onClick={handleDecrements}
                className="font-bold min-h-auto h-auto bg-transparent drop-shadow-none shadow-none hover:brightness-80 dark:text-white"
              >
                <Icon
                  icon={values?.qty === 1 ? "iconamoon:trash" : "tabler:minus"}
                  className="w-6! h-6!"
                />
              </Button>
              <span className="font-bold">{values?.qty as number}</span>
              <Button
                disabled={values?.qty === product?.maxQty}
                type="button"
                onClick={handleIncrements}
                className="font-bold min-h-auto h-auto bg-transparent drop-shadow-none shadow-none hover:brightness-80 dark:text-white"
              >
                <Icon icon="tabler:plus" className="w-6! h-6!" />
              </Button>
            </div>
          )}
          {IS_LOADING && <CircularProgress className="border-white w-6 h-6" />}
        </div>
        <RHFError name="qty" />
        <span className="text-lg text-gray-500 font-semibold dark:text-gray-300">
          {t("PRODUCTS_LISTING_PAGE.AVAILABLE_QTY", { count: 9 })}
        </span>
      </div>
    </RHFForm>
  );
}
