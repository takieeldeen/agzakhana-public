import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Medicine } from "@/types/medcines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function ProductListItem({
  product,
}: {
  product: Medicine;
}) {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <li className="flex flex-row items-start gap-2 w-full ">
      <div className="h-24 w-24 aspect-square bg-gray-200 rounded-md flex items-center justify-center">
        <Image
          src={product?.imageUrl}
          height={100}
          width={50}
          alt={product?.nameAr}
        />
      </div>
      <div className="w-full">
        <p className="font-bold">
          {product?.[locale === "ar" ? "nameAr" : "nameEn"]}
        </p>
        <div className="flex flex-row gap-1  items-center mb-2">
          <Icon
            icon="material-symbols:star-rounded"
            className="text-green-500 "
          />
          <span className="text-text-secondary leading-0">
            {product?.rating}
          </span>
        </div>
        <div className="flex flex-row gap-0.5  text-sm">
          {t("HOME_PAGE.BY")}
          <Link href="/" className="text-agzakhana-primary font-semibold">
            {product?.manufacturer}
          </Link>
        </div>
        <div className=" text-lg text-agzakhana-primary flex flex-row gap-2 items-center justify-between">
          <strong className="leading-none text-nowrap ">
            {t("COMMON.EGP", { price: product?.price ?? 0 })}
          </strong>
          <span className="text-xs font-semibold leading-none text-text-secondary line-through mr-auto rtl:mr-0 rtl:ml-auto text-nowrap">
            {t("COMMON.EGP", { price: product?.beforeDiscount ?? 0 })}
          </span>
          <Button className="bg-green-100 text-green-800 font-bold flex flex-row items-center gap-2 hover:bg-green-200 ">
            <Icon icon="mynaui:cart" />
            {t("HOME_PAGE.ADD")}
          </Button>
        </div>
      </div>
    </li>
  );
}

export function ProductListItemSkeleton() {
  return (
    <li className="flex flex-row items-start gap-2 w-full ">
      <div className="h-24 w-24 aspect-square bg-gray-200 rounded-md flex items-center justify-center">
        <Skeleton className="h-12 w-12" />
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
    </li>
  );
}
