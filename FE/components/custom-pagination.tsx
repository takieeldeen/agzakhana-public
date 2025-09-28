"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { cn } from "@/lib/utils";
import { ComponentProps, useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export type TablePaginationProps = {
  totalNoOfRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange?: (newPage: number) => void;
  navButtonProps?: ComponentProps<"button">;
  pageItemProps?: ComponentProps<"button">;
  navContainerProps?: ComponentProps<"ul">;
} & ComponentProps<"div">;
export default function CustomPagination({
  totalNoOfRows,
  rowsPerPage,
  currentPage,
  onPageChange,
  navButtonProps,
  pageItemProps,
  ...containerProps
}: TablePaginationProps) {
  // Helper Constants ////////////////////////////////////
  const totalNoOfPages = Math.ceil(totalNoOfRows / rowsPerPage);
  const pageWindow = 2;
  const pageArray: string[] = ["1"];
  const leftWindow = Math.max(2, currentPage - pageWindow);
  const rightWindow = Math.min(totalNoOfPages - 1, currentPage + pageWindow);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage >= totalNoOfPages;
  if (leftWindow > 2) pageArray.push("...");
  for (let i = leftWindow; i <= rightWindow; i++) {
    pageArray.push(`${i}`);
  }
  if (rightWindow < totalNoOfPages - 1) pageArray.push("...");
  if (totalNoOfPages > 1) pageArray.push(`${totalNoOfPages}`);
  // Custom Hooks /////////////////////////////////////////////
  const searchParams = useSearchParams();
  const router = useRouter();
  // Callbacks ////////////////////////////////////////////////
  const handlePageChange = useCallback(
    (newPage: number, replace: boolean = false) => {
      if (onPageChange) onPageChange(newPage);
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router?.[replace ? "replace" : "push"](`?${params.toString()}`);
    },
    [onPageChange, router, searchParams]
  );
  // LifeCycleHooks ////////////////////////////////////////////////
  useEffect(() => {
    if (!searchParams.get("page") && !searchParams.get("size")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("size", rowsPerPage.toString());
      params.set("page", "1");
      router?.replace(`?${params.toString()}`);
    } else if (!searchParams.get("page")) {
      handlePageChange(1, true);
    } else if (!searchParams.get("size")) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("size", rowsPerPage.toString());
      router?.replace(`?${params.toString()}`);
    }
  }, [searchParams, handlePageChange, rowsPerPage, router]);
  if (totalNoOfRows === 0 && totalNoOfRows > (rowsPerPage ? rowsPerPage : 20))
    return null;
  return (
    <Pagination
      {...containerProps}
      className={cn("gap-3", containerProps?.className)}
    >
      <Button
        {...navButtonProps}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className={cn(
          " text-white hover:bg-card-dark-bg transition-all transition-300 aspect-square cursor-pointer  bg-text-primary",
          navButtonProps?.className
        )}
      >
        <Icon icon="mi:chevron-left" className="rtl:rotate-180" />
      </Button>
      <PaginationContent className="gap-2">
        {pageArray.map((pageNumber, i) => (
          <PaginationItem key={i}>
            <Button
              {...pageItemProps}
              onClick={() =>
                pageNumber !== "..." && handlePageChange(+pageNumber)
              }
              className={cn(
                "bg-[#BCE3C9] text-text-primary dark:text-modal-dark cursor-pointer  hover:bg-card-dark-bg hover:text-modal-dark transition-all transition-300",
                pageNumber === `${currentPage}` &&
                  "bg-agzakhana-primary dark:bg-neon text-white !dark:text-modal-dark-background font-bold hover:brightness-85 dark:hover:bg-neon",
                pageNumber === "..." &&
                  "hover:bg-transparent hover:dark:text-modal-dark cursor-default",
                pageItemProps?.className
              )}
            >
              {pageNumber}
            </Button>
          </PaginationItem>
        ))}
      </PaginationContent>
      <Button
        {...navButtonProps}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className={cn(
          "text-white hover:bg-card-dark-bg transition-all transition-300 aspect-square cursor-pointer bg-text-primary",
          navButtonProps?.className
        )}
      >
        <Icon icon="mi:chevron-left" className="ltr:rotate-180" />
      </Button>
    </Pagination>
  );
}
