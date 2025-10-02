import AddToCartButton from "@/components/add-to-cart";
import { OfferTimer } from "@/components/discount-counter";
import { Skeleton } from "@/components/ui/skeleton";
import { Offer } from "@/types/offers";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";

export default async function OffersCard({ offer }: { offer: Offer }) {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <li className="  rounded-2xl overflow-hidden flex flex-col gap-1 w-[calc(20%-0.5rem)] items-center shrink-0 min-w-[20rem]">
      <Link href={`/deals/${offer?._id}`} className="w-full ">
        <div className="h-[300px]! w-full rounded-xl flex items-start justify-center bg-gray-200 dark:bg-card-background-dark relative py-8 ">
          <Image
            src={offer?.imageUrl}
            height={250}
            width={125}
            alt={offer?.nameEn}
          />
          <div className="absolute bottom-10">
            <OfferTimer expiresIn={offer?.expiresAt} />
          </div>
        </div>
      </Link>
      <div className="shadow-md w-[90%] rounded-2xl -translate-y-9 z-10 relative bg-gray-100 p-2 dark:bg-card-background-dark brightness-90">
        <div className="p-2 mb-auto">
          <Link
            href={`/deals/${offer?._id}`}
            className="text-text-primary  font-bold leading-none mb-2 dark:text-white"
          >
            {offer?.[locale === "ar" ? "nameAr" : "nameEn"]}
          </Link>
          <div className="flex flex-row gap-1  items-center mb-2">
            <Icon
              icon="material-symbols:star-rounded"
              className="text-green-500 "
            />
            <span className="text-text-secondary leading-0">
              {offer?.rating}
            </span>
          </div>
          <div className="flex flex-row gap-0.5 text-sm dark:text-gray-200">
            {t("HOME_PAGE.BY")}
            <Link href="/" className="text-agzakhana-primary font-semibold">
              {offer?.manufacturer}
            </Link>
          </div>
        </div>

        <div className="p-2 text-lg text-agzakhana-primary flex flex-row gap-2 items-center">
          <strong className="leading-none text-nowrap text-2xl">
            {t("COMMON.EGP", { price: offer?.price ?? 0 })}
          </strong>
          <span className="text-xs font-semibold leading-none text-text-secondary line-through mr-auto rtl:mr-0 rtl:ml-auto text-nowrap">
            {t("COMMON.EGP", { price: offer?.beforeDiscount ?? 0 })}
          </span>
          <AddToCartButton product={offer} isProduct={false} />
        </div>
      </div>
    </li>
  );
}

export async function OffersCardSkeleton() {
  return (
    <li className="  rounded-2xl overflow-hidden flex flex-col gap-1 w-[calc(20%-0.5rem)] items-center shrink-0 min-w-[22rem]">
      <div className="h-[300px]! w-full rounded-xl flex items-start justify-center border-2 relative py-8">
        <Skeleton className="w-48 h-48" />
        <div className="absolute bottom-10">
          <ul className="flex flex-row gap-2 items-center">
            {Array.from({ length: 4 }, (_, i) => i).map((i) => (
              <li
                key={i}
                className="flex flex-col justify-center gap-2 bg-gray-100 rounded-md items-center p-2 shadow-md w-1/4 min-w-16 select-none text-sm font-bold h-20"
              >
                <Skeleton className="w-8 h-8" />
                <Skeleton className="w-12 h-2" />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shadow-md w-[90%] rounded-2xl -translate-y-9 z-10 relative bg-gray-100 p-2 ">
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
      {/* <div className="shadow-md w-[90%] rounded-2xl -translate-y-9 z-10 relative bg-gray-100 p-2">
        <div className="p-2 mb-auto">
          <p className="text-text-primary  font-bold leading-none mb-2">
            {offer?.[locale === "ar" ? "nameAr" : "nameEn"]}
          </p>
          <div className="flex flex-row gap-1  items-center mb-2">
            <Icon
              icon="material-symbols:star-rounded"
              className="text-green-500 "
            />
            <span className="text-text-secondary leading-0">
              {offer?.rating}
            </span>
          </div>
          <div className="flex flex-row gap-0.5 text-sm">
            {t("HOME_PAGE.BY")}
            <Link href="/" className="text-agzakhana-primary font-semibold">
              {offer?.manufacturer}
            </Link>
          </div>
        </div>
        <div className="p-2 text-lg text-agzakhana-primary flex flex-row gap-2 items-center">
          <strong className="leading-none text-nowrap text-2xl">
            {t("COMMON.EGP", { price: offer?.price ?? 0 })}
          </strong>
          <span className="text-xs font-semibold leading-none text-text-secondary line-through mr-auto rtl:mr-0 rtl:ml-auto text-nowrap">
            {t("COMMON.EGP", { price: offer?.beforeDiscount ?? 0 })}
          </span>
          <Button className="bg-green-100 text-green-800 font-bold flex flex-row items-center gap-2 hover:bg-green-200 ">
            <Icon icon="mynaui:cart" />
            {t("HOME_PAGE.ADD")}
          </Button>
        </div>
      </div> */}
    </li>
  );
}
