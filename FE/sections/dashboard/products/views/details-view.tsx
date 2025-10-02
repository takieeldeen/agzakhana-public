import ProductTag from "@/components/product-tag";
import { Separator } from "@/components/ui/separator";
import { Medicine } from "@/types/medcines";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import ReviewsSection from "../reviews-section";
import { SimilarProductsSection } from "../similar-products";
import ProductPurchaseSpecs from "@/components/product-purchase-specs";
import ImageMagnifier from "@/components/image-magnifier";
import ProductsTags from "../products-tags";
import CustomBreadCrump from "@/components/custom-breadcrump";

export default async function DetailsView({
  product,
  similarProducts,
}: {
  product: Medicine;
  similarProducts: Medicine[];
}) {
  const locale = await getLocale();
  const t = await getTranslations();
  console.log(product);
  return (
    <div className="flex flex-col gap-3 px-4">
      <CustomBreadCrump className="p-3" />
      <div className="p-3 flex flex-row gap-12">
        <ImageMagnifier
          src={product?.imageUrl}
          alt={locale === "ar" ? product?.nameAr : product?.nameEn}
          containerProps={{
            className: "h-128 max-w-96",
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
            <h2
              style={{ fontSize: "40px" }}
              className="font-semibold dark:text-gray-200"
            >
              {locale === "en" ? product?.nameEn : product?.nameAr}
            </h2>
          </div>
          <ProductsTags product={product} />
          <div className="flex flex-row gap-1  items-center mb-4">
            <Icon
              icon="material-symbols:star-rounded"
              className="text-orange-400 text-4xl"
            />
            <span className="font-semibold leading-0 dark:text-gray-200">
              {t("PRODUCTS_LISTING_PAGE.REVIEW", {
                count: product?.reviewers,
              })}
            </span>
          </div>
          <div className="flex flex-row gap-1  items-center mb-6">
            <strong className="text-5xl font-black text-agzakhana-primary">
              {product?.price}
              <span className="text-base font-medium">
                {t("COMMON.EGP_CURRENCY")}
              </span>
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
              <span className="font-semibold leading-none text-2xl line-through text-text-secondary dark:text-gray-400">
                {t("COMMON.EGP", { price: product?.beforeDiscount })}
              </span>
            </div>
          </div>
          <p className="text-xl mb-8 dark:text-gray-100">
            {locale === "ar" ? product?.descriptionAr : product?.descriptionEn}
          </p>

          <ProductPurchaseSpecs product={product} />
        </div>
      </div>
      <ul className="flex flex-col gap-8">
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl dark:text-gray-200">
            {t("PRODUCTS_LISTING_PAGE.INDICATIONS_FOR_USE")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold dark:text-gray-300">
            {locale === "ar" ? product?.indicationsAr : product?.indicationsEn}
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl dark:text-gray-200">
            {t("PRODUCTS_LISTING_PAGE.DOSAGE")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold dark:text-gray-300">
            {locale === "ar" ? product?.dosageAr : product?.dosageEn}
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl dark:text-gray-200">
            {t("PRODUCTS_LISTING_PAGE.WARNING")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold dark:text-gray-300">
            {t("PRODUCTS_LISTING_PAGE.MEDICINE_WARNING")}
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl dark:text-gray-200">
            {t("PRODUCTS_LISTING_PAGE.REVIEWS_AND_RATING")}
          </p>
          <Separator />
          <ReviewsSection />
        </li>
        <li className="flex flex-col gap-2">
          <SimilarProductsSection similarProducts={similarProducts} />
        </li>
      </ul>
    </div>
  );
}
