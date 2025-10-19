"use client";
import EllipsisTypography from "@/components/ellipsis-typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";

export default function ListTableRow({ role }: { role: any }) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const locale = useLocale();
  const t = useTranslations();
  const isRtl = locale === "ar";
  return (
    <li
      key={role?.id}
      className="bg-card w-full h-24 rounded-xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-row items-center gap-3 "
    >
      <Icon
        icon="qlementine-icons:user-16"
        className="h-[4.5rem] w-[4.5rem] text-border"
      />
      <div className="flex flex-col gap-1 w-3/6">
        <p className="font-semibold text-black">
          {role?.[isRtl ? "nameAr" : "nameEn"]}
        </p>
        <div className="flex flex-row gap-3">
          <Badge
            className={cn(
              "bg-emerald-600 capitalize",
              role?.status === "INACTIVE" && "bg-rose-800"
            )}
          >
            {t(`COMMON.${role?.status}`)}
          </Badge>
          <EllipsisTypography className="text-muted-foreground">
            {role?.[isRtl ? "descriptionAr" : "descriptionEn"]}
          </EllipsisTypography>
        </div>
      </div>
      <Separator orientation="vertical" />
      <div className="flex flex-row gap-8 ">
        <div>
          <p className="font-semibold text-black text-sm">
            {t("ROLES_MANAGEMENT.USERS_COUNT")}
          </p>
          <p className="text-muted-foreground">{role?.usersCount}</p>
        </div>
        <div>
          <p className="font-semibold text-black text-sm">
            {t("ROLES_MANAGEMENT.PERMISSIONS_COUNT")}
          </p>
          <p className="text-muted-foreground">{role?.permissionsCount}</p>
        </div>
      </div>
      <Popover
        onOpenChange={(open) => {
          if (open) {
            setShowOptions(true);
          } else {
            setShowOptions(false);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            onClick={() => setShowOptions((prev) => !prev)}
            className={cn(
              "h-12 w-12  ml-auto rtl:mr-auto rtl:ml-0 bg-transparent rounded-xl border-2",
              showOptions &&
                "rotate-90 bg-emerald-600 text-white border-transparent "
            )}
          >
            <Icon
              icon="ri:more-fill"
              className={cn(
                "text-gray-500 h-6! w-6!",
                showOptions && " text-white"
              )}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          side={isRtl ? "right" : "left"}
          className="rounded-xl p-0 overflow-hidden"
        >
          <ul className="">
            <li className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300 ">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100  transition-all group-hover:bg-emerald-700 aspect-square">
                <Icon
                  icon="mdi:eye-outline"
                  className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <p className="text-sm text-black transition-all group-hover:text-white font-semibold">
                  {t("COMMON.DETAILS_TITLE", {
                    ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t("COMMON.DETAILS_SUBTITLE", {
                    ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
              </div>
            </li>
            <Separator />
            <li className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300">
              <div className="h-12 w-12 rounded-lg aspect-square flex items-center justify-center bg-gray-100  transition-all group-hover:bg-emerald-700">
                <Icon
                  icon="material-symbols:check-rounded"
                  className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <p className="text-sm text-black transition-all group-hover:text-white font-semibold">
                  {t("COMMON.ACTIVATE_TITLE", {
                    ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t("COMMON.ACTIVATE_SUBTITLE", {
                    ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
              </div>
            </li>
            <Separator />
            <li className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300">
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100  transition-all group-hover:bg-emerald-700 aspect-square">
                <Icon
                  icon="iconamoon:edit-thin"
                  className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300"
                />
              </div>
              <div>
                <p className="text-sm text-black transition-all group-hover:text-white font-semibold">
                  {t("COMMON.EDIT_TITLE", {
                    ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t("COMMON.EDIT_SUBTITLE", {
                    ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
              </div>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </li>
  );
}
