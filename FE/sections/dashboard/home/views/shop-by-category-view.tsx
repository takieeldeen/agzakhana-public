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
import CategoryCard from "../category-card";
import { Category } from "@/types/categories";

export default async function ShopByCategoryView({
  categories,
  results,
}: {
  categories: Category[];
  results: number;
}) {
  const locale = await getLocale();
  const t = await getTranslations();
  if (!results) return null;
  return (
    <div className="p-8 px-4">
      <Carousel className="w-full">
        <div className="flex justify-between flex-row ">
          <div className="flex items-center gap-2 flex-row ">
            <h5 className="text-3xl font-bold mb-3">
              {t("HOME_PAGE.SHOP_BY_CATEGORY")}
            </h5>
            <div className="flex flex-row  gap-4">
              <CarouselPrevious className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180" />
              <CarouselNext className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180" />
            </div>
          </div>
          <Link
            href="/deals"
            className="flex flex-row gap-0.5 items-center  font-semibold hover:gap-2 transition-all duration-300 rtl:flex-row"
          >
            {t("HOME_PAGE.ALL_CATEGORIES")}
            <Icon
              icon={locale === "ar" ? "ci:chevron-left" : "ci:chevron-right"}
            />
          </Link>
        </div>
        <Separator className="mb-4" />
        <ul className="list-none">
          <CarouselContent className="gap-8 px-8">
            {categories?.map((category) => (
              <CategoryCard category={category} key={category?._id} />
            ))}
          </CarouselContent>
        </ul>
      </Carousel>
    </div>
  );
}
