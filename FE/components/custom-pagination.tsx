"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { Pagination, PaginationContent, PaginationItem } from "./ui/pagination";
import { cn } from "@/lib/utils";
import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface TablePaginationProps {
  totalNoOfRows: number;
  rowsPerPage: number;
  currentPage: number;
  onPageChange?: (newPage: number) => void;
}
export default function CustomPagination({
  totalNoOfRows,
  rowsPerPage,
  currentPage,
  onPageChange,
}: TablePaginationProps) {
  // Helper Constants ////////////////////////////////////
  const totalNoOfPages = Math.ceil(totalNoOfRows / rowsPerPage);
  const pageWindow = 2;
  const pageArray: string[] = ["1"];
  const leftWindow = Math.max(2, currentPage - pageWindow);
  const rightWindow = Math.min(totalNoOfPages - 1, currentPage + pageWindow);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalNoOfPages;
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
  const handlePageChange = useCallback((newPage: number) => {
    if (onPageChange) onPageChange(newPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`?${params.toString()}`);
  }, []);
  return (
    <Pagination className="gap-3">
      <Button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={isFirstPage}
        className=" text-white hover:bg-card-dark-bg transition-all transition-300 aspect-square cursor-pointer  bg-text-primary"
      >
        <Icon icon="mi:chevron-left" className="rtl:rotate-180" />
      </Button>
      <PaginationContent className="gap-2">
        {pageArray.map((pageNumber, i) => (
          <PaginationItem key={i}>
            <Button
              onClick={() =>
                pageNumber !== "..." && handlePageChange(+pageNumber)
              }
              className={cn(
                "bg-[#BCE3C9] text-text-primary dark:text-modal-dark cursor-pointer  hover:bg-card-dark-bg hover:text-modal-dark transition-all transition-300",
                pageNumber === `${currentPage}` &&
                  "bg-agzakhana-primary dark:bg-neon text-white !dark:text-modal-dark-background font-bold hover:brightness-85 dark:hover:bg-neon",
                pageNumber === "..." &&
                  "hover:bg-transparent hover:dark:text-modal-dark cursor-default"
              )}
            >
              {pageNumber}
            </Button>
          </PaginationItem>
        ))}
      </PaginationContent>
      <Button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={isLastPage}
        className=" text-white hover:bg-card-dark-bg transition-all transition-300 aspect-square cursor-pointer bg-text-primary"
      >
        <Icon icon="mi:chevron-left" className="ltr:rotate-180" />
      </Button>
    </Pagination>
  );
}
