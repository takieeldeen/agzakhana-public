"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";
import TableHeadCustom, { TableHeadColumn } from "../table-head-custom";
import { Skeleton } from "./skeleton";
import { Icon } from "@iconify/react/dist/iconify.js";

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto px-2"
    >
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm ", className)}
        {...props}
      />
    </div>
  );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
}

function TableNoData() {
  const t = useTranslations();
  return (
    <TableCell
      colSpan={12}
      className="font-medium max-w-64 h-128 bg-filter-background truncate text-center"
    >
      <div className="h-full w-full flex items-center justify-center flex-col gap-2">
        <Icon
          icon="hugeicons:folder-02"
          className="h-32 w-32 text-gray-600/40"
        />
        <p className="text-2xl font-semibold text-gray-300">
          {t("COMMON.NO_DATA")}
        </p>
      </div>
    </TableCell>
  );
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "bg-muted/50 border-t font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  );
}

function TableRow({
  className,
  children,
  ...props
}: React.ComponentProps<"tr">) {
  const locale = useLocale();
  const isRtl = locale === "ar";

  let localizedChildren = children;

  // More robust array checking and handling
  if (isRtl && children) {
    if (Array.isArray(children)) {
      localizedChildren = [...children].reverse();
    } else {
      // Single child case - no need to reverse
      localizedChildren = children;
    }
  }

  return (
    <tr
      data-slot="table-row"
      className={cn(
        "hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors rtl:text-right ltr:text-left",
        className
      )}
      {...props}
    >
      {localizedChildren}
    </tr>
  );
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  );
}

function TableCaption({
  className,
  ...props
}: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("text-muted-foreground mt-4 text-sm", className)}
      {...props}
    />
  );
}

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
  TableNoData,
};

export function TableSkeleton({ columns }: { columns: TableHeadColumn[] }) {
  return (
    <Table>
      <TableHeadCustom columns={columns} />
      <TableBody>
        {Array.from({ length: 9 }, (_, i) => i).map((el) => (
          <TableRow key={el}>
            <TableCell colSpan={12}>
              <div className="flex flex-row items-center gap-12 rtl:flex-row-reverse justify-between">
                <Skeleton className="h-12 w-12 rounded-full" />
                <Skeleton className="h-4 w-32 rounded-full" />
                <Skeleton className="h-4 w-46 rounded-full" />
                <Skeleton className="h-4 w-24 rounded-full" />
                <Skeleton className="h-4 w-22 rounded-full" />
                <Skeleton className="h-4 w-36 rounded-full" />
                <Skeleton className="h-8 w-18 rounded-md" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
