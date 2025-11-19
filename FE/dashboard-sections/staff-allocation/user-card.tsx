import EllipsisTypography from "@/components/ellipsis-typography";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/utils/string";
import { formatDate } from "date-fns";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useMutate } from "./use-mutate";

export function UserCard({ user }: { user: any }) {
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const locale = useLocale();
  const t = useTranslations();
  const { onUnallocating } = useMutate();
  return (
    <li className="w-full h-48 bg-white dark:bg-dark-card drop-shadow-sm rounded-lg p-3 relative flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback className="dark:bg-dark-background dark:text-gray-200">
            {getInitials(user?.nameEn)}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col">
            <EllipsisTypography className="font-semibold dark:text-white">
              {user?.[locale === "ar" ? "nameAr" : "nameEn"]}
            </EllipsisTypography>
            <EllipsisTypography className="text-sm dark:text-gray-500">
              {user?.email}
            </EllipsisTypography>
          </div>
          <Popover
            open={showOptions}
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
                onClick={() => {}}
                onPointerDown={(e) => e.stopPropagation()}
                onTouchStart={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                className={cn(
                  "h-8 w-8  ml-auto rtl:mr-auto rtl:ml-0 bg-transparent rounded-lg border-2",
                  showOptions &&
                    "rotate-90 bg-emerald-600 text-white border-transparent "
                )}
              >
                <Icon
                  icon="ri:more-fill"
                  className={cn(
                    "text-gray-500 h-4! w-4!",
                    showOptions && "text-white"
                  )}
                />
              </Button>
            </PopoverTrigger>

            <PopoverContent className="w-72 z-50 rounded-xl p-0 overflow-hidden dark:bg-dark-card">
              <ul className="rounded-lg overflow-hidden">
                <li>
                  <Link
                    className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300 "
                    href={`users/${user?._id}`}
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
                            "USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"
                          ),
                        })}
                      </p>
                      <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                        {t("COMMON.DETAILS_SUBTITLE", {
                          ENTITY_NAME: t(
                            "USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"
                          ),
                        })}
                      </p>
                    </div>
                  </Link>
                </li>
                <Separator />

                <li
                  // onClick={() => onEditRole(role?._id)}
                  className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-emerald-600 group transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-900 transition-all group-hover:bg-emerald-700 group-hover:dark:bg-emerald-700   aspect-square">
                    <Icon
                      icon="mdi:clock-outline"
                      className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-black dark:text-gray-200 transition-all group-hover:text-white font-semibold">
                      {t("STAFF_ALLOCATION.CHANGE_SHIFT")}
                    </p>
                    <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                      {t("COMMON.EDIT_SUBTITLE", {
                        ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                      })}
                    </p>
                  </div>
                </li>
                <Separator />

                <li
                  onClick={async () => await onUnallocating(user)}
                  onPointerDown={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  onMouseDown={(e) => e.stopPropagation()}
                  className="flex flex-row gap-3 p-3 cursor-pointer hover:bg-rose-800 group transition-all duration-300"
                >
                  <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-dark-900 transition-all group-hover:bg-rose-900 group-hover:dark:bg-rose-900   aspect-square">
                    <Icon
                      icon={"maki:cross"}
                      className="h-6 w-6 text-gray-700 group-hover:text-gray-100 transition-all duration-300 dark:text-gray-200"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-black dark:text-gray-200 transition-all group-hover:text-white font-semibold">
                      {t("STAFF_ALLOCATION.UNALLOCATE")}
                    </p>
                    <p className="text-sm text-muted-foreground transition-all group-hover:text-gray-200">
                      {t(
                        user?.status === "ACTIVE"
                          ? "COMMON.DEACTIVATE_SUBTITLE"
                          : "COMMON.ACTIVATE_SUBTITLE",
                        {
                          ENTITY_NAME: t(
                            "ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                          ),
                        }
                      )}
                    </p>
                  </div>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ul className="py-2  flex flex-row flex-wrap gap-1 items-start mb-auto overflow-y-auto">
        {user?.roles?.map((role: any) => (
          <Badge
            key={role?._id}
            className="shrink-0 h-fit bg-emerald-600 dark:text-white"
          >
            {locale === "ar" ? role?.nameAr : role?.nameEn}
          </Badge>
        ))}
      </ul>
      <Separator />
      <div className="flex flex-row justify-between text-sm">
        <div className="flex flex-col  items-start  w-full">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.CITY")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground">
            {locale === "ar" ? user?.city?.nameAr : user?.city?.nameEn}
          </EllipsisTypography>
        </div>
        <div className="flex flex-col  items-start  w-full">
          <EllipsisTypography className="font-semibold text-black dark:text-white">
            {t("USERS_MANAGEMENT.JOINING_DATE")}
          </EllipsisTypography>
          <EllipsisTypography className="text-muted-foreground">
            {user?.joiningDate
              ? formatDate(user?.joiningDate, "dd/MM/yyyy")
              : t("COMMON.UNKOWN")}
          </EllipsisTypography>
        </div>
      </div>
    </li>
  );
}
