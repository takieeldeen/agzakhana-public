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

export function WhishlistPopover() {
  const t = useTranslations();
  const { locale } = useParams();
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-transparent shadow-none flex flex-row gap-4 p-0    items-end">
          <div className="relative">
            <Icon icon="mynaui:heart" className="text-text-primary h-7! w-7!" />
            <span className="absolute top-0 right-0  rtl:left-0 rtl:right-auto bg-[#3BB77E] text-white flex items-center justify-center aspect-square min-w-[20px] min-h-[20px] rounded-full translate-x-1/2 rtl:-translate-x-1/2 -translate-y-1/2 p-1 text-[12px]">
              66
            </span>
          </div>
          <span className="font-semibold text-text-primary text-[16px]">
            {t("HEADER.WHISHLIST")}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="grid gap-4">
          <h4 className="leading-none font-bold text-text-primary text-lg">
            {t("HEADER.WHISHLIST")}
          </h4>
          <Separator />
          <div className="space-y-2 max-h-96 overflow-y-auto overflow-x-hidden px-2">
            {CART_DUMMY_DATA?.map((cartItem, i) => (
              <li
                key={cartItem?.id}
                className={cn(
                  "flex flex-row gap-2 items-center py-2 relative",
                  i !== CART_DUMMY_DATA?.length - 1
                    ? "border-b-[1px] border-gray-200"
                    : ""
                )}
              >
                <div className="flex flex-row gap-2 items-center mr-auto rtl:mr-0 rtl:ml-auto">
                  <div className="w-16 h-16 aspect-square flex items-center justify-center border-[1px] border-gray-300 rounded-md relative">
                    <FallbackImage
                      src={cartItem?.imageUrl}
                      alt={cartItem?.nameAr}
                      height={30}
                      width={30}
                    />
                  </div>
                  <div className="flex flex-col ">
                    <p className="font-bold text-sm">
                      {locale === "ar"
                        ? cartItem?.nameAr ?? "--"
                        : cartItem?.nameEn ?? "--"}
                    </p>
                    <p className="font-bold text-text-secondary">
                      {cartItem.concentration}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end ">
                  <strong className="text-sm">
                    {t("COMMON.EGP", {
                      price: cartItem?.price,
                    })}
                  </strong>
                  <strong className="text-xs line-through text-text-secondary">
                    {t("COMMON.EGP", {
                      price: cartItem?.beforeDiscount,
                    })}
                  </strong>
                </div>
                <Button className="bg-transparent text-gray-600 text-3xl shadow-none hover:-translate-y-1 px-0! py-0! rounded-full w-8 h-8 absolute  -translate-y-0.5 -translate-x-0.5 -right-2 rtl:-left-2 rtl:right-auto -top-2">
                  <Icon
                    icon="material-symbols:close-rounded"
                    className="w-5! h-5!"
                  />
                </Button>
              </li>
            ))}
          </div>
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
        </div>
      </PopoverContent>
    </Popover>
  );
}
