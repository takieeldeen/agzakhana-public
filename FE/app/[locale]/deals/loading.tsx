import { Skeleton } from "@/components/ui/skeleton";
import { OffersCardSkeleton } from "@/sections/dashboard/home/offers-card";

export default function DealsListLoadingPage() {
  return (
    <div>
      <div className=" flex flex-row w-full gap-6 py-8">
        <div className="w-1/5 flex flex-col gap-14">
          <Skeleton className="h-96 w-full rounded-md" />
          <Skeleton className="h-128 w-full rounded-md" />
        </div>
        <div className="w-4/5">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-6 w-48" />
            <ul className="w-full flex flex-row flex-wrap gap-4 justify-start">
              {Array.from({ length: 20 }, (_, i) => i)?.map((offerData) => (
                <OffersCardSkeleton key={offerData} />
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/* <CustomPagination
        totalNoOfRows={results}
        rowsPerPage={size ? parseInt(size) : 20}
        currentPage={page ? parseInt(page) : 1}
      /> */}
    </div>
  );
}
