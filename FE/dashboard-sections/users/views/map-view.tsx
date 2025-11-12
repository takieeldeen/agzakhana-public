import { UserListItem } from "@/app/dashboard-types/users";
import EllipsisTypography from "@/components/ellipsis-typography";
import Map from "@/components/map/map";
import { CustomMapMarker } from "@/components/map/map-marker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { getInitials } from "@/utils/string";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslations } from "use-intl";

export default function UsersMap({ data }: { data: UserListItem[] }) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  console.log(mapCenter);
  const locale = useLocale();
  const t = useTranslations();
  const handleRowClick = useCallback(
    (row: UserListItem) => {
      if (row?._id === currentUser) {
        setCurrentUser(null);
        setMapCenter(null);
      } else {
        setCurrentUser(row?._id);
        setMapCenter([row?.address?.lat, row?.address?.lng]);
      }
    },
    [currentUser]
  );
  return (
    <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-dark-background p-3 relative">
      <div className="flex flex-row gap-2 h-full w-full">
        <div className="w-1/5 min-w-80 h-full  relative overflow-y-auto pr-2 rtl:pr-0 rtl:pl-2">
          <ul className=" flex flex-col gap-3">
            {data?.map((row) => (
              <SingleCard
                key={row?._id}
                rowData={row}
                currentCard={currentUser}
                onClick={(cardRow: UserListItem) => {
                  handleRowClick(cardRow);
                }}
              />
            ))}
          </ul>
        </div>
        {/* Map Container */}
        <div className="relative rounded-lg overflow-hidden h-full w-4/5">
          <Map center={mapCenter ?? undefined}>
            {data?.map((row) => (
              <CustomMapMarker
                position={[
                  (row as any)?.address?.lat,
                  (row as any)?.address?.lng,
                ]}
                key={row?._id}
                iconOptions={{
                  className: "jsx-marker",
                  iconSize: [100, 100],
                  iconAnchor: [50, 50],
                }}
              >
                <Popover
                  open={currentUser === row?._id}
                  onOpenChange={(open) => {
                    if (open) {
                      setCurrentUser(row?._id);
                    } else {
                      setCurrentUser(null);
                    }
                  }}
                >
                  <PopoverTrigger>
                    <div
                      className={cn(
                        "h-12 w-12 flex items-center justify-center bg-white rounded-full drop-shadow-md",
                        currentUser === row?._id &&
                          "bg-emerald-600 drop-shadow-2xl drop-shadow-emerald-600"
                      )}
                    >
                      <Avatar className="h-11 w-11 ">
                        <AvatarImage src={row?.imageUrl} />
                        <AvatarFallback className="font-semibold dark:text-white">
                          {getInitials(row?.nameEn)}
                        </AvatarFallback>
                      </Avatar>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white drop-shadow-lg dark:bg-dark-card w-96 min-h-48 py-3 gap-3 flex flex-col">
                    <div className="flex flex-row items-start gap-3">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={row?.imageUrl} />
                        <AvatarFallback className="font-semibold">
                          {getInitials(row?.nameEn)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <div className="w-full flex flex-col">
                          <EllipsisTypography className="text-primary text-lg font-semibold">
                            {locale === "ar" ? row?.nameAr : row?.nameEn}
                          </EllipsisTypography>
                          <EllipsisTypography className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                            {row?.email}
                          </EllipsisTypography>
                        </div>
                        <div className="flex flex-row items-center gap-3 mb-2">
                          <Badge
                            className={cn(
                              "bg-emerald-600 capitalize dark:text-white",
                              row?.status === "INACTIVE" && "bg-rose-800"
                            )}
                          >
                            {t(`COMMON.${row?.status}`)}
                          </Badge>

                          <p className="flex flex-row items-center gap-1 text-primary text-base">
                            {t("USERS_MANAGEMENT.BRANCH")} :
                            {row?.branch?.[
                              locale === "ar" ? "nameAr" : "nameEn"
                            ] ?? t("COMMON.UNKOWN")}
                          </p>
                        </div>
                        <p className="flex flex-row items-center gap-1 text-primary text-base">
                          <Icon
                            icon="f7:phone-fill"
                            className="text-gray-600"
                          />
                          {row?.phoneNumber}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <EllipsisTypography className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      {row?.address?.displayName}
                    </EllipsisTypography>
                    <Link
                      href={`/dashboard/users/details/${row?._id}`}
                      className="bg-emerald-600 w-full h-10 rounded-md flex items-center justify-center text-sm hover:bg-emerald-700 transition-all duration-300 dark:text-white "
                    >
                      {t("COMMON.DETAILS_TITLE", {
                        ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                      })}
                    </Link>
                  </PopoverContent>
                </Popover>
              </CustomMapMarker>
            ))}
          </Map>
        </div>
      </div>
    </div>
  );
}

function SingleCard({
  rowData,
  currentCard,
  onClick,
}: {
  rowData: UserListItem;
  currentCard: string | null;
  onClick: (user: UserListItem) => void;
}) {
  const locale = useLocale();
  const t = useTranslations();
  const initials = rowData?.nameEn
    ?.split(" ")
    ?.map((name) => name?.[0])
    ?.slice(0, 2)
    ?.join("");
  return (
    <li
      onClick={() => onClick(rowData)}
      className={cn(
        "bg-white drop-shadow-md rounded-md p-3 flex flex-col gap-3 dark:bg-dark-950 dark:border-2 dark:border-dark-700 transition-all duration-300 cursor-pointer",
        currentCard === rowData?._id && "dark:border-emerald-600"
      )}
    >
      <div className="flex flex-row gap-2">
        <Avatar className="h-12 w-12">
          <AvatarImage src={rowData?.imageUrl} />
          <AvatarFallback className="font-semibold dark:text-gray-300">
            {initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="font-semibold dark:text-white">
            {locale === "ar" ? rowData?.nameAr : rowData?.nameEn}
          </p>
          <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">
            {rowData?.email}
          </p>
        </div>
      </div>
      <Separator />
      <ul className="flex flex-row gap-2 w-full flex-wrap">
        {rowData?.roles?.length > 0 && (
          <Badge className="bg-transparent border-2 border-emerald-700 text-emerald-700 dark:border-emerald-600 dark:text-emerald-600 font-semibold rounded-full">
            {locale === "ar"
              ? rowData?.roles?.[0]?.nameAr
              : rowData?.roles?.[0]?.nameEn}
          </Badge>
        )}
        {rowData?.roles?.length > 1 && (
          <Tooltip>
            <TooltipTrigger>
              <Badge className="bg-transparent border-2 border-emerald-700 text-emerald-700 dark:border-emerald-600 dark:text-emerald-600 font-semibold rounded-full">
                {t("USERS_MANAGEMENT.MORE_ROLES", {
                  count: rowData?.roles?.length - 1,
                })}
              </Badge>
            </TooltipTrigger>
            <TooltipContent className="shadow-lg dark:bg-dark-background dark:text-white">
              <ul className="flex flex-col py-2">
                {rowData?.roles?.slice(1)?.map((role, i) => (
                  <li
                    key={role?._id}
                    className={cn(
                      "flex items-center h-10",
                      i !== rowData.roles.length - 2 &&
                        "border-gray-600  border-b-[1px]"
                    )}
                  >
                    {locale === "ar" ? role?.nameAr : role?.nameEn}
                  </li>
                ))}
              </ul>
            </TooltipContent>
          </Tooltip>
        )}
      </ul>
    </li>
  );
}
