import { Button } from "@/components/ui/button";
import { POPULAR_ITEM_LIST } from "@/_mock/_popular_items";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { OFFERS_LIST } from "@/_mock/_offers";
import OffersCard from "../offers-card";
import CategoryCard from "../category-card";
import { CATEGORIES_LIST } from "@/_mock/_categories";
import ProductListItem from "../product-list-item";
import { getLocale, getTranslations } from "next-intl/server";
import ProductCard from "@/components/product-card";
import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";

export default async function HomePageListView() {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <div>
      <div className="flex flex-row p-2">
        {/* <FiltersToolbar /> */}
        <div className="flex flex-col w-full">
          <div className="bg-green-200 bg-blend-overlay bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url('../../assets/images/hero-pattern.svg')]  w-full h-128 rounded-4xl p-12 flex items-start flex-col justify-center ">
            <h2 className="text-5xl font-bold text-text-primary mb-2 max-w-128">
              {t("HOME_PAGE.TITLE")}
            </h2>
            <span className="text-3xl font-semibold text-gray-600 mb-4">
              {t("HOME_PAGE.SUB_TITLE")}
            </span>
            <form action="#" className="relative">
              <input
                className="bg-white outline-none  py-3 rounded-[9999] w-96 px-4"
                type="email"
                placeholder={t("HOME_PAGE.EMAIL_PLACEHOLDER")}
              />
              <Button className="absolute h-full rounded-full right-0 bg-agzakhana-primary text-lg rtl:left-0 rtl:right-auto">
                {t("HOME_PAGE.SUBSCRIBE")}
              </Button>
            </form>
          </div>
          {/* Popular Products Section */}
          <div className="py-8">
            <Carousel className="w-full">
              <div className="flex justify-between flex-row ">
                <div className="flex items-center gap-2 flex-row ">
                  <h5 className="text-3xl font-bold mb-3">
                    {t("HOME_PAGE.POPULAR_PRODUCTS_TITLE")}
                  </h5>
                  <div className="flex flex-row  gap-4">
                    <CarouselPrevious className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180" />
                    <CarouselNext className="relative m-0 translate-x-0 translate-y-0 left-auto top-auto right-auto rtl:rotate-180" />
                  </div>
                </div>
                <Link
                  href="/"
                  className="flex flex-row gap-0.5 items-center  font-semibold hover:gap-2 transition-all duration-300 rtl:flex-row"
                >
                  {t("HOME_PAGE.SHOW_ALL")}
                  <Icon
                    icon={
                      locale === "ar" ? "ci:chevron-left" : "ci:chevron-right"
                    }
                  />
                </Link>
              </div>
              <Separator className="mb-4" />
              <ul className="list-none">
                <CarouselContent className="gap-8 px-8">
                  {POPULAR_ITEM_LIST?.content?.map((product) => (
                    <ProductCard key={product?.id} medicine={product} />
                  ))}
                </CarouselContent>
              </ul>
            </Carousel>
            {/* <ul className="w-full flex flex-row flex-wrap gap-4 justify-start">
              {POPULAR_ITEM_LIST?.content?.map((medicineData) => (
                <ProductCard key={medicineData?.id} medicine={medicineData} />
              ))}
            </ul> */}
          </div>
          {/* Deals of the day Section */}
          <div className="py-8">
            <Carousel className="w-full">
              <div className="flex justify-between flex-row ">
                <div className="flex items-center gap-2 flex-row ">
                  <h5 className="text-3xl font-bold mb-3">
                    {t("HOME_PAGE.DEALS_OF_THE_DAY")}
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
                  {t("HOME_PAGE.SHOW_ALL_DEALS")}
                  <Icon
                    icon={
                      locale === "ar" ? "ci:chevron-left" : "ci:chevron-right"
                    }
                  />
                </Link>
              </div>
              <Separator className="mb-4" />
              <ul className="list-none">
                <CarouselContent className="gap-8 px-8">
                  {OFFERS_LIST?.content?.map((offerData) => (
                    <OffersCard key={offerData?.id} offer={offerData} />
                  ))}
                </CarouselContent>
              </ul>
            </Carousel>
          </div>
        </div>
      </div>
      {/* Shop By Category Section */}
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
              {CATEGORIES_LIST?.content?.map((category) => (
                <CategoryCard category={category} key={category?.id} />
              ))}
            </CarouselContent>
          </ul>
        </Carousel>
      </div>
      {/* Categorized listing item */}
      <div className="flex flex-row p-8 px-4 gap-4 ">
        <div className="w-[calc(25%-1rem)]">
          <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 pb-2">
            {t("HOME_PAGE.TOP_SELLING_TITLE")}
          </h6>
          <div className="h-[2px] w-24 bg-green-500 -translate-y-0.5" />
          <ul className="flex flex-col gap-3 py-4">
            {POPULAR_ITEM_LIST?.content?.slice(0, 3)?.map((productData) => (
              <ProductListItem product={productData} key={productData?.id} />
            ))}
          </ul>
        </div>
        <div className="w-[calc(25%-1rem)]">
          <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 pb-2">
            {t("HOME_PAGE.TRENDING_TITLE")}
          </h6>
          <div className="h-[2px] w-24 bg-green-500 -translate-y-0.5" />
          <ul className="flex flex-col gap-3 py-4">
            {POPULAR_ITEM_LIST?.content?.slice(3, 6)?.map((productData) => (
              <ProductListItem product={productData} key={productData?.id} />
            ))}
          </ul>
        </div>
        <div className="w-[calc(25%-1rem)]">
          <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 pb-2">
            {t("HOME_PAGE.RECENTLY_ADDED_TITLE")}
          </h6>
          <div className="h-[2px] w-24 bg-green-500 -translate-y-0.5" />
          <ul className="flex flex-col gap-3 py-4">
            {POPULAR_ITEM_LIST?.content?.slice(6, 9)?.map((productData) => (
              <ProductListItem product={productData} key={productData?.id} />
            ))}
          </ul>
        </div>
        <div className="w-[calc(25%-1rem)]">
          <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 pb-2">
            {t("HOME_PAGE.TOP_RATED_TITLE")}
          </h6>
          <div className="h-[2px] w-24 bg-green-500 -translate-y-0.5" />
          <ul className="flex flex-col gap-3 py-4">
            {POPULAR_ITEM_LIST?.content?.slice(3, 6)?.map((productData) => (
              <ProductListItem product={productData} key={productData?.id} />
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-green-200 bg-blend-overlay bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.2)),url('../../assets/images/hero-pattern.svg')]  w-full h-128 rounded-4xl p-12 flex items-start flex-col justify-center ">
        <h2 className="text-5xl font-bold text-text-primary mb-2 max-w-128">
          {t("HOME_PAGE.TITLE")}
        </h2>
        <span className="text-3xl font-semibold text-gray-600 mb-4">
          {t("HOME_PAGE.SUB_TITLE")}
        </span>
        <form action="#" className="relative">
          <input
            className="bg-white outline-none  py-3 rounded-[9999] w-96 px-4"
            type="email"
            placeholder={t("HOME_PAGE.EMAIL_PLACEHOLDER")}
          />
          <Button className="absolute h-full rounded-full right-0 bg-agzakhana-primary text-lg rtl:left-0 rtl:right-auto">
            {t("HOME_PAGE.SUBSCRIBE")}
          </Button>
        </form>
      </div>
    </div>
  );
}
