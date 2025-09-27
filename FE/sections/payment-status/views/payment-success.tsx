import { Separator } from "@/components/ui/separator";
import { Order } from "@/types/orders";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getLocale, getTranslations } from "next-intl/server";

export default async function PaymentSuccess({ order }: { order: Order }) {
  const t = await getTranslations();
  const locale = await getLocale();
  return (
    <div className=" flex items-center justify-center flex-col gap-4 ">
      <div className="h-64 w-64 flex items-center justify-center relative shrink-0">
        <div className="bg-green-500/10 rounded-full aspect-square h-36 w-36 flex items-center justify-center ">
          <div className="bg-green-500/5 h-60 w-60 absolute -z-10 rounded-full " />
          <div className="bg-green-500 rounded-full aspect-square h-24 w-24 flex items-center justify-center">
            <Icon icon="ic:round-check" className="h-16 w-16 text-white" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center mb-4">
        <h3 className="text-2xl font-semibold">
          {t("PAYMENT_STATUS.PAYMENT_SUCCESS")}
        </h3>
        <p className=" font-semibold text-gray-500">
          {t("PAYMENT_STATUS.PAYMENT_SUCCESS_SUBTITLE")}
        </p>
      </div>
      <div className="bg-white drop-shadow-sm w-full min-h-36 rounded-md p-6 max-w-256 flex ">
        <div className="flex flex-col gap-4 w-full">
          <div className="flex justify-between flex-row">
            <p className="text-gray-600">
              {t("PAYMENT_STATUS.TRANSACTION_DATE")}
            </p>
            <p className="font-semibold text-black">
              {new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
                weekday: "long",
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date(order?.createdAt ?? ""))}
            </p>
          </div>
          {/* <div className="flex justify-between flex-row">
            <p className="text-gray-600">
              {t("PAYMENT_STATUS.PAYMENT_METHOD")}
            </p>
            <p className="font-semibold text-black">
              {t("PAYMENT_STATUS.CARD_ENDING_WITH", {
                LAST_DIGITS: "123",
              })}
            </p>
          </div> */}
          <div className="flex justify-between flex-row">
            <p className="text-gray-600">
              {t("PAYMENT_STATUS.DEILVERY_ADDRESS")}
            </p>
            <p className="font-semibold text-black truncate">
              {order?.shippingDetails?.country} -{" "}
              {order?.shippingDetails?.state} - {order?.shippingDetails?.city} -{" "}
              {order?.shippingDetails?.line1}
            </p>
          </div>
          <div className="flex justify-between flex-row">
            <p className="text-gray-600">{t("PAYMENT_STATUS.DELIVERY_TIME")}</p>
            <p className="font-semibold text-black">
              {t("PAYMENT_STATUS.DELIVERY_DURATION", {
                START_DATE: "2",
                END_DATE: "4",
              })}
            </p>
          </div>
          <Separator />
          <div className="flex justify-between flex-row">
            <p className="text-gray-600 text-lg">
              {t("PAYMENT_STATUS.TOTAL_PAID")}
            </p>
            <p className="font-semibold text-black text-2xl">
              {t("COMMON.EGP", {
                price: new Intl.NumberFormat("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(order?.total),
              })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
