import ProductTag from "@/components/product-tag";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";
import ReviewsSection from "../reviews-section";
import ProductPurchaseSpecs from "@/components/product-purchase-specs";
import ImageMagnifier from "@/components/image-magnifier";
import ProductsTags from "../products-tags";
import CustomBreadCrump from "@/components/custom-breadcrump";
import { handleEmptyString } from "@/utils/string";
import { Offer } from "@/types/offers";

export default async function DetailsView({ deal }: { deal: Offer }) {
  const locale = await getLocale();
  const t = await getTranslations();
  return (
    <div className="flex flex-col gap-3 px-4">
      <CustomBreadCrump className="p-3" />
      <div className="p-3 flex flex-col md:flex-row gap-12">
        <ImageMagnifier
          src={deal?.imageUrl}
          alt={locale === "ar" ? deal?.nameAr : deal?.nameEn}
          containerProps={{
            className: "h-128 max-w-96",
          }}
          zoomLevel={1.5}
        />
        {/* </div> */}
        <div className="flex flex-col gap-1">
          <ProductTag
            tag={deal?.tag}
            className="relative text-lg rounded-md "
          />
          <div className="flex flex-row gap-2">
            <h2 className="md:text-[40px] text-[32px] font-semibold dark:text-gray-200">
              {locale === "en" ? deal?.nameEn : deal?.nameAr}
            </h2>
          </div>
          <ProductsTags product={deal} />
          <div className="flex flex-row gap-1  items-center mb-4">
            <Icon
              icon="material-symbols:star-rounded"
              className="text-orange-400 text-4xl"
            />
            <span className="font-semibold leading-0 dark:text-gray-200">
              {t("PRODUCTS_LISTING_PAGE.REVIEW", {
                count: 25,
              })}
            </span>
          </div>
          <div className="flex  flex-col md:flex-row gap-1 items-start md:items-center mb-6">
            <strong className="text-5xl font-black text-agzakhana-primary">
              {deal?.price}
              <span className="text-base font-medium">
                {t("COMMON.EGP_CURRENCY")}
              </span>
            </strong>
            <div className="flex flex-col ">
              <span className="font-semibold leading-none text-orange-500 text-sm">
                {t("PRODUCTS_LISTING_PAGE.DISCOUNT", {
                  discount: `${Math.ceil(
                    ((deal.beforeDiscount - deal.price) / deal.price) * 100
                  )}
                %`,
                })}
              </span>
              <span className="font-semibold leading-none text-2xl line-through text-text-secondary dark:text-gray-400">
                {t("COMMON.EGP", { price: deal?.beforeDiscount })}
              </span>
            </div>
          </div>
          <p className="text-lg md:text-xl mb-8 dark:text-gray-100">
            {locale === "ar" ? deal?.descriptionAr : deal?.descriptionEn}
          </p>

          <ProductPurchaseSpecs product={deal} />
        </div>
      </div>
      <ul className="flex flex-col gap-8">
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl dark:text-gray-200">
            {t("PRODUCTS_LISTING_PAGE.INDICATIONS_FOR_USE")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold dark:text-gray-300">
            {handleEmptyString(
              locale === "ar" ? deal?.indicationsAr : deal?.indicationsEn,
              t("PRODUCTS_LISTING_PAGE.NO_INFO")
            )}
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <p className="font-bold text-3xl dark:text-gray-200">
            {t("PRODUCTS_LISTING_PAGE.DOSAGE")}
          </p>
          <Separator />
          <p className="text-gray-500 font-semibold dark:text-gray-300">
            {handleEmptyString(
              locale === "ar" ? deal?.dosageAr : deal?.dosageEn,
              t("PRODUCTS_LISTING_PAGE.NO_INFO")
            )}
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
      </ul>
    </div>
  );
}
