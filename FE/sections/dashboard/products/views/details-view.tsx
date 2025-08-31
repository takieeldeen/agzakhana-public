import ProductTag from "@/components/product-tag";
import { Separator } from "@/components/ui/separator";
import { Medicine } from "@/types/medcines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import ReviewsSection from "../reviews-section";
import { SimilarProductsSection } from "../similar-products";
import ProductPurchaseSpecs from "@/components/product-purchase-specs";
import { IncartTag } from "@/components/tags";
import ImageMagnifier from "@/components/image-magnifier";

export default async function DetailsView({ product }: { product: Medicine }) {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-3">
      <div className="p-3 flex flex-row gap-12">
        {/* <div className="border-[1px] border-gray-300 h-128 w-128 min-w-128 rounded-xl flex items-center justify-center relative"> */}
        {/* <FallbackImage
            src={product?.imageUrl}
            fill
            alt={product?.nameAr}
            style={{ objectFit: "contain" }}
          /> */}
        <ImageMagnifier
          src={product?.imageUrl}
          alt={locale === "ar" ? product?.nameAr : product?.nameEn}
          containerProps={{
            className: "h-128",
          }}
          zoomLevel={1.5}
        />
        {/* </div> */}
        <div className="flex flex-col gap-1">
          <ProductTag
            tag={product?.tag}
            className="relative text-lg rounded-md "
          />
          <div className="flex flex-row gap-2">
            <h2 style={{ fontSize: "40px" }} className="font-bold">
              {locale === "en" ? product?.nameEn : product?.nameAr}
            </h2>
          </div>
          <div>
            <IncartTag />
          </div>
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

          <ProductPurchaseSpecs product={product} />
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
