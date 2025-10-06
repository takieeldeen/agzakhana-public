import FiltersToolbar from "../filters-toolbar";
import { getTranslations } from "next-intl/server";
import CustomPagination from "@/components/custom-pagination";
import OffersCard from "../../home/offers-card";

type Props = {
  list: any[];
  results: number;
  page: string | undefined;
  size: string | undefined;
};

export default async function ProductsListingView({
  list,
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
            <p className="text-lg font-semibold dark:text-gray-200">
              {t("PRODUCTS_LISTING_PAGE.WE_HAVE_FOUND")}
              <span className="text-agzakhana-primary font-bold">
                {results ? ` ${results} ` : " -- "}
              </span>
              {t("PRODUCTS_LISTING_PAGE.FOR_YOU")}
            </p>
            <ul className="w-full flex flex-row flex-wrap gap-4 justify-start">
              {list?.map((offerData) => (
                <OffersCard
                  key={offerData?._id}
                  offer={offerData}
                  className="w-full"
                />
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
