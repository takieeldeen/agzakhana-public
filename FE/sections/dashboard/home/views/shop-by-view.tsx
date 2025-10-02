import { getTranslations } from "next-intl/server";
import ProductListItem from "../product-list-item";
import { Medicine } from "@/types/medcines";

type Props = {
  products: {
    latest: Medicine[];
    trending: Medicine[];
    popular: Medicine[];
    bestSelling: Medicine[];
  };
  results: number;
};
export default async function ShopByView({ products, results }: Props) {
  const t = await getTranslations();
  if (!results) return null;
  return (
    <div className="flex flex-row p-8 px-4 gap-4 ">
      <div className="w-[calc(25%-1rem)]">
        <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 dark:border-gray-600 pb-2 dark:text-gray-100">
          {t("HOME_PAGE.TOP_SELLING_TITLE")}
        </h6>
        <div className="h-[2px] w-24 bg-green-500 dark:bg-green-400 -translate-y-0.5" />
        <ul className="flex flex-col gap-3 py-4">
          {products?.bestSelling?.map((productData) => (
            <ProductListItem product={productData} key={productData?._id} />
          ))}
        </ul>
      </div>
      <div className="w-[calc(25%-1rem)]">
        <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 dark:border-gray-600 pb-2 dark:text-gray-100">
          {t("HOME_PAGE.TRENDING_TITLE")}
        </h6>
        <div className="h-[2px] w-24 bg-green-500 dark:bg-green-400 -translate-y-0.5" />
        <ul className="flex flex-col gap-3 py-4">
          {products?.trending?.map((productData) => (
            <ProductListItem product={productData} key={productData?._id} />
          ))}
        </ul>
      </div>
      <div className="w-[calc(25%-1rem)]">
        <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 dark:border-gray-600 pb-2 dark:text-gray-100">
          {t("HOME_PAGE.RECENTLY_ADDED_TITLE")}
        </h6>
        <div className="h-[2px] w-24 bg-green-500 dark:bg-green-400 -translate-y-0.5" />
        <ul className="flex flex-col gap-3 py-4">
          {products?.latest?.map((productData) => (
            <ProductListItem product={productData} key={productData?._id} />
          ))}
        </ul>
      </div>
      <div className="w-[calc(25%-1rem)]">
        <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 dark:border-gray-600 pb-2 dark:text-gray-100">
          {t("HOME_PAGE.TOP_RATED_TITLE")}
        </h6>
        <div className="h-[2px] w-24 bg-green-500 dark:bg-green-400 -translate-y-0.5" />
        <ul className="flex flex-col gap-3 py-4">
          {products?.trending?.map((productData) => (
            <ProductListItem product={productData} key={productData?._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
