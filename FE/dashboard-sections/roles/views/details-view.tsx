"use client";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";

const role = {
  _id: "Xnjgsdddd_1",
  nameAr: "مساعد صيدلي",
  nameEn: "Pharmacist Assistant",
  descriptionEn:
    "The employee responsible for managing all aspects of procurement and supplies, including handling purchasing activities from both internal and external suppliers, ensuring the timely and high-quality availability of materials.",
  descriptionAr:
    "الموظف المسؤول عن جميع شئون التوريدات من الموردين الداخليين أو الخارجيين، وضمان توافر المستلزمات في الوقت المناسب وبأفضل جودة ممكنة.",
  status: "ACTIVE",
  permissionsCount: 22,
  usersCount: 12,
};
export default function DetailsView() {
  const locale = useLocale();
  const t = useTranslations();
  return (
    <div className="h-full">
      {/* Details Header */}
      <div className="bg-emerald-600 h-1/8 p-6 flex flex-row gap-3">
        <div className="h-full w-fit">
          <Icon
            icon="qlementine-icons:user-16"
            className="h-full w-full text-emerald-700"
          />
        </div>
        <div className="flex-1">
          <div>
            <h3 className="text-xl font-bold text-white flex flex-row items-center gap-3">
              {locale === "ar" ? role?.nameAr : role?.nameEn}
              <span className="text-xs font-semibold text-white bg-emerald-800 px-2 py-1 rounded-full">
                {t(`COMMON.${role?.status}`)}
              </span>
            </h3>
            <p className="text-input">{`${t(
              "ROLES_MANAGEMENT.PERMISSIONS_CNT",
              { count: 9 }
            )} - ${t("ROLES_MANAGEMENT.USERS_WITH_PERMISSIONS", {
              count: 0,
            })}`}</p>
          </div>
        </div>
        <div>
          <Button variant="ghost" className="border-2 border-white text-white">
            <Icon icon="iconamoon:edit-light" />
            {t("COMMON.EDIT_TITLE", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
            })}
          </Button>
        </div>
      </div>
    </div>
  );
}
