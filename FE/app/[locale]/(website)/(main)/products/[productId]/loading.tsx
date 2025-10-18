import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ReviewsSectionSkeleton } from "@/sections/dashboard/products/reviews-section";

export default function ProductDetaillsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <div className="p-3 flex flex-row gap-12">
        <div className="border-[1px] border-gray-300 h-128 w-128 min-w-128 rounded-xl flex items-center justify-center relative">
          <Skeleton className="w-full h-full" />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <Skeleton className="h-6 w-24 bg-gray-300" />
          <Skeleton className="h-8 w-48" />
          <div className="flex flex-row gap-3  items-center mb-4">
            <Skeleton className="h-8 w-8" />
            <Skeleton className="h-8 w-24" />
          </div>
          <div className="flex flex-row gap-3  items-center mb-6">
            <Skeleton className="h-12 w-36" />
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-24" />
            </div>
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-full h-6" />
            <Skeleton className="w-4/5 h-6" />
          </div>
          <div className="flex flex-col mb-2">
            <Skeleton className="w-24 h-6 mb-4" />
            <ul className="flex flex-row gap-2 font-semibold text-gray-500 ">
              <li>
                <Skeleton className="h-12 w-24" />
              </li>
              <li>
                <Skeleton className="h-12 w-24" />
              </li>
              <li>
                <Skeleton className="h-12 w-24" />
              </li>
            </ul>
          </div>
          <div className="flex flex-row gap-2">
            <Skeleton className="w-24 h-12" />
            <Skeleton className="w-36 h-12" />
          </div>
        </div>
      </div>
      <ul className="flex flex-col gap-8">
        <li className="flex flex-col gap-2">
          <Skeleton className="w-48 h-12" />
          <Separator />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
          </div>
        </li>
        <li className="flex flex-col gap-2">
          <Skeleton className="w-36 h-12" />
          <Separator />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-4/5 h-4" />
          </div>
        </li>
        <li className="flex flex-col gap-2">
          <Skeleton className="w-56 h-12" />
          <Separator />
          <div className="flex flex-col gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-3/6 h-4" />
          </div>
        </li>
        <li className="flex flex-col gap-2">
          <Skeleton className="w-56 h-12" />
          <Separator />
          <ReviewsSectionSkeleton />
        </li>
      </ul>
    </div>
  );
}
