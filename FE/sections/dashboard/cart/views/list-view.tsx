"use client";
import { useGetCartDetails, useMutateCart } from "@/api/cart";
import FallbackImage from "@/components/image";
import { Button, MotionButton } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { CartListItem } from "@/types/cart";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function CartListView() {
  const t = useTranslations();
  const { cart } = useGetCartDetails();
  return (
    <div className="flex flex-row gap-16 py-8">
      <div className="flex flex-col gap-2  w-4/6">
        <div className="flex-row flex gap-2 items-end mb-4">
          <h4 className="text-2xl font-bold ">{t("HEADER.CART")}</h4>
          <p className="text-gray-500">
            (
            {t("CART.PRODUCT", {
              count: cart?.length ?? 0,
            })}
            )
          </p>
        </div>
        <ul className="flex flex-col gap-4">
          {cart?.map((cartItem) => (
            <CartItem cartItem={cartItem} key={cartItem?._id} />
          ))}
        </ul>
      </div>
      <aside className="w-2/6 flex flex-col gap-3 sticky self-start top-8">
        <h4 className="font-bold text-2xl">{t("CART.PAYMENT_SUMMARY")}</h4>
        <Separator />
        <ul>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <p className="text-base text-gray-600 font-semibold">
              {t("CART.SUB_TOTAL")}
            </p>
            <strong className="font-normal">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(1000),
              })}
            </strong>
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <p className="text-base text-gray-600 font-semibold">
              {t("CART.DELIVERY")}
            </p>
            <strong className="font-normal">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(10),
              })}
            </strong>
          </li>

          <li className="flex flex-row justify-between py-4 border-[2px] border-transparent border-b-gray-900">
            <p className="text-base text-gray-600 font-semibold">
              {t("CART.VAT")}
            </p>
            <strong className="font-normal">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(75),
              })}
            </strong>
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <strong className="text-xl text-gray-600 font-bold">
              {t("CART.TOTAL")}
            </strong>
            <strong className="text-lg font-bold">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(1526),
              })}
            </strong>
          </li>
        </ul>
        <div className="flex flex-col gap-2">
          <Button className="py-6 bg-agzakhana-primary text-lg">
            {t("CART.PROCEED_TO_CHECKOUT")}
          </Button>
          <Button className="bg-transparent text-text-primary font-bold flex flex-row gap-2 hover:gap-4 transition-all duration-300 py-4 shadow-none">
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
};
function CartItem({ cartItem }: CartItemProps) {
  const cartItemData = cartItem?.product ? cartItem?.product : cartItem?.deal;
  const { locale } = useParams();
  const t = useTranslations();
  const { updateCartItem } = useMutateCart();

  return (
    <li
      key={cartItemData?._id}
      className={cn(
        "flex flex-row gap-2 items-center py-5 bg-gray-50 rounded-md px-4 drop-shadow-sm border-b-[1px] border-gray-200 justify-between "
      )}
    >
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
          <p className="font-semibold text-base">
            {locale === "ar"
              ? cartItemData?.nameAr ?? "--"
              : cartItemData?.nameEn ?? "--"}
          </p>
          <p className="font-semibold text-base text-gray-500 line-clamp-2 mb-2">
            {locale === "ar"
              ? cartItemData?.descriptionAr ?? "--"
              : cartItemData?.descriptionEn ?? "--"}
          </p>
          <Button
            className="flex flex-row gap-2 items-center w-18 drop-shadow-none shadow-none"
            variant="outline"
          >
            <Icon icon="mynaui:trash" className="w-5! h-5!" />
            {t("HOME_PAGE.REMOVE")}
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <strong className="text-xl whitespace-nowrap">
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
            onClick={() => {
              updateCartItem.mutate({
                cartItemId: cartItem?._id,
                payload: {
                  qty: (cartItemData?.qty ?? 0) - 1,
                },
              });
            }}
          >
            <Icon icon="ic:round-minus" />
          </MotionButton>
          <span>1</span>
          <MotionButton
            whileTap={{ scale: 2 }}
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="rounded-full bg-agzakhana-primary aspect-square p-0! h-7 w-7"
            onClick={() => {
              updateCartItem.mutate({
                cartItemId: cartItem?._id,
                payload: {
                  qty: (cartItemData?.qty ?? 0) + 1,
                },
              });
            }}
          >
            <Icon icon="ic:round-plus" />
          </MotionButton>
        </div>
      </div>
    </li>
  );
}
