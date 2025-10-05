import { TableHeader, TableRow, TableHead } from "./ui/table";
import { DetailedHTMLProps, HTMLAttributes, ThHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type TableHeadColumn = {
  id: string;
  label: string;
  props?: DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableHeaderCellElement>,
    HTMLTableHeaderCellElement
  >;
};
export type TableHeadProps = {
  columns: TableHeadColumn[];
} & DetailedHTMLProps<HTMLAttributes<HTMLTableRowElement>, HTMLTableRowElement>;
export default function TableHeadCustom({ columns, ...other }: TableHeadProps) {
  return (
    <TableHeader>
      <TableRow
        {...other}
        className={cn(
          "h-12 bg-gray-200 hover:bg-gray-200 dark:bg-agzakhana-primary",
          other.className
        )}
      >
        {columns?.map((column) => (
          <TableHead
            {...column?.props}
            className={cn(
              "w-[100px] rtl:text-right font-bold text-gray-600 dark:text-gray-800 ",
              column?.props?.className
            )}
            key={column?.id}
          >
            {column?.label}
          </TableHead>
        ))}
      </TableRow>
    </TableHeader>
  );
}
