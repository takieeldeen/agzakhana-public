import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { PRODUCT_LISTING_PAGE } from "@/_mock/_products_listing";
import ProductCard from "@/components/product-card";
import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";

export async function SimilarProductsSection() {
  const t = await getTranslations();
  return (
    <section className="flex flex-col gap-3">
      <Carousel className="w-full" dir="ltr">
        <div className="flex justify-between flex-row rtl:flex-row-reverse">
          <p className="font-bold text-3xl">
            {t("PRODUCTS_LISTING_PAGE.SIMILAR_PRODUCTS")}
          </p>
          <div className="flex flex-row gap-4">
            <CarouselPrevious className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto" />
            <CarouselNext className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto" />
          </div>
        </div>
        <Separator className="mb-4" />
        <CarouselContent className="gap-8 px-8">
          {PRODUCT_LISTING_PAGE?.content?.map((product) => (
            <ProductCard key={product?.id} medicine={product} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}
