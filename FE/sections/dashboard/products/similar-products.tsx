import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import { Medicine } from "@/types/medcines";

export async function SimilarProductsSection({
  similarProducts,
}: {
  similarProducts: Medicine[];
}) {
  const t = await getTranslations();
  return (
    <section className="flex flex-col gap-3 p-8 px-0">
      <Carousel className="w-full">
        <div className="flex justify-between flex-row ">
          <div className="flex items-center gap-2 flex-row ">
            <h5 className="text-3xl font-bold mb-3 dark:text-white">
              {t("PRODUCTS_LISTING_PAGE.SIMILAR_PRODUCTS")}
            </h5>
          </div>
          <div className="flex flex-row  gap-4">
            <CarouselPrevious className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180 dark:text-agzakhana-primary dark:border-agzakhana-primary dark:border-2" />
            <CarouselNext className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180 dark:text-agzakhana-primary dark:border-agzakhana-primary dark:border-2" />
          </div>
        </div>
        <Separator className="mb-4" />
        <ul className="list-none">
          <CarouselContent className="gap-8 px-4">
            {similarProducts?.map((product) => (
              <ProductCard key={product?._id} medicine={product} />
            ))}
          </CarouselContent>
        </ul>
      </Carousel>
    </section>
  );
}
