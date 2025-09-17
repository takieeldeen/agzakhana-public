import { POPULAR_ITEM_LIST } from "@/_mock/_popular_items";
import { getTranslations } from "next-intl/server";
import ProductListItem from "../product-list-item";

export default async function ShopByView() {
  const t = await getTranslations();
  return (
    <div className="flex flex-row p-8 px-4 gap-4 ">
      <div className="w-[calc(25%-1rem)]">
        <h6 className="text-xl font-bold text-text-primary w-full border-b-2 border-gray-300 pb-2">
          {t("HOME_PAGE.TOP_SELLING_TITLE")}
        </h6>
        <div className="h-[2px] w-24 bg-green-500 -translate-y-0.5" />
        <ul className="flex flex-col gap-3 py-4">
          {POPULAR_ITEM_LIST?.content?.slice(0, 3)?.map((productData) => (
            <ProductListItem product={productData} key={productData?._id} />
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
            <ProductListItem product={productData} key={productData?._id} />
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
            <ProductListItem product={productData} key={productData?._id} />
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
            <ProductListItem product={productData} key={productData?._id} />
          ))}
        </ul>
      </div>
    </div>
  );
}
