"use client";
import TableHeadCustom, {
  TableHeadColumn,
} from "@/components/table-head-custom";
import { Table, TableBody, TableSkeleton } from "@/components/ui/table";
import { useLocale, useTranslations } from "next-intl";
import MyOrdersTableRow from "../table-row";
import { useGetMyOrders } from "@/api/orders";
import { TablePagination } from "@/components/ui/tabs";

export function MyOrdersListView() {
  const t = useTranslations();
  const locale = useLocale();
  const { orders, ordersLoading, ordersResults } = useGetMyOrders();
  console.log(orders);
  const TABLE_HEAD: TableHeadColumn[] = [
    { id: "id", label: t("MY_ORDERS.ID") },
    {
      id: "items",
      label: t("MY_ORDERS.ITEMS"),
      props: {
        className: "text-center!",
      },
    },
    {
      id: "createdAt",
      label: t("MY_ORDERS.PURCHASING_DATE"),
      props: { className: "text-center! text-middle" },
    },
    {
      id: "status",
      label: t("MY_ORDERS.STATUS"),
      props: { className: "text-center!" },
    },
    {
      id: "total",
      label: t("MY_ORDERS.TOTAL"),
      props: { className: "text-center!" },
    },
    {
      id: "action",
      label: "",
      props: { className: "text-center!" },
    },
  ];

  return (
    <div className="">
      {!ordersLoading && (
        <>
          <Table>
            <TableHeadCustom columns={TABLE_HEAD} />
            <TableBody>
              {orders?.map((order) => (
                <MyOrdersTableRow order={order} key={order?._id} />
              ))}
            </TableBody>
          </Table>
          <div
            className="py-4 flex items-start mx-0 flex-row-reverse"
            dir={locale === "ar" ? "rtl" : "ltr"}
          >
            <TablePagination
              totalNoOfRows={ordersResults}
              // rowsPerPage={size ? parseInt(size) : 20}
              rowsPerPage={9}
              // currentPage={page ? parseInt(page) : 1}
              currentPage={1}
            />
          </div>
        </>
      )}
      {ordersLoading && <TableSkeleton columns={TABLE_HEAD} />}
    </div>
  );
}
