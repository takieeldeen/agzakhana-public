import ProductCard from "@/components/product-card";
import FiltersToolbar from "../filters-toolbar";
import { PRODUCT_LISTING_PAGE } from "@/_mock/_products_listing";
import { getTranslations } from "next-intl/server";
import CustomPagination from "@/components/custom-pagination";

export default async function ProductsListingView() {
  const t = await getTranslations();

  return (
    <div>
      <div className=" flex flex-row w-full gap-6 py-8">
        <FiltersToolbar />
        <div className="w-4/5">
          <div className="flex flex-col gap-2">
            <p className="text-lg font-semibold">
              {t("PRODUCTS_LISTING_PAGE.WE_HAVE_FOUND")}
              <span className="text-agzakhana-primary font-bold"> 29 </span>
              {t("PRODUCTS_LISTING_PAGE.FOR_YOU")}
            </p>
            <ul className="w-full flex flex-row flex-wrap gap-4 justify-start">
              {PRODUCT_LISTING_PAGE?.content?.map((medicineData) => (
                <ProductCard key={medicineData?.id} medicine={medicineData} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <CustomPagination
        totalNoOfRows={PRODUCT_LISTING_PAGE?.results}
        rowsPerPage={6}
        // onPageChange={(newPage) => console.log(newPage)}
        currentPage={2}
      />
    </div>
  );
}
