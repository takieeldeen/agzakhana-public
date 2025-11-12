"use client";
import { Role, RoleListItem } from "@/app/dashboard-types/roles";
import { User, UserListItem } from "@/app/dashboard-types/users";
import EllipsisTypography from "@/components/ellipsis-typography";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

export default function GridTableRow({
  data,
  onActivateRow,
  onEditRole,
  onDeleteRow,
}: {
  data: UserListItem;
  onActivateRow: (user: UserListItem) => void;
  onEditRole: (userId: string) => void;
  onDeleteRow: (user: User | UserListItem) => void;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const isRtl = locale === "ar";
  return (
    <li
      key={data?._id}
      className="bg-card w-full md:w-128 md:min-w-76 md:max-w-[calc(33%_-_12px)] md:aspect-square overflow-hidden  rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col items-center gap-3 dark:bg-dark-card "
    >
      <div className="bg-teal-600 dark:bg-teal-800 w-full h-24 md:max-h-24 md:min-h-[calc(31%)] flex flex-row gap-3 items-center px-3">
        <div className="relative min-h-3/4 w-auto h-[4.5rem] aspect-square  rounded-full overflow-hidden bg-gray-200 dark:bg-dark-background">
          <Image
            src={data?.imageUrl}
            alt={locale === "ar" ? data?.nameAr : data?.nameEn}
            fill
            className="object-fill"
          />
        </div>
        <div>
          <p className="text-primary-foreground xl:text-xl dark:text-white">
            {data?.[isRtl ? "nameAr" : "nameEn"]}
          </p>
          <Badge className={cn("bg-teal-700 capitalize dark:text-white")}>
            {t(`COMMON.${data?.status}`)}
          </Badge>
        </div>
      </div>
      <div className="flex flex-row item-center w-full">
        <div className="flex flex-col gap-1 px-3 items-start  w-full">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.EMAIL_ADDRESS")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground" maxLines={3}>
            {data?.email}
          </EllipsisTypography>
        </div>
        <div className="flex flex-col gap-1 px-3 items-start  w-full">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.GENDER")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground" maxLines={3}>
            {t(`PROFILE.${data?.gender}`)}
          </EllipsisTypography>
        </div>
      </div>
      <div className="flex flex-row item-center w-full">
        <div className="flex flex-col gap-1 px-3 items-start  w-full">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.BRANCH")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground" maxLines={3}>
            {data?.branch?.[locale === "ar" ? "nameAr" : "nameEn"] ??
              t("COMMON.UNKOWN")}
          </EllipsisTypography>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row w-full  mb-auto p-2">
        <div className="flex flex-col gap-1 p-2 w-full">
          <p className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.ROLES")}
          </p>
          {data?.roles?.length > 0 && (
            <ul className="flex flex-row flex-wrap gap-3">
              {data?.roles?.map((role) => (
                <Badge
                  key={role?._id}
                  className="shrink-0 bg-emerald-600 border-2 border-emerald-600 px-3 text-white rounded-full"
                >
                  {locale === "ar" ? role?.nameAr : role?.nameEn}
                </Badge>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="w-full transition-all duration-300 hover:bg-teal-600 h-16 flex flex-row items-center justify-center gap-3 border-t-2 group">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={`users/details/${data?._id}`}
              className="h-11 w-11 rounded-full boredr-2 border-teal-700 group-hover:border-white bg-transparent border-2 flex items-center justify-center"
            >
              <Icon
                icon="mdi:eye-outline"
                className="h-6! w-6! text-teal-700 group-hover:text-gray-100 transition-all duration-300"
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {t("COMMON.DETAILS_TITLE", {
              ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            })}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-11 w-11 rounded-full boredr-2 border-teal-700 bg-transparent border-2 group-hover:border-white"
              onClick={() => onActivateRow(data)}
            >
              <Icon
                icon={
                  data?.status === "ACTIVE"
                    ? "maki:cross"
                    : "material-symbols:check-rounded"
                }
                className="h-6! w-6! text-teal-700 group-hover:text-gray-100 transition-all duration-300"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t(
              data?.status === "ACTIVE"
                ? "COMMON.DEACTIVATE_TITLE"
                : "COMMON.ACTIVATE_TITLE",
              {
                ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
              }
            )}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                onEditRole(data?._id);
              }}
              className="h-11 w-11 rounded-full boredr-2 border-teal-700 bg-transparent border-2 group-hover:border-white"
            >
              <Icon
                icon="iconamoon:edit-thin"
                className="h-6! w-6! text-teal-700 group-hover:text-gray-100 transition-all duration-300"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t("COMMON.EDIT_TITLE", {
              ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            })}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                onDeleteRow(data);
              }}
              className="h-11 w-11 rounded-full boredr-2 border-teal-700 bg-transparent border-2 group-hover:border-white"
            >
              <Icon
                icon="ion:trash-outline"
                className="h-6! w-6! text-teal-700 group-hover:text-gray-100 transition-all duration-300"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t("COMMON.REMOVE_TITLE", {
              ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            })}
          </TooltipContent>
        </Tooltip>
      </div>
    </li>
  );
}
