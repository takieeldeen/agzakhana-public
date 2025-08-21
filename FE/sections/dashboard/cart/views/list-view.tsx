import { CART_DUMMY_DATA } from "@/_mock/_cart";
import FallbackImage from "@/components/image";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";

export default async function CartListView() {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <div className="flex flex-row gap-16 py-8">
      <div className="flex flex-col gap-2  w-4/5">
        <div className="flex-row justify-between flex">
          <h2 className="text-4xl font-bold leading-1">
            {t("CART.MY_SHOPPING_CART")}
          </h2>
          <strong className="text-2xl font-bold">
            {t("COMMON.EGP", {
              price: 1500,
            })}
          </strong>
        </div>
        <Separator className="mb-4" />
        <ul className="flex flex-col ">
          {CART_DUMMY_DATA?.map((cartItem, i) => (
            <li
              key={cartItem?.id}
              className={cn(
                "flex flex-row gap-2 items-center py-5",
                i !== CART_DUMMY_DATA?.length - 1
                  ? "border-b-[1px] border-gray-200"
                  : ""
              )}
            >
              <div className="flex flex-row gap-2 items-center w-1/3 max-w-1/3">
                <Button className="bg-transparent text-gray-600 text-3xl shadow-none hover:-translate-y-1 border-2 border-gray-600 px-0! py-0! rounded-full w-8 h-8">
                  <Icon
                    icon="material-symbols:close-rounded"
                    className="w-4! h-4!"
                  />
                </Button>
                <div className="w-32 h-32 flex items-center justify-center border-[1px] border-gray-300 rounded-md relative">
                  <FallbackImage
                    src={cartItem?.imageUrl}
                    alt={cartItem?.nameAr}
                    height={70}
                    width={70}
                  />
                </div>
                <div className="flex flex-col ">
                  <p className="font-bold text-lg">
                    {locale === "ar"
                      ? cartItem?.nameAr ?? "--"
                      : cartItem?.nameEn ?? "--"}
                  </p>
                  <p className="font-bold text-text-secondary">
                    {cartItem.concentration}
                  </p>
                </div>
              </div>
              <div className="flex flex-row items-center gap-4 w-1/3 justify-center">
                <Button className="w-8 h-8 rounded-full bg-transparent border-2 border-text-primary text-primary text-lg hover:bg-text-primary hover:text-white">
                  <Icon icon="mynaui:minus-solid" />
                </Button>
                <span className="font-bold text-xl">1</span>
                <Button className="w-8 h-8 rounded-full bg-transparent border-2 border-text-primary text-primary text-lg hover:bg-text-primary hover:text-white">
                  <Icon icon="mynaui:plus-solid" />
                </Button>
              </div>
              <div className="flex flex-col items-end w-1/3">
                <strong className="text-xl">
                  {t("COMMON.EGP", {
                    price: cartItem?.price,
                  })}
                </strong>
                <strong className="text-lg line-through text-text-secondary">
                  {t("COMMON.EGP", {
                    price: cartItem?.beforeDiscount,
                  })}
                </strong>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <aside className="w-1/5 flex flex-col gap-3">
        <h4 className="font-bold text-2xl">{t("CART.PAYMENT_SUMMARY")}</h4>
        <Separator />
        <ul>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <p className="text-lg text-gray-600 font-semibold">
              {t("CART.SUB_TOTAL")}
            </p>
            <strong>
              {t("COMMON.EGP", {
                price: 1000,
              })}
            </strong>
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <p className="text-lg text-gray-600 font-semibold">
              {t("CART.DELIVERY")}
            </p>
            <strong>
              {t("COMMON.EGP", {
                price: 10,
              })}
            </strong>
          </li>

          <li className="flex flex-row justify-between py-4 border-[2px] border-transparent border-b-gray-900">
            <p className="text-lg text-gray-600 font-semibold">
              {t("CART.VAT")}
            </p>
            <strong>
              {t("COMMON.EGP", {
                price: 45,
              })}
            </strong>
          </li>
          <li className="flex flex-row justify-between py-4 border-[1px] border-transparent border-b-gray-300">
            <strong className="text-xl text-gray-600 font-bold">
              {t("CART.TOTAL")}
            </strong>
            <strong className="text-lg font-bold">
              {t("COMMON.EGP", {
                price: 1555,
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
