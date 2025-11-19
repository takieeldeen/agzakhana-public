import { BranchListItem } from "@/app/dashboard-types/branches";
import EllipsisTypography from "@/components/ellipsis-typography";
import Map from "@/components/map/map";
import { CustomMapMarker } from "@/components/map/map-marker";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";
import Link from "next/link";
import { useCallback, useState } from "react";
import { useTranslations } from "use-intl";

export default function MapView({ data }: { data: BranchListItem[] }) {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [mapCenter, setMapCenter] = useState<[number, number] | null>(null);
  console.log(mapCenter);
  const locale = useLocale();
  const t = useTranslations();
  const handleRowClick = useCallback(
    (row: BranchListItem) => {
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
                onClick={(cardRow: BranchListItem) => {
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
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={cn(
                          "h-12 w-12 flex items-center justify-center bg-white rounded-full drop-shadow-md",
                          currentUser === row?._id &&
                            "bg-emerald-600 drop-shadow-2xl drop-shadow-emerald-600"
                        )}
                      >
                        <div className="h-11 w-11 flex items-center justify-center rounded-full bg-dark-700">
                          <Icon
                            icon="streamline-plump:store-2"
                            className="h-6 w-6 text-white"
                          />
                        </div>
                      </div>
                      <div className="bg-dark-700 text-white rounded-3xl px-2 border-2 border-white whitespace-nowrap font-cairo">
                        {locale === "ar" ? row?.nameAr : row?.nameEn}
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="bg-white drop-shadow-lg dark:bg-dark-card w-96 min-h-48 py-3 gap-3 flex flex-col">
                    <div className="flex flex-row items-start gap-3">
                      <Icon
                        icon="streamline-plump:store-2"
                        className="h-24 w-24 text-border"
                      />
                      <div className="flex flex-col gap-1">
                        <div className="w-full flex flex-col">
                          <div className="flex flex-row gap-2">
                            <EllipsisTypography className="text-primary text-lg font-semibold max-w-fit">
                              {locale === "ar" ? row?.nameAr : row?.nameEn}
                            </EllipsisTypography>
                            <Badge
                              className={cn(
                                "bg-emerald-600 capitalize dark:text-white",
                                row?.status === "INACTIVE" && "bg-rose-800"
                              )}
                            >
                              {t(`COMMON.${row?.status}`)}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-row items-center gap-3 mb-2">
                          <p className="flex flex-row items-center gap-1 text-primary text-base">
                            {t("BRANCHES_MANAGEMENT.BRANCH_MANAGER")} :
                            {row?.manager?.[
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
                      className="bg-emerald-600 w-full h-10 rounded-md flex items-center justify-center text-sm hover:bg-emerald-700 transition-all duration-300 dark:text-white text-white"
                    >
                      {t("COMMON.DETAILS_TITLE", {
                        ENTITY_NAME: t(
                          "BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                        ),
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
  rowData: BranchListItem;
  currentCard: string | null;
  onClick: (user: BranchListItem) => void;
}) {
  const locale = useLocale();
  const t = useTranslations();

  return (
    <li
      onClick={() => onClick(rowData)}
      className={cn(
        "bg-white drop-shadow-md rounded-md p-3 flex flex-col gap-3 dark:bg-dark-950 dark:border-2 dark:border-dark-700 transition-all duration-300 cursor-pointer",
        currentCard === rowData?._id && "dark:border-emerald-600"
      )}
    >
      <div className="flex flex-row gap-2">
        <Icon
          icon="streamline-plump:store-2"
          className="h-16 w-16 text-border"
        />
        <div className="flex flex-col">
          <p className="font-semibold dark:text-white">
            {locale === "ar" ? rowData?.nameAr : rowData?.nameEn}
          </p>
          <p className="font-semibold text-sm text-gray-500 dark:text-gray-300">
            {rowData?.address?.displayName}
          </p>
        </div>
      </div>
      <Separator />
      <div className="flex flex-row items-center gap-3 mb-2">
        <Badge
          className={cn(
            "bg-emerald-600 capitalize dark:text-white",
            rowData?.status === "INACTIVE" && "bg-rose-800"
          )}
        >
          {t(`COMMON.${rowData?.status}`)}
        </Badge>

        <p className="flex flex-row items-center gap-1 text-primary text-base">
          {t("BRANCHES_MANAGEMENT.BRANCH_MANAGER")} :
          {rowData?.manager?.[locale === "ar" ? "nameAr" : "nameEn"] ??
            t("COMMON.UNKOWN")}
        </p>
      </div>
    </li>
  );
}
