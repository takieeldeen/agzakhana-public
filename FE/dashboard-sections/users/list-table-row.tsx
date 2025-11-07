"use client";
import { Role, RoleListItem } from "@/app/dashboard-types/roles";
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
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { UserListItem } from "@/app/dashboard-types/users";
import Image from "next/image";

export default function ListTableRow({
  data,
  onActivateRow,
  onEditRole,
  onDeleteRow,
}: {
  data: UserListItem;
  onActivateRow: (role: RoleListItem) => void;
  onEditRole: (roleId: string) => void;
  onDeleteRow: (role: Role | RoleListItem) => void;
}) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const locale = useLocale();
  const t = useTranslations();
  const isRtl = locale === "ar";
  return (
    <motion.li
      layout="position"
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring" }}
      key={data?._id}
      className="bg-card w-full min-h-24 rounded-xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-row items-center gap-3 dark:bg-dark-card"
    >
      <div className="relative h-[4.5rem] w-[4.5rem] rounded-full overflow-hidden bg-gray-200 dark:bg-dark-background">
        <Image
          src={data?.imageUrl}
          alt={locale === "ar" ? data?.nameAr : data?.nameEn}
          fill
          className="object-fill"
        />
      </div>

      <div className="flex flex-col gap-1 w-3/6">
        <p className="font-semibold text-black dark:text-white">
          {data?.[isRtl ? "nameAr" : "nameEn"]}
        </p>
        <div className="flex flex-row items-start gap-3">
          <Badge
            className={cn(
              "bg-emerald-600 capitalize dark:text-white",
              data?.status === "INACTIVE" && "bg-rose-800"
            )}
          >
            {t(`COMMON.${data?.status}`)}
          </Badge>
          <EllipsisTypography className="text-muted-foreground font-semibold max-w-fit">
            {data?.email}
          </EllipsisTypography>
          <ul className="flex flex-row gap-2 w-full flex-wrap">
            {data?.roles?.length > 0 &&
              data?.roles?.map((role) => (
                <Badge
                  key={role?._id}
                  className="bg-transparent border-2 border-emerald-700 text-emerald-700 dark:border-emerald-600 dark:text-emerald-600 font-semibold rounded-full"
                >
                  {locale === "ar" ? role?.nameAr : role?.nameEn}
                </Badge>
              ))}
          </ul>
        </div>
      </div>
      <Separator className="md:block hidden" orientation="vertical" />
      <div className="flex-row gap-8 hidden md:flex flex-1">
        <div className="flex-1">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.JOINING_DATE")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground">
            {data?.joiningDate
              ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
                  weekday: "long",
                  month: "long",
                  day: "2-digit",
                  year: "numeric",
                }).format(new Date(data?.joiningDate))
              : t("COMMON.UNKOWN")}
          </EllipsisTypography>
        </div>
        <div className="flex-1">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.BRANCH")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground">
            {data?.branch?.[locale === "ar" ? "nameAr" : "nameEn"] ??
              t("COMMON.UNKOWN")}
          </EllipsisTypography>
        </div>
        <div className="flex-1">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.GENDER")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground">
            {data?.branch?.[locale === "ar" ? "nameAr" : "nameEn"] ??
              t(`PROFILE.${data?.gender}`)}
          </EllipsisTypography>
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
          className="rounded-xl p-0 overflow-hidden dark:bg-dark-card"
        >
          <ul className="">
            <li>
              <Link
                className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300 "
                href={`users/${data?._id}`}
              >
                <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-900 transition-all group-hover:bg-emerald-700 group-hover:dark:bg-emerald-700   aspect-square">
                  <Icon
                    icon="mdi:eye-outline"
                    className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300 dark:text-gray-200"
                  />
                </div>
                <div>
                  <p className="text-sm text-black dark:text-gray-200 transition-all group-hover:text-white font-semibold">
                    {t("COMMON.DETAILS_TITLE", {
                      ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                    {t("COMMON.DETAILS_SUBTITLE", {
                      ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                    })}
                  </p>
                </div>
              </Link>
            </li>
            <Separator />
            <li
              onClick={() => onActivateRow(data)}
              className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-900 transition-all group-hover:bg-emerald-700 group-hover:dark:bg-emerald-700   aspect-square">
                <Icon
                  icon={
                    data?.status === "ACTIVE"
                      ? "maki:cross"
                      : "material-symbols:check-rounded"
                  }
                  className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300 dark:text-gray-200"
                />
              </div>
              <div>
                <p className="text-sm text-black dark:text-gray-200 transition-all group-hover:text-white font-semibold">
                  {t(
                    data?.status === "ACTIVE"
                      ? "COMMON.DEACTIVATE_TITLE"
                      : "COMMON.ACTIVATE_TITLE",
                    {
                      ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                    }
                  )}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t(
                    data?.status === "ACTIVE"
                      ? "COMMON.DEACTIVATE_SUBTITLE"
                      : "COMMON.ACTIVATE_SUBTITLE",
                    {
                      ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                    }
                  )}
                </p>
              </div>
            </li>
            <Separator />
            <li
              onClick={() => onEditRole(data?._id)}
              className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-900 transition-all group-hover:bg-emerald-700 group-hover:dark:bg-emerald-700   aspect-square">
                <Icon
                  icon="iconamoon:edit-thin"
                  className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300 dark:text-gray-200"
                />
              </div>
              <div>
                <p className="text-sm text-black dark:text-gray-200 transition-all group-hover:text-white font-semibold">
                  {t("COMMON.EDIT_TITLE", {
                    ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t("COMMON.EDIT_SUBTITLE", {
                    ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
              </div>
            </li>
            <Separator />
            <li
              onClick={() => onDeleteRow(data)}
              className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-rose-800 group transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-900 transition-all group-hover:bg-rose-900 group-hover:dark:bg-rose-900   aspect-square">
                <Icon
                  icon="ion:trash-outline"
                  className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300 dark:text-gray-200"
                />
              </div>
              <div>
                <p className="text-sm text-black dark:text-gray-200 transition-all group-hover:text-white font-semibold">
                  {t("COMMON.REMOVE_TITLE", {
                    ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t("COMMON.REMOVE_SUBTITLE", {
                    ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
              </div>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </motion.li>
  );
}
