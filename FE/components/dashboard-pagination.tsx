import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
export default function DashboardPagination({}) {
  const [activePage, setActivePage] = useState<number>(1);
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href="#"
            className={cn(
              "bg-gray-200 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100"
            )}
            onClick={() => setActivePage(activePage - 1)}
          >
            <Icon icon="tabler:chevron-left" />
          </PaginationLink>
        </PaginationItem>
        {Array.from({ length: 10 }, (_, i) => i).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              className={cn(
                "bg-gray-200 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100",
                activePage === page + 1 &&
                  "bg-emerald-600 text-white hover:bg-emerald-700 hover:text-white"
              )}
              onClick={() => setActivePage(page + 1)}
            >
              {1 + page}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationLink
            href="#"
            className={cn(
              "bg-gray-200 rounded-xl font-semibold transition-all duration-300 hover:bg-gray-100"
            )}
            onClick={() => setActivePage(activePage + 1)}
          >
            <Icon icon="tabler:chevron-right" />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
