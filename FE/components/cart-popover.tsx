"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Separator } from "./ui/separator";
import { CART_DUMMY_DATA } from "@/_mock/_cart";
import { cn } from "@/lib/utils";
import FallbackImage from "./image";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetCartItems, useMutateCart } from "@/api/cart";
import { useCallback } from "react";
import CircularProgress from "./circular-progress";
import { AnimatePresence, motion } from "framer-motion";

export function CartPopover() {
  const t = useTranslations();
  const { locale } = useParams();
  const { cart, totalItems, cartEmpty } = useGetCartItems();
  const { removeFromCart, clearCart } = useMutateCart();
  const { isPending: isRemoving } = removeFromCart;
  const { isPending: isClearing } = clearCart;
  const isLoading = isRemoving || isClearing;
  const handleRemove = useCallback(
    (itemId: string) => {
      removeFromCart.mutate(itemId);
    },
    [removeFromCart]
  );
  const handleClearCart = useCallback(() => {
    clearCart.mutate();
  }, [clearCart]);
  // const handleClearCart = useCallback()
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent shadow-none flex flex-row gap-4 p-0    items-end">
          <div className="relative">
            <Icon icon="mynaui:cart" className="text-text-primary h-7! w-7!" />
            <AnimatePresence>
              {!cartEmpty && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  className="absolute top-0 right-0  rtl:left-0 rtl:right-auto bg-[#3BB77E] text-white flex items-center justify-center aspect-square min-w-[20px] min-h-[20px] rounded-full translate-x-1/2 rtl:-translate-x-1/2 -translate-y-1/2 p-1 text-[12px]"
                >
                  {totalItems ?? "--"}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <span className="font-semibold text-text-primary text-[16px]">
            {t("HEADER.CART")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="grid gap-4">
          <div className="w-full flex justify-between items-center">
            <h4 className="leading-none font-bold text-text-primary text-lg">
              {t("CART.MY_SHOPPING_CART")}
            </h4>
            {!cartEmpty && (
              <Button
                className="bg-transparent shadow-none text-gray-700 font-semibold  drop-shadow-none rounded-none py-0.5 h-auto px-0 flex items-center "
                disabled={isLoading}
                onClick={handleClearCart}
              >
                {isClearing && (
                  <CircularProgress className="border-agzakhana-primary h-5 w-5" />
                )}
                <Icon icon="solar:cart-cross-broken" className="w-6! h-6!" />
                {t("HOME_PAGE.CLEAR")}
              </Button>
            )}
          </div>
          <Separator />
          <div
            className={cn(
              "space-y-2 max-h-96 overflow-y-auto overflow-x-hidden px-2 min-w-96",
              cartEmpty && "overflow-y-hidden"
            )}
          >
            {cartEmpty && (
              <div className="flex items-center justify-center flex-col gap-2">
                <Icon
                  icon="vaadin:cart-o"
                  className="h-50 w-50 text-gray-300"
                />
                <span className="text-lg text-gray-600 font-semibold">
                  {t("HOME_PAGE.EMPTY_CART")}
                </span>
              </div>
            )}
            {cart?.map((cartItem, i) => (
              <li
                key={cartItem?._id}
                className={cn(
                  "flex flex-row gap-2 items-center py-2 relative ",
                  i !== CART_DUMMY_DATA?.length - 1
                    ? "border-b-[1px] border-gray-200"
                    : ""
                )}
              >
                <div className="flex flex-row gap-2 items-center mr-auto rtl:mr-0 rtl:ml-auto">
                  <div className="w-16 h-16 aspect-square flex items-center justify-center border-[1px] border-gray-300 rounded-md relative">
                    <FallbackImage
                      src={cartItem?.product?.imageUrl ?? ""}
                      alt={cartItem?.product?.nameAr ?? ""}
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <p className="font-bold text-sm">
                      {locale === "ar"
                        ? cartItem?.product?.nameAr ?? "--"
                        : cartItem?.product?.nameEn ?? "--"}
                    </p>
                    <p className="font-bold text-text-secondary">
                      {
                        cartItem?.product?.category?.[
                          locale === "ar" ? "nameAr" : "nameEn"
                        ]
                      }
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end ">
                  <strong className="text-sm">
                    {t("COMMON.EGP", {
                      price: cartItem?.product?.price ?? 0,
                    })}
                  </strong>
                  <strong className="text-xs line-through text-text-secondary">
                    {t("COMMON.EGP", {
                      price: cartItem?.product?.beforeDiscount ?? 0,
                    })}
                  </strong>
                </div>
                <Button
                  className="bg-transparent text-gray-600 text-3xl shadow-none hover:-translate-y-1 px-0! py-0! rounded-full w-8 h-8 absolute  -translate-y-0.5 -translate-x-0.5 -right-2 rtl:-left-2 rtl:right-auto -top-2"
                  disabled={isRemoving}
                  onClick={() => handleRemove(cartItem?._id)}
                >
                  {!isRemoving && (
                    <Icon
                      icon="material-symbols:close-rounded"
                      className="w-5! h-5!"
                    />
                  )}
                </Button>
              </li>
            ))}
          </div>
          {!cartEmpty && (
            <Link
              href="/cart"
              className="bg-transparent text-text-primary font-bold flex flex-row gap-2 hover:gap-4 transition-all duration-300 py-4 shadow-none text-center justify-center items-center"
            >
              {t("CART.SHOW_ALL")}
              <Icon
                icon="humbleicons:chevron-left"
                className="rotate-180 rtl:rotate-0"
              />
            </Link>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
