import ProductCard from "@/components/product-card";
import FiltersToolbar from "../filters-toolbar";
import { getTranslations } from "next-intl/server";
import CustomPagination from "@/components/custom-pagination";

type Props = {
  products: any[];
  results: number;
  page: string | undefined;
  size: string | undefined;
};

export default async function ProductsListingView({
  products,
  results,
  page,
  size,
}: Props) {
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
              {products?.map((medicineData) => (
                <ProductCard key={medicineData?._id} medicine={medicineData} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      <CustomPagination
        totalNoOfRows={results}
        rowsPerPage={size ? parseInt(size) : 20}
        currentPage={page ? parseInt(page) : 1}
      />
    </div>
  );
}
