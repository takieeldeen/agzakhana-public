import Collapse from "@/components/collapse";
import { Button } from "@/components/ui/button";
import { TableRow, TableCell } from "@/components/ui/table";
import { ORDERS_VARIANTS_STYLES } from "@/constants/ORDERS";
import { cn } from "@/lib/utils";
import { Order } from "@/types/orders";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";

export default function MyOrdersTableRow({ order }: { order: Partial<Order> }) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const locale = useLocale();
  const t = useTranslations();
  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{order?._id}</TableCell>
        <TableCell className="text-center">{order.items?.length}</TableCell>
        <TableCell className="text-center">
          {order?.createdAt
            ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(order?.createdAt))
            : "غير معروف"}
        </TableCell>
        <TableCell className="text-center">
          <span
            className={cn(
              (ORDERS_VARIANTS_STYLES as any)?.[order?.status ?? ""]
            )}
          >
            {order.status ? t(`MY_ORDERS.${order.status}`) : "غير معروف"}
          </span>
        </TableCell>
        <TableCell className="text-center font-semibold">
          {t("COMMON.EGP", {
            price: new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            })
              .format(order?.total ?? 0)
              ?.toString(),
          })}
        </TableCell>
        <TableCell className="text-center font-semibold">
          <Button
            className="bg-gray-200 w-8 h-8 rounded-full"
            onClick={() => setCollapsed((prev) => !prev)}
          >
            <Icon
              icon="mynaui:chevron-down"
              className={cn(
                "text-primary w-5! h-5! transition-all duration-300",
                collapsed && "-rotate-180"
              )}
            />
          </Button>
        </TableCell>
      </TableRow>
      <TableRow className="border-0">
        <TableCell className="font-medium relative p-0" colSpan={6}>
          <Collapse collapsed={collapsed} className="p-2 bg-gray-200">
            <ul className="bg-gray-100 rounded-md p-2">
              {order?.items?.map((order) => (
                <li
                  key={order?.productId ?? order?.dealId}
                  className="flex flex-row rtl:flex-row-reverse gap-2 p-2 border-b-[1] border-b-gray-200 items-center"
                >
                  <div className="h-16 w-16 relative">
                    <Image
                      src={order?.imageUrl}
                      fill
                      alt={locale === "ar" ? order?.nameAr : order?.nameEn}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col justify-between h-full w-full self-start">
                    <p className="text-base">
                      {locale === "ar" ? order?.nameAr : order?.nameEn}
                    </p>
                    <p className="text-gray-500 text-xs">
                      {order?.productId ?? order?.dealId}
                    </p>
                  </div>
                  <p className="min-w-24 text-center">x{order?.qty}</p>
                  <p className="min-w-24 text-start w-fit font-semibold text-base">
                    {t("COMMON.EGP", {
                      price: new Intl.NumberFormat(
                        locale === "ar" ? "ar-EG" : "en-US",
                        { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                      ).format(order?.price ?? 0),
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
