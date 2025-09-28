"use client";
import TableHeadCustom, {
  TableHeadColumn,
} from "@/components/table-head-custom";
import { Table, TableBody } from "@/components/ui/table";
import { useTranslations } from "next-intl";
import MyOrdersTableRow from "../table-row";
import { useGetMyOrders } from "@/api/orders";

export function MyOrdersListView() {
  const t = useTranslations();
  const { orders, ordersLoading } = useGetMyOrders();
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
      <Table>
        <TableHeadCustom columns={TABLE_HEAD} />
        <TableBody>
          {orders?.map((order) => (
            <MyOrdersTableRow order={order} key={order?._id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
