"use client";
import { checkout, useGetCartDetails, useMutateCart } from "@/api/cart";
import FallbackImage from "@/components/image";
import { Button, LoadingButton, MotionButton } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CartListItem } from "@/types/cart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import CircularProgress from "@/components/circular-progress";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useState } from "react";
import { pushMessage } from "@/components/toast-message";

export default function CartListView() {
  const [checkoutLoading, setCheckoutLoading] = useState<boolean>(false);
  const t = useTranslations();

  const { cart, cartLoading, cartEmpty, mutate, orderSummary } =
    useGetCartDetails();
  const handleCheckout = useCallback(async () => {
    try {
      setCheckoutLoading(true);
      await checkout();
    } catch (err: any) {
      console.log(err);
      pushMessage({ variant: "fail", subtitle: err?.message });
    } finally {
      setCheckoutLoading(false);
    }
  }, []);
  if (cartEmpty) return <CartEmpty />;
  if (cartLoading) return <CartSkeleton />;
  return (
    <div className="flex flex-row gap-16 py-8">
      <div className="flex flex-col gap-2  w-4/6">
        <div className="flex-row flex gap-2 items-end mb-4">
          <h4 className="text-2xl font-bold dark:text-gray-200">
            {t("HEADER.CART")}
          </h4>
          <p className="text-gray-500 dark:text-gray-400">
            (
            {t("CART.PRODUCT", {
              count: cart?.length ?? 0,
            })}
            )
          </p>
        </div>
        <ul className="flex flex-col gap-4 relative">
          <AnimatePresence mode="popLayout">
            {cart?.map((cartItem) => (
              <CartItem
                cartItem={cartItem}
                key={cartItem?._id}
                onMutate={mutate}
              />
            ))}
          </AnimatePresence>
        </ul>
      </div>
      <aside className="w-2/6 flex flex-col gap-3 sticky self-start top-8">
        <h4 className="text-2xl font-bold dark:text-gray-200">
          {t("CART.PAYMENT_SUMMARY")}
        </h4>
        <Separator />
        <ul>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-600">
            <p className="text-base text-gray-600 font-semibold dark:text-gray-300">
              {t("CART.SUB_TOTAL")}
            </p>
            <strong className="font-normal dark:text-gray-200">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(orderSummary?.subtotal ?? 0),
              })}
            </strong>
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-600">
            <p className="text-base text-gray-600 font-semibold dark:text-gray-300">
              {t("CART.DELIVERY")}
            </p>
            <strong className="font-normal dark:text-gray-200">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(orderSummary?.delivery ?? 0),
              })}
            </strong>
          </li>

          <li className="flex flex-row justify-between py-4 border-[2px] border-transparent border-b-gray-900 dark:border-b-gray-300">
            <p className="text-base text-gray-600 font-semibold dark:text-gray-300">
              {t("CART.VAT")}
            </p>
            <strong className="font-normal dark:text-gray-200">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(orderSummary?.vat ?? 0),
              })}
            </strong>
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent ">
            <strong className="text-xl text-gray-600 font-bold dark:text-gray-200">
              {t("CART.TOTAL")}
            </strong>
            <strong className="text-lg font-bold dark:text-gray-200">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(orderSummary?.total ?? 0),
              })}
            </strong>
          </li>
        </ul>
        <div className="flex flex-col gap-2">
          <LoadingButton
            loading={checkoutLoading}
            className="py-6 bg-agzakhana-primary text-lg dark:text-white"
            onClick={handleCheckout}
          >
            {t("CART.PROCEED_TO_CHECKOUT")}
          </LoadingButton>
          <Button className="bg-transparent text-text-primary font-bold flex flex-row gap-2 hover:gap-4 transition-all duration-300 py-4 shadow-none dark:text-gray-300">
            <Icon icon="humbleicons:chevron-left" className="rtl:rotate-180" />
            {t("CART.CONTINUE_SHOPPING")}
          </Button>
        </div>
      </aside>
    </div>
  );
}

type CartItemProps = {
  cartItem: CartListItem;
  onMutate: VoidFunction;
};
function CartItem({ cartItem, onMutate }: CartItemProps) {
  const cartItemData = cartItem?.product ? cartItem?.product : cartItem?.deal;
  const { locale } = useParams();
  const t = useTranslations();
  const { updateCartItem, removeFromCart } = useMutateCart();
  const IS_LOADING = updateCartItem.isPending || removeFromCart.isPending;
  return (
    <motion.li
      layout="position"
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring" }}
      className={cn(
        "flex flex-row gap-2 items-center py-5 bg-gray-50 rounded-md px-4 drop-shadow-sm border-b-[1px] border-gray-200 dark:border-gray-800 justify-between h-44 w-full relative dark:bg-card-background-dark",
        IS_LOADING && "brightness-90 pointer-events-none blur-xs"
      )}
    >
      {IS_LOADING && (
        <CircularProgress className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  w-24 h-24 " />
      )}
      {/* LEFT SECTION */}
      <div className="flex flex-row gap-2">
        <div className="w-32 h-32 shrink-0 flex items-center justify-center rounded-md relative">
          <FallbackImage
            src={cartItemData?.imageUrl ?? ""}
            alt={cartItemData?.[locale === "ar" ? "nameAr" : "nameEn"] ?? ""}
            className="object-contain p-2"
            fill
          />
        </div>

        <div className="flex flex-col">
          <p className="font-semibold text-base dark:text-gray-200">
            {locale === "ar"
              ? cartItemData?.nameAr ?? "--"
              : cartItemData?.nameEn ?? "--"}
          </p>
          <p className="font-semibold text-base text-gray-500 dark:text-gray-400 line-clamp-2 mb-2">
            {locale === "ar"
              ? cartItemData?.descriptionAr ?? "--"
              : cartItemData?.descriptionEn ?? "--"}
          </p>
          <Button
            className="flex flex-row gap-2 items-center w-fit drop-shadow-none shadow-none dark:border-[1px] dark:border-agzakhana-primary dark:bg-transparent dark:text-agzakhana-primary"
            variant="outline"
            onClick={() => {
              removeFromCart.mutate(cartItem?._id ?? "");
            }}
          >
            <Icon icon="mynaui:trash" className="w-5! h-5!" />
            {t("HOME_PAGE.REMOVE")}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <strong className="text-xl whitespace-nowrap dark:text-white">
          {t("COMMON.EGP", {
            price: cartItemData?.price ?? 0,
          })}
        </strong>
        <div className="flex flex-row gap-2 text-sm mb-2">
          <span className="line-through text-text-secondary whitespace-nowrap">
            {t("COMMON.EGP", {
              price: cartItemData?.beforeDiscount ?? 0,
            })}
          </span>
          {cartItemData?.price && cartItemData?.beforeDiscount && (
            <span className="font-bold text-agzakhana-primary whitespace-nowrap">
              {t("PRODUCTS_LISTING_PAGE.DISCOUNT", {
                discount: `${Math.round(
                  (1 - cartItemData.price / cartItemData.beforeDiscount) * 100
                )}%`,
              })}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <MotionButton
            whileTap={{ scale: 2 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="rounded-full bg-agzakhana-primary aspect-square p-0! h-7 w-7"
            disabled={cartItem?.qty === 1}
            onClick={async () => {
              await updateCartItem.mutateAsync({
                cartItemId: cartItem?._id,
                payload: {
                  qty: (cartItem?.qty ?? 0) - 1,
                },
              });
              onMutate();
            }}
          >
            <Icon icon="ic:round-minus" />
          </MotionButton>
          <span className="dark:text-white">{cartItem?.qty}</span>
          <MotionButton
            disabled={cartItem?.qty === cartItemData?.maxQty}
            whileTap={{ scale: 2 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="rounded-full bg-agzakhana-primary aspect-square p-0! h-7 w-7"
            onClick={async () => {
              await updateCartItem.mutateAsync({
                cartItemId: cartItem?._id,
                payload: {
                  qty: (cartItem?.qty ?? 0) + 1,
                },
              });
              onMutate();
            }}
          >
            <Icon icon="ic:round-plus" />
          </MotionButton>
        </div>
      </div>
    </motion.li>
  );
}

function CartSkeleton() {
  const t = useTranslations();
  return (
    <div className="flex flex-row gap-16 py-8">
      <div className="flex flex-col gap-2  w-4/6">
        <div className="flex-row flex gap-2 items-end mb-4">
          <h4 className="text-2xl font-bold ">{t("HEADER.CART")}</h4>
          <Skeleton className="h-4 w-24" />
        </div>
        <ul className="flex flex-col gap-4 relative">
          {Array.from({ length: 5 }, (_, i) => i)?.map((cartItem) => (
            <li
              key={cartItem}
              className={cn(
                "flex flex-row gap-2 items-center py-5 bg-gray-50 rounded-md px-4 drop-shadow-sm border-b-[1px] border-gray-200 justify-between h-44 w-full relative"
              )}
            >
              {/* LEFT SECTION */}
              <div className="flex flex-row gap-2 w-full">
                <Skeleton className="h-32 w-32 rounded-md shrink-0" />

                <div className="flex flex-col gap-2 w-full">
                  <Skeleton className="h-5 w-32 rounded-full" />
                  <div className="flex flex-col gap-1 w-full mb-auto">
                    {Array.from(
                      { length: Math.round(Math.random() * 2) + 1 },
                      (_, i) => i
                    ).map((i) => (
                      <Skeleton key={i} className="h-3 w-full rounded-full" />
                    ))}
                    <Skeleton className={`h-3 w-4/5 rounded-full`} />
                  </div>

                  <Skeleton className="w-32 h-8" />
                </div>
              </div>
              <div className="flex flex-col items-end">
                <Skeleton className="h-6 w-24" />
                <div className="flex flex-row gap-2 text-sm mb-2"></div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-5 w-5 rounded-sm" />
                  <Skeleton className="h-8 w-8 rounded-full" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="w-2/6 flex flex-col gap-3 sticky self-start top-8">
        <h4 className="font-bold text-2xl">{t("CART.PAYMENT_SUMMARY")}</h4>
        <Separator />
        <ul>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <Skeleton className="w-36 h-4" />
            <Skeleton className="w-24 h-3" />
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <Skeleton className="w-24 h-4" />

            <Skeleton className="w-24 h-3" />
          </li>

          <li className="flex flex-row justify-between py-4 border-[2px] border-transparent border-b-gray-900">
            <Skeleton className="w-48 h-4" />

            <Skeleton className="w-24 h-3" />
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <Skeleton className="w-36 h-5" />
            <Skeleton className="w-24 h-3" />
          </li>
        </ul>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-full h-12" />
          <Button className="bg-transparent text-text-primary font-bold flex flex-row gap-2 hover:gap-4 transition-all duration-300 py-4 shadow-none">
            <Icon icon="humbleicons:chevron-left" className="rtl:rotate-180" />
            {t("CART.CONTINUE_SHOPPING")}
          </Button>
        </div>
      </aside>
    </div>
  );
}

function CartEmpty() {
  const t = useTranslations();
  return (
    <div className="flex flex-row items-center justify-center py-32 w-full">
      <div className="flex items-center justify-center flex-col gap-2">
        <Icon icon="vaadin:cart-o" className="h-50 w-50 text-gray-300" />
        <span className="text-lg text-gray-600 font-semibold">
          {t("HOME_PAGE.EMPTY_CART")}
        </span>
      </div>
    </div>
  );
}
