"use client";
import { BranchListItem, BranchType } from "@/app/dashboard-types/branches";
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
import { formatTime } from "@/utils/datetime";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";

export default function GridTableRow({
  row,
  onActivate,
  onEdit,
  onDelete,
}: {
  row: BranchListItem;
  onActivate: (branch: BranchListItem) => void;
  onEdit: (branchId: string) => void;
  onDelete: (branch: BranchType | BranchListItem) => void;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const isRtl = locale === "ar";
  return (
    <li
      key={row?._id}
      className="bg-card w-full md:w-128 md:min-w-76 md:max-w-[calc(33%_-_12px)] md:aspect-square overflow-hidden  rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-col items-center gap-3 dark:bg-dark-card "
    >
      <div className="bg-teal-600 dark:bg-teal-800 w-full h-24 md:max-h-24 md:min-h-[calc(31%)] flex flex-row gap-3 items-center px-3">
        <Icon
          icon="streamline-plump:store-2"
          className="min-h-3/4! h-auto! w-auto! max-h-[4.5rem]! aspect-square text-teal-700"
          // className="min-h-3/4 max-h-[4.5rem] aspect-square! text-teal-700"
        />
        <div>
          <p className="text-primary-foreground xl:text-xl dark:text-white">
            {row?.[isRtl ? "nameAr" : "nameEn"]}
          </p>
          <Badge className={cn("bg-teal-700 capitalize dark:text-white")}>
            {t(`COMMON.${row?.status}`)}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col gap-1 px-3 items-start  w-full">
        <p className="font-semibold text-black dark:text-white">
          {t("BRANCHES_MANAGEMENT.ADDRESS")}
        </p>
        <EllipsisTypography className="text-muted-foreground">
          {row?.address?.displayName}
        </EllipsisTypography>
      </div>
      <Separator />
      <div className="flex flex-row w-full  mb-auto p-2">
        <div className="flex flex-col gap-1 p-2 w-full">
          <p className="font-semibold text-black dark:text-white">
            {t("BRANCHES_MANAGEMENT.PHONE_NUMBER")}
          </p>
          <p className="text-muted-foreground">{row?.phoneNumber}</p>
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          <p className="font-semibold text-black dark:text-white">
            {t("BRANCHES_MANAGEMENT.WORKING_HOURS")}
          </p>
          <p className="text-muted-foreground">
            {formatTime(row?.startHour, locale)} {" - "}
            {formatTime(row?.endHour, locale)}
          </p>
        </div>
      </div>
      <div className="flex flex-row w-full  mb-auto p-2">
        <div className="flex flex-col gap-1 p-2 w-full">
          <p className="font-semibold text-black dark:text-white">
            {t("BRANCHES_MANAGEMENT.BRANCH_MANAGER")}
          </p>
          <p className="text-muted-foreground">
            {row?.manager?.[locale === "ar" ? "nameAr" : "nameEn"]}
          </p>
        </div>
      </div>
      <div className="w-full transition-all duration-300 hover:bg-teal-600 h-16 flex flex-row items-center justify-center gap-3 border-t-2 group">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button className="h-11 w-11 rounded-full boredr-2 border-teal-700 group-hover:border-white bg-transparent border-2">
              <Icon
                icon="mdi:eye-outline"
                className="h-6! w-6! text-teal-700 group-hover:text-gray-100 transition-all duration-300"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t("COMMON.DETAILS_TITLE", {
              ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            })}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="h-11 w-11 rounded-full boredr-2 border-teal-700 bg-transparent border-2 group-hover:border-white"
              onClick={() => onActivate(row)}
            >
              <Icon
                icon={
                  row?.status === "ACTIVE"
                    ? "maki:cross"
                    : "material-symbols:check-rounded"
                }
                className="h-6! w-6! text-teal-700 group-hover:text-gray-100 transition-all duration-300"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {t(
              row?.status === "ACTIVE"
                ? "COMMON.DEACTIVATE_TITLE"
                : "COMMON.ACTIVATE_TITLE",
              {
                ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
              }
            )}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                onEdit(row?._id);
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
              ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            })}
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={() => {
                onDelete(row);
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
              ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            })}
          </TooltipContent>
        </Tooltip>
      </div>
    </li>
  );
}
