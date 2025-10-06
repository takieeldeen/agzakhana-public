import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import OffersCard from "../offers-card";
import { Offer } from "@/types/offers";

export default async function LatestDealsView({
  deals,
  results,
}: {
  deals: Offer[];
  results: number;
}) {
  const locale = await getLocale();
  const t = await getTranslations();
  if (!results) return null;
  return (
    <div className="py-8">
      <Carousel className="w-full">
        <div className="flex justify-between flex-row ">
          <div className="flex items-center gap-2 flex-row ">
            <h5 className="text-3xl font-bold mb-3 dark:text-gray-100">
              {t("HOME_PAGE.DEALS_OF_THE_DAY")}
            </h5>
            <div className="md:flex hidden flex-row  gap-4">
              <CarouselPrevious className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180 dark:text-agzakhana-primary dark:border-agzakhana-primary dark:border-2" />
              <CarouselNext className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180 dark:text-agzakhana-primary dark:border-agzakhana-primary dark:border-2" />
            </div>
          </div>
          <Link
            href="/deals"
            className="flex flex-row gap-0.5 items-center  font-semibold hover:gap-2 transition-all duration-300 rtl:flex-row dark:text-gray-200"
          >
            {t("HOME_PAGE.SHOW_ALL_DEALS")}
            <Icon
              icon={locale === "ar" ? "ci:chevron-left" : "ci:chevron-right"}
            />
          </Link>
        </div>
        <Separator className="mb-4" />
        <ul className="list-none">
          <CarouselContent className="gap-8 px-8">
            {deals.map((offerData) => (
              <OffersCard key={offerData?._id} offer={offerData} />
            ))}
          </CarouselContent>
        </ul>
      </Carousel>
    </div>
  );
}
