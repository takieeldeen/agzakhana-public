"use client";
import { MANUFACTURER_LIST } from "@/_mock/_manufacturer";
import { useGetCategories } from "@/api/categories";
import { useGetAllManufacturers } from "@/api/products";
import { Checkbox } from "@/components/ui/checkbox";
import useListing from "@/hooks/useListing";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

export default function FiltersToolbar() {
  const t = useTranslations();
  const locale = useLocale();
  const { pushToFilter, removeFromFilter } = useListing();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const handleFilterChange = useCallback(
    (key: string, value: string) => {
      if (currentCategory?.includes(value)) {
        removeFromFilter(key, value);
      } else {
        pushToFilter(key, value);
      }
    },
    [currentCategory, pushToFilter, removeFromFilter]
  );
  const { categories } = useGetCategories();
  const { manufacturers } = useGetAllManufacturers();
  return (
    <aside className="w-1/5 flex flex-col gap-3">
      <div className="shadow-lg w-full rounded-2xl px-4 py-6 border-gray-100 border-[1px]">
        <h5 className="text-2xl font-bold border-b-2 border-gray-200 pb-2">
          {t("PRODUCTS_LISTING_PAGE.FILTERS_MANUFACTURERS")}
        </h5>
        <div className="w-36 h-1 -translate-y-[3px] rounded-md bg-[#BCE3C9] mb-2" />
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-gray-500 text-lg font-bold mb-1">
              {t("PRODUCTS_LISTING_PAGE.MANUFACTURER")}
            </p>
            <div className="px-2">
              {manufacturers?.map((manufacturer) => (
                <div
                  key={manufacturer?.name}
                  className="flex flex-row gap-2 items-center font-semibold"
                >
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="">
                    {`${manufacturer?.name} (${manufacturer?.count})`}
                  </label>
                </div>
              ))}
            </div>
          </div>
          {/* <div>
            <p className="text-gray-500 text-lg font-bold mb-1">Price Range</p>
            <div className="flex flex-row"></div>
          </div> */}
        </div>
      </div>
      <div className="shadow-lg w-full min-h-72 rounded-2xl px-4 py-6 border-gray-100 border-[1px]">
        <h5 className="text-2xl font-bold border-b-2 border-gray-200 pb-2">
          {t("PRODUCTS_LISTING_PAGE.CATEGORIES")}
        </h5>
        <div className="w-36 h-1 -translate-y-[3px] rounded-md bg-[#BCE3C9]" />
        <ul className="py-2 flex flex-col gap-2">
          {categories?.map((category) => (
            <li
              onClick={() => handleFilterChange("category", category?._id)}
              key={category?._id}
              className={cn(
                "h-12 border-2 border-gray-200 rounded-md flex flex-row items-center px-2 gap-2 cursor-pointer hover:border-gray-400 transition-all duration-300",
                currentCategory?.includes(category?._id) &&
                  " border-gray-400 translate-x-2"
              )}
            >
              <Icon
                icon={category?.icon}
                width={36}
                height={36}
                className="text-gray-600"
              />
              <p className="text-lg font-semibold mr-auto rtl:ml-auto rtl:mr-0 text-text-primary">
                {category?.[locale === "ar" ? "nameAr" : "nameEn"]}
              </p>
              <span className="font-semibold bg-[#BCE3C9] w-8 h-8 aspect-square flex items-center justify-center rounded-full text-sm">
                {category?.count}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
