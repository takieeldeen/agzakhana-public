import ProductCard from "@/components/product-card";
import FiltersToolbar from "../filters-toolbar";
import { getTranslations } from "next-intl/server";
import CustomPagination from "@/components/custom-pagination";
import Image from "next/image";

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
      <div className=" flex flex-col md:flex-row w-full gap-6 py-8">
        <FiltersToolbar />
        <div className="w-full md:w-4/5">
          <div className="flex flex-col gap-2">
            {results === 0 && (
              <div className="flex items-center justify-center h-128 flex-col gap-4">
                <Image
                  src="/images/no-data.svg"
                  alt="No Data"
                  height={320}
                  width={320}
                />
                <p className="text-2xl font-bold text-gray-700">
                  {t("PRODUCTS_LISTING_PAGE.NO_DATA")}
                </p>
              </div>
            )}
            {results !== 0 && (
              <p className="text-lg font-semibold dark:text-gray-200">
                {t("PRODUCTS_LISTING_PAGE.WE_HAVE_FOUND")}
                <span className="text-agzakhana-primary font-bold">
                  {` ${results} `}
                </span>
                {t("PRODUCTS_LISTING_PAGE.FOR_YOU")}
              </p>
            )}

            <ul className="w-full flex flex-row flex-wrap  gap-4 justify-start ">
              {products?.map((medicineData) => (
                <ProductCard
                  key={medicineData?._id}
                  medicine={medicineData}
                  className="w-full"
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {results !== 0 && results > (size ? parseInt(size) : 20) && (
        <CustomPagination
          totalNoOfRows={results}
          rowsPerPage={size ? parseInt(size) : 20}
          currentPage={page ? parseInt(page) : 1}
        />
      )}
    </div>
  );
}
