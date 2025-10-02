import ProductCard from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { Medicine } from "@/types/medcines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {
  products: Medicine[];
  results: number;
};
export default async function PopularProductsView({
  products,
  results,
}: Props) {
  const t = await getTranslations();
  const locale = await getLocale();
  if (results === 0) return null;
  return (
    <div className="py-8">
      <Carousel className="w-full">
        <div className="flex justify-between flex-row ">
          <div className="flex items-center gap-2 flex-row ">
            <h5 className="text-3xl font-bold mb-3 dark:text-gray-100">
              {t("HOME_PAGE.POPULAR_PRODUCTS_TITLE")}
            </h5>
            <div className="flex flex-row  gap-4">
              <CarouselPrevious className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180 dark:text-agzakhana-primary dark:border-agzakhana-primary dark:border-2" />
              <CarouselNext className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180 dark:text-agzakhana-primary dark:border-agzakhana-primary dark:border-2" />
            </div>
          </div>
          <Link
            href="/"
            className="flex flex-row gap-0.5 items-center  font-semibold hover:gap-2 transition-all duration-300 rtl:flex-row dark:text-gray-200 "
          >
            {t("HOME_PAGE.SHOW_ALL")}
            <Icon
              icon={locale === "ar" ? "ci:chevron-left" : "ci:chevron-right"}
            />
          </Link>
        </div>
        <Separator className="mb-4" />
        <ul className="list-none">
          <CarouselContent className="gap-8 pl-5">
            {products?.map((product) => (
              <ProductCard key={product?._id} medicine={product} />
            ))}
          </CarouselContent>
        </ul>
      </Carousel>
    </div>
  );
}
