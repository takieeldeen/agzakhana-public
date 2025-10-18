import { Icon } from "@iconify/react/dist/iconify.js";
import { getTranslations } from "next-intl/server";

export default async function productNotFound() {
  const t = await getTranslations();
  return (
    <div className="flex items-center justify-center py-32 flex-col gap-2">
      <div className="flex flex-row items-center gap-3">
        <Icon
          icon="fluent:pill-24-regular"
          width={96}
          height={96}
          className="text-gray-400"
        />
        <h2 className="text-agzakhana-primary text-9xl font-bold">404</h2>
      </div>
      <div>
        <p className="text-3xl text-gray-600">
          {t("PRODUCTS_LISTING_PAGE.PRODUCT_NOT_FOUND")}
        </p>
      </div>
    </div>
  );
}
