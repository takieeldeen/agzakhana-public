import { Icon } from "@iconify/react/dist/iconify.js";
import { getTranslations } from "next-intl/server";

export default async function PaymentSuccess() {
  const t = await getTranslations();
  return (
    <div className="h-96 flex items-center justify-center flex-col gap-4">
      <div className="bg-green-200 rounded-full aspect-square h-48 w-48 flex items-center justify-center ">
        <div className="bg-green-500 rounded-full aspect-square h-24 w-24 flex items-center justify-center">
          <Icon icon="ic:round-check" className="h-16 w-16 text-white" />
        </div>
      </div>
      <div className="flex flex-col gap-1 items-center">
        <h3 className="text-2xl font-semibold">
          {t("PAYMENT_STATUS.PAYMENT_SUCCESS")}
        </h3>
        <p className="text-lg font-semibold text-gray-600">
          {t("PAYMENT_STATUS.PAYMENT_SUCCESS")}
        </p>
      </div>
    </div>
  );
}
