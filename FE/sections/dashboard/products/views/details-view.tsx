import FallbackImage from "@/components/image";
import ProductTag from "@/components/product-tag";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Medicine } from "@/types/medcines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import ReviewsSection from "../reviews-section";
import { SimilarProductsSection } from "../similar-products";

export default async function DetailsView({ product }: { product: Medicine }) {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-3 px-4">
      <div className="p-3 flex flex-row gap-12">
        <div className="border-[1px] border-gray-300 h-128 w-128 min-w-128 rounded-xl flex items-center justify-center relative">
          <FallbackImage
            src={product?.imageUrl}
            fill
            alt={product?.nameAr}
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="flex flex-col gap-1">
          <ProductTag
            tag={product?.tag}
            className="relative text-lg rounded-md"
          />
          <h2 style={{ fontSize: "40px" }} className="font-bold">
            {locale === "en" ? product?.nameEn : product?.nameAr}
          </h2>
          <div className="flex flex-row gap-1  items-center mb-4">
            <Icon
              icon="material-symbols:star-rounded"
              className="text-orange-400 text-4xl"
            />
            <span className="font-semibold leading-0">
              {t("PRODUCTS_LISTING_PAGE.REVIEW", {
                count: 25,
              })}
            </span>
          </div>
          <div className="flex flex-row gap-1  items-center mb-6">
            <strong className="text-5xl font-black text-agzakhana-primary">
              {t("COMMON.EGP", { price: product?.price })}
            </strong>
            <div className="flex flex-col ">
              <span className="font-semibold leading-none text-orange-500 text-sm">
                {t("PRODUCTS_LISTING_PAGE.DISCOUNT", {
                  discount: `${Math.ceil(
                    ((product.beforeDiscount - product.price) / product.price) *
                      100
                  )}
                %`,
                })}
              </span>
              <span className="font-semibold leading-none text-2xl line-through text-text-secondary">
                {t("COMMON.EGP", { price: product?.beforeDiscount })}
              </span>
            </div>
          </div>
          <p className="text-xl mb-8">
            {locale === "ar" ? product?.descriptionAr : product?.descriptionEn}
          </p>
          <div className="flex flex-col mb-2">
            <p className="font-bold text-lg mb-3">
              {t("PRODUCTS_LISTING_PAGE.CONCENTRATION")}
            </p>
            <ul className="flex flex-row gap-2 font-semibold text-gray-500 ">
              {product?.concentration?.map((el) => (
                <li
                  className="border-2 p-2 px-4 rounded-md select-none cursor-pointer"
                  key={el}
                >
                  {el}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row gap-2">
            <input
              type="number"
              className="border-agzakhana-primary border-2 px-3 py-2 text-xl font-semibold rounded-lg w-28 text-center"
              value={1}
            />
            <Button className="h-12 w-48 bg-agzakhana-primary text-white text-[16px] hover:bg-agzakhana-primary flex items-center justify-center gap-2">
              <Icon icon="mynaui:cart" className="h-6! w-6!" />
              {t("PRODUCTS_LISTING_PAGE.ADD_TO_CART")}
            </Button>
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-8">
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl">
            {t("PRODUCTS_LISTING_PAGE.INDICATIONS_FOR_USE")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold">
            {locale === "ar" ? product?.indicationsAr : product?.indicationsEn}
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl">
            {t("PRODUCTS_LISTING_PAGE.DOSAGE")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold">
            {locale === "ar" ? product?.dosageAr : product?.dosageEn}
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl">
            {t("PRODUCTS_LISTING_PAGE.WARNING")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold">
            {t("PRODUCTS_LISTING_PAGE.MEDICINE_WARNING")}
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl">
            {t("PRODUCTS_LISTING_PAGE.REVIEWS_AND_RATING")}
          </p>
          <Separator />
          <ReviewsSection />
        </li>
        <li className="flex flex-col gap-2">
          <SimilarProductsSection />
        </li>
      </ul>
    </div>
  );
}
