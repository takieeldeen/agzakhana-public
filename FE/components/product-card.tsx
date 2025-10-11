import ProductTag from "@/components/product-tag";
import { Medicine } from "@/types/medcines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import FallbackImage from "./image";
import { Skeleton } from "./ui/skeleton";
import AddToCartButton from "./add-to-cart";
import { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export default async function ProductCard({
  medicine,
  ...other
}: {
  medicine: Medicine;
} & ComponentProps<"li">) {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <li
      {...other}
      className={cn(
        "border-2 border-[#ECECEC] dark:border-transparent xl:w-[240px] lg:w-[250px] h-[401px] rounded-2xl overflow-hidden relative lg:min-w-[20rem] xl:min-w-[19rem] dark:bg-card-background-dark dark:shadow-md dark:shadow-gray-700/30 min-w-80",
        other?.className
      )}
    >
      <Link
        href={`/products/${medicine?._id}`}
        className="h-full flex flex-col gap-1"
      >
        <ProductTag tag={medicine?.tag} />

        <div className="h-[207px] w-full rounded-xl flex items-center justify-center">
          <FallbackImage
            src={medicine?.imageUrl}
            height={240}
            width={120}
            alt={medicine?.nameEn}
          />
        </div>
        <div className="p-2 mb-auto">
          <span className="text-text-secondary dark:text-gray-300">
            {medicine?.category?.[locale === "ar" ? "nameAr" : "nameEn"]}
          </span>
          <div className="flex flex-row gap-1  items-center mb-2">
            <Icon
              icon="material-symbols:star-rounded"
              className="text-green-500 "
            />
            <span className="text-text-secondary leading-0">4.5</span>
          </div>
          <p className="text-text-primary text-lg font-bold leading-none mb-2 dark:text-white">
            {medicine?.[locale === "ar" ? "nameAr" : "nameEn"]}
          </p>
          <div className="flex flex-row   gap-0.5 dark:text-gray-300">
            {t("HOME_PAGE.BY")}
            <span className="text-agzakhana-primary font-semibold bg-transparent p-0">
              {medicine?.manufacturer}
            </span>
          </div>
        </div>
        <div className="p-2 text-lg text-agzakhana-primary flex flex-row gap-2 items-center">
          <strong className="leading-none text-nowrap ">
            {t("COMMON.EGP", {
              price: medicine?.price,
            })}
          </strong>
          <span className="text-xs font-semibold leading-none text-text-secondary line-through mr-auto text-nowrap">
            {t("COMMON.EGP", {
              price: medicine?.beforeDiscount,
            })}
          </span>
          <AddToCartButton product={medicine} />
        </div>
      </Link>
    </li>
  );
}

export function ProductCardSkeleton() {
  return (
    <li className="border-2 border-[#ECECEC] dark:border-card-background-dark w-full md:w-[250px] h-[401px] rounded-2xl overflow-hidden relative min-w-[20rem]">
      <div className="h-full flex flex-col gap-1">
        {/* <ProductTag tag={medicine?.tag} /> */}
        <Skeleton className="w-16 h-8 absolute rounded-none rounded-br-2xl rtl:left-0" />
        <div className="h-[207px] w-full rounded-xl flex items-center justify-center">
          <Skeleton className="w-36 h-36" />
        </div>
        <div className="p-2 mb-auto flex flex-col gap-1.5">
          <Skeleton className="w-24 h-3" />
          <div className="flex flex-row gap-1  items-center mb-2">
            <Skeleton className="h-4 w-4 rounded-xs" />
            <Skeleton className="h-4 w-8" />
          </div>
          <Skeleton className="h-4 w-56" />

          <Skeleton className="w-24 h-3" />
        </div>
        <div className="p-2 text-lg text-agzakhana-primary flex flex-row gap-2 items-center">
          <Skeleton className="w-24 h-6" />
          <Skeleton className="w-12 h-2 mr-auto" />
          <Skeleton className="w-20 h-8" />
        </div>
      </div>
    </li>
  );
}
