import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export function ListItemSkeleton() {
  return (
    <li className="bg-card dark:bg-dark-card w-full h-24 rounded-xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-row items-center gap-3 ">
      <Skeleton className="h-[4.5rem] w-[4.5rem] rounded-full dark:bg-dark-background" />
      <div className="flex flex-col gap-1 w-3/6">
        <Skeleton className="w-16 h-4 dark:bg-dark-background" />
        <div className="flex flex-row gap-3 items-end">
          <Skeleton className="w-12 h-5 rounded-md dark:bg-dark-background" />
          <Skeleton className="w-1/2 h-3 dark:bg-dark-background" />
        </div>
      </div>
      <Separator orientation="vertical" className="dark:bg-dark-background" />
      <div className="flex flex-row gap-8 ">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-36 dark:bg-dark-background" />
          <Skeleton className="h-3 w-16 dark:bg-dark-background" />
        </div>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-4 w-36 dark:bg-dark-background" />
          <Skeleton className="h-3 w-16 dark:bg-dark-background" />
        </div>
      </div>
      <Skeleton className="h-12 w-12 ml-auto rtl:mr-auto rtl:ml-0 rounded-xl dark:bg-dark-background" />
    </li>
  );
}
export function GridItemSkeleton() {
  return (
    <Skeleton className="bg-card dark:bg-dark-card min-w-76 max-w-[calc(33%_-_12px)] aspect-square overflow-hidden rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col items-center gap-3 ">
      <div className="bg-gray-200 w-full max-h-24 min-h-[calc(31%)] flex flex-row gap-3 items-center px-3">
        <Skeleton className="min-h-3/4! h-auto! w-auto! max-h-[4.5rem]! aspect-square rounded-full" />
        <div className="flex flex-col gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-12 rounded-md" />
        </div>
      </div>
      <div className="flex flex-col gap-1 px-3 w-full">
        <Skeleton className="h-4 w-24 mb-2" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Separator />
      <div className="flex flex-row w-full  mb-auto p-2">
        <div className="flex flex-col gap-1 p-2 w-full">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-12" />
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="w-full transition-all duration-300  h-16 flex flex-row items-center justify-center gap-3 border-t-2 group">
        <Skeleton className="h-11 w-11 rounded-full" />
        <Skeleton className="h-11 w-11 rounded-full" />
        <Skeleton className="h-11 w-11 rounded-full" />
      </div>
    </Skeleton>
  );
}

export default function ListSkeletonView() {
  const [viewMode] = useState<"LIST" | "GRID">("LIST");
  const t = useTranslations();
  const GRID_MODE = viewMode === "GRID";
  const LIST_MODE = viewMode === "LIST";
  return (
    <div className="flex flex-col gap-3 h-fit">
      {/* Title Bar */}
      <div className="flex flex-row justify-between sticky top-0 bg-slate-50 dark:bg-dark-background text-foreground py-2 z-20">
        <div className="flex flex-col">
          <h3 className="text-3xl font-bold">
            {t("ROLES_MANAGEMENT.LIST_TITLE")}
          </h3>
          <p>{t("ROLES_MANAGEMENT.LIST_SUBTITLE")}</p>
        </div>
        <Skeleton className="h-12 w-48 dark:bg-dark-950" />
      </div>
      {/* View Bar */}
      <div className="flex flex-row justify-between items-end">
        <Skeleton className="h-12 w-24 rounded-md dark:bg-dark-950" />
      </div>
      {/* List View */}
      <div className="flex flex-row gap-3 relative items-stretch h-full">
        {/* List  */}
        <div className="w-full">
          {LIST_MODE && (
            <motion.ul
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="flex flex-col gap-3 w-full"
            >
              {Array.from({ length: 9 }, (_, i) => i)?.map((i) => (
                <ListItemSkeleton key={i} />
              ))}
            </motion.ul>
          )}
          {GRID_MODE && (
            <motion.ul
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              className="flex flex-row gap-3 w-full flex-wrap"
            >
              {Array.from({ length: 9 }, (_, i) => i)?.map((i) => (
                <GridItemSkeleton key={i} />
              ))}
            </motion.ul>
          )}
        </div>
        {/* Toolbar */}
        <div className="min-w-76 h-96 bg-card dark:bg-dark-card  rounded-xl  shadow-[0_2px_12px_rgba(0,0,0,0.05)]  sticky top-[4.5rem] flex flex-col gap- self-stretch">
          <div className="p-3 flex flex-col gap-4 mb-auto">
            <Skeleton className="h-12 w-full dark:bg-dark-background" />

            <div className="flex flex-row gap-3 w-full items-end">
              <Skeleton className="h-12 w-full dark:bg-dark-background" />
              <Skeleton className="h-12 w-full dark:bg-dark-background" />
            </div>
            <Skeleton className="h-12 w-full dark:bg-dark-background" />
            <Skeleton className="h-12 w-full dark:bg-dark-background" />
          </div>
          <Skeleton className="h-17 rounded-xl rounded-t-none dark:bg-dark-background" />
        </div>
      </div>
      <div className="flex flex-row mr-auto rtl:mr-0 rtl:ml-auto py-6 gap-2">
        <Skeleton className="h-10 w-10 rounded-xl dark:bg-dark-card" />
        <Skeleton className="h-10 w-10 rounded-xl dark:bg-dark-card" />
        <Skeleton className="h-10 w-10 rounded-xl dark:bg-dark-card" />
        <Skeleton className="h-10 w-10 rounded-xl dark:bg-dark-card" />
        <Skeleton className="h-10 w-10 rounded-xl dark:bg-dark-card" />
        <Skeleton className="h-10 w-10 rounded-xl dark:bg-dark-card" />
      </div>
    </div>
  );
}

export function DetailsSkeletonView() {
  return (
    <div className="h-full dark:bg-dark-card flex flex-col">
      {/* Details Header */}
      <div className="bg-emerald-600 h-1/8 p-6 flex flex-row gap-3">
        <Skeleton className="h-full aspect-square rounded-full bg-emerald-800" />
        <div className="flex-1 ">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row items-center gap-3">
              <Skeleton className="w-24 h-6 bg-emerald-800" />
              <Skeleton className="w-12 h-4 bg-emerald-800" />
            </div>

            <Skeleton className="w-48 h-3 bg-emerald-800" />
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 ">
          <Skeleton className="w-36 h-12 rounded-xl bg-emerald-800" />
          <Skeleton className="w-36 h-12 rounded-xl bg-emerald-800" />
        </div>
      </div>
      {/* Details Content */}
      <div className="relative flex-1 width-full">
        <div className="h-full absolute overflow-y-auto w-full ">
          <div className="p-3 flex flex-col gap-6 dark:bg-dark-card w-full ">
            <div className="flex flex-row gap-3 w-full ">
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-24 dark:bg-dark-975" />
                <Skeleton className="h-3 w-48 dark:bg-dark-975" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-24 dark:bg-dark-975" />
                <Skeleton className="h-3 w-48 dark:bg-dark-975" />
              </div>
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-5 w-24 dark:bg-dark-975" />
              <Skeleton className="h-3 w-48 dark:bg-dark-975" />
            </div>
            <div className="">
              <Skeleton className="h-5 w-24 mb-3 dark:bg-dark-975" />
              <ul className="flex flex-col gap-3">
                <Skeleton className="h-12 w-full rounded-xl dark:bg-dark-975" />
                <Skeleton className="h-12 w-full rounded-xl dark:bg-dark-975" />
                <Skeleton className="h-12 w-full rounded-xl dark:bg-dark-975" />
                <Skeleton className="h-12 w-full rounded-xl dark:bg-dark-975" />
              </ul>
            </div>
            <div className="flex flex-row gap-3">
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-24 dark:bg-dark-975" />
                <Skeleton className="h-3 w-48 dark:bg-dark-975" />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <Skeleton className="h-5 w-24 dark:bg-dark-975" />
                <Skeleton className="h-3 w-48 dark:bg-dark-975" />
              </div>
            </div>
            <div className="">
              <Skeleton className="h-5 w-24 mb-3 dark:bg-dark-975" />

              <div className="flex flex-row gap-3 flex-wrap">
                {[1, 2, 3, 4]?.map((user) => (
                  <div
                    key={user}
                    className="flex w-[calc(50%_-_12px)] gap-3 flex-row shrink-0"
                  >
                    <Skeleton className="h-14 w-14 rounded-full dark:bg-dark-975" />
                    <div className="flex flex-row flex-1 justify-between">
                      <div className="flex flex-col gap-3">
                        <Skeleton className="h-4 w-24 dark:bg-dark-975" />
                        <Skeleton className="h-3 w-48 dark:bg-dark-975" />
                      </div>
                      <Skeleton className="h-12 w-32 rounded-full dark:bg-dark-975" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
