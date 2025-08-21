import { OFFERS_LIST } from "@/_mock/_offers";
import { ProductCardSkeleton } from "@/components/product-card";
import { Skeleton } from "@/components/ui/skeleton";
import { OffersCardSkeleton } from "@/sections/dashboard/home/offers-card";
import { ProductListItemSkeleton } from "@/sections/dashboard/home/product-list-item";

export default function ProductsListSkeleton() {
  return (
    <div>
      <div className="flex flex-row p-2">
        {/* <FiltersToolbar /> */}
        <div className="flex flex-col w-full">
          <Skeleton className="w-full h-96" />
          {/* Popular Products Section */}
          <div className="py-8">
            <div className=" flex flex-row justify-between">
              <Skeleton className="w-72 h-10 mb-4" />
              <Skeleton className="w-24 h-4" />
            </div>
            <ul className="w-full flex flex-row flex-wrap gap-4 justify-start">
              {Array.from({ length: 12 }, (_, i) => i).map(
                (medicineData, i) => (
                  <ProductCardSkeleton key={i} />
                )
              )}
            </ul>
            <div className="py-8">
              <div className=" flex flex-row justify-between">
                <Skeleton className="w-72 h-10 mb-4" />
                <Skeleton className="w-24 h-4" />
              </div>
              <ul className="w-full flex flex-row flex-wrap gap-2 justify-between">
                {OFFERS_LIST?.content?.map((offerData) => (
                  <OffersCardSkeleton key={offerData?.id} />
                ))}
              </ul>
            </div>
            <ul className="w-full flex flex-row flex-wrap gap-4 justify-start py-1">
              {Array.from({ length: 15 }, (_, i) => i)?.map((category) => (
                <li
                  key={category}
                  className="h-32 w-32 rounded-md border-2 flex flex-col items-center gap-2 justify-center"
                >
                  <Skeleton className="w-16 h-16" />
                  <Skeleton className="w-20 h-2" />
                </li>
              ))}
            </ul>
          </div>
          {/* Deals of the day Section */}
        </div>
      </div>
      {/* Categorized listing item */}
      <div className="flex flex-row p-8 px-4 gap-4 ">
        <div className="w-[calc(25%-1rem)]">
          <Skeleton className="w-36 h-5 mb-2" />
          <ul className="flex flex-col gap-3 py-4">
            {Array.from({ length: 4 }, (_, i) => i)?.map((productData) => (
              <ProductListItemSkeleton key={productData} />
            ))}
          </ul>
        </div>
        <div className="w-[calc(25%-1rem)]">
          <Skeleton className="w-36 h-5 mb-2" />
          <ul className="flex flex-col gap-3 py-4">
            {Array.from({ length: 4 }, (_, i) => i)?.map((productData) => (
              <ProductListItemSkeleton key={productData} />
            ))}
          </ul>
        </div>
        <div className="w-[calc(25%-1rem)]">
          <Skeleton className="w-36 h-5 mb-2" />
          <ul className="flex flex-col gap-3 py-4">
            {Array.from({ length: 4 }, (_, i) => i)?.map((productData) => (
              <ProductListItemSkeleton key={productData} />
            ))}
          </ul>
        </div>
        <div className="w-[calc(25%-1rem)]">
          <Skeleton className="w-36 h-5 mb-2" />
          <ul className="flex flex-col gap-3 py-4">
            {Array.from({ length: 4 }, (_, i) => i)?.map((productData) => (
              <ProductListItemSkeleton key={productData} />
            ))}
          </ul>
        </div>
      </div>
      <Skeleton className="w-full h-96" />
    </div>
  );
}
