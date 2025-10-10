"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import FallbackImage from "./image";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import CircularProgress from "./circular-progress";
import { useState } from "react";

export default function SearchBox() {
  const [query, setQuery] = useState<string>("");
  const results: any[] = [];
  const resultsLoading = false;
  const t = useTranslations();
  return (
    <div className="relative">
      <div className="relative">
        <input
          className="w-128 h-12 rounded-md border-[1px] border-gray-300 px-2 hover:border-agzakhana-primary transition-all duration-300 font-semibold focus:border-agzakhana-primary rtl:pl-14 rtl:pr-2 pr-14"
          placeholder={t("HEADER.SEARCH_FOR_PRODUCTS")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button className="absolute right-0 rtl:left-0 rtl:right-auto h-full aspect-square bg-agzakhana-primary">
          <Icon icon="material-symbols:search-rounded" className="h-6! w-6! " />
        </Button>
      </div>
      {query !== "" && (
        <div className="absolute bg-white w-full rounded-lg min-h-12 top-[120%] drop-shadow-lg p-2 z-10">
          <ul className="max-h-128 overflow-y-auto">
            {resultsLoading && (
              <li className="flex flex-row items-center gap-4 h-12 px-2">
                <CircularProgress className="h-6 w-6" />
                <p className="font-semibold text-gray-400">Searching</p>
              </li>
            )}
            {!resultsLoading &&
              results?.map((result, i) => (
                <li
                  key={result?.id}
                  className={cn(
                    " border-b-2 cursor-pointer hover:bg-gray-100 transition-all duration-300 ",
                    results?.length !== i + 1 ? "" : "border-gray-300"
                  )}
                >
                  <Link
                    href={`/products/${result?.id}`}
                    className="py-2 flex flex-row gap-2"
                  >
                    <div className="relative w-16 h-16 border-gray-300 border-2 rounded-md items-center justify-center flex">
                      <FallbackImage
                        height={35}
                        width={35}
                        alt={result?.nameEn}
                        src={result?.imageUrl}
                      />
                    </div>
                    <div>
                      <p className="font-bold">{result?.nameEn}</p>
                      <div className="flex flex-row gap-0.5 text-sm">
                        {t("HOME_PAGE.BY")}
                        <span className="text-agzakhana-primary font-semibold bg-transparent p-0 text-sm">
                          {result?.manufacturer}
                        </span>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
