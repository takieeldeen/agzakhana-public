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
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { BranchListItem, BranchType } from "@/app/dashboard-types/branches";
import { formatTime } from "@/utils/datetime";

export default function ListTableRow({
  rowData,
  onActivate,
  onEdit,
  onDelete,
}: {
  rowData: BranchListItem;
  onActivate: (branch: BranchListItem) => void;
  onEdit: (branchId: string) => void;
  onDelete: (branch: BranchType | BranchListItem) => void;
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
      key={rowData?._id}
      className="bg-card w-full h-24 rounded-xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] flex flex-row items-center gap-3 dark:bg-dark-card"
    >
      <Icon
        icon="streamline-plump:store-2"
        className="h-[4.5rem] w-[4.5rem] text-border"
      />
      <div className="flex flex-col gap-1 flex-1">
        <p className="font-semibold text-black dark:text-white">
          {rowData?.[isRtl ? "nameAr" : "nameEn"]}
        </p>
        <div className="flex flex-row gap-3">
          <Badge
            className={cn(
              "bg-emerald-600 capitalize dark:text-white",
              rowData?.status === "INACTIVE" && "bg-rose-800"
            )}
          >
            {t(`COMMON.${rowData?.status}`)}
          </Badge>
          <EllipsisTypography className="text-muted-foreground">
            {rowData?.address?.displayName}
          </EllipsisTypography>
        </div>
      </div>
      <Separator className="md:block hidden" orientation="vertical" />
      <div className="flex-row gap-8 hidden md:flex flex-1">
        <div className="flex-1">
          <p className="font-semibold text-black dark:text-white text-sm ">
            {t("BRANCHES_MANAGEMENT.PHONE_NUMBER")}
          </p>
          <EllipsisTypography className="text-muted-foreground">
            {rowData?.phoneNumber}
          </EllipsisTypography>
        </div>
        <div className="flex-1">
          <EllipsisTypography className="font-semibold text-black dark:text-white text-sm ">
            {t("BRANCHES_MANAGEMENT.BRANCH_MANAGER")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground">
            {rowData?.manager?.[locale === "ar" ? "nameAr" : "nameEn"]}
          </EllipsisTypography>
        </div>
        <div className="flex-1">
          <EllipsisTypography className="font-semibold text-black dark:text-white text-sm ">
            {t("BRANCHES_MANAGEMENT.WORKING_HOURS")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground">
            {formatTime(rowData?.startHour, locale)} {" - "}
            {formatTime(rowData?.endHour, locale)}
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
                href={` roles/${rowData?._id}`}
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
                      ENTITY_NAME: t(
                        "BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                      ),
                    })}
                  </p>
                  <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                    {t("COMMON.DETAILS_SUBTITLE", {
                      ENTITY_NAME: t(
                        "BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                      ),
                    })}
                  </p>
                </div>
              </Link>
            </li>
            <Separator />
            <li
              onClick={() => onActivate(rowData as any)}
              className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-900 transition-all group-hover:bg-emerald-700 group-hover:dark:bg-emerald-700   aspect-square">
                <Icon
                  icon={
                    rowData?.status === "ACTIVE"
                      ? "maki:cross"
                      : "material-symbols:check-rounded"
                  }
                  className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300 dark:text-gray-200"
                />
              </div>
              <div>
                <p className="text-sm text-black dark:text-gray-200 transition-all group-hover:text-white font-semibold">
                  {t(
                    rowData?.status === "ACTIVE"
                      ? "COMMON.DEACTIVATE_TITLE"
                      : "COMMON.ACTIVATE_TITLE",
                    {
                      ENTITY_NAME: t(
                        "BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                      ),
                    }
                  )}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t(
                    rowData?.status === "ACTIVE"
                      ? "COMMON.DEACTIVATE_SUBTITLE"
                      : "COMMON.ACTIVATE_SUBTITLE",
                    {
                      ENTITY_NAME: t(
                        "BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                      ),
                    }
                  )}
                </p>
              </div>
            </li>
            <Separator />
            <li
              onClick={() => onEdit(rowData?._id)}
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
                    ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t("COMMON.EDIT_SUBTITLE", {
                    ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
              </div>
            </li>
            <Separator />
            <li
              onClick={() => onDelete(rowData as any)}
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
                    ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                  })}
                </p>
                <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                  {t("COMMON.REMOVE_SUBTITLE", {
                    ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
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
