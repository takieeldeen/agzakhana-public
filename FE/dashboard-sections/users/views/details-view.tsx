"use client";
import ListItem from "@/components/list-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { cn } from "@/lib/utils";
import { useParams, useRouter } from "next/navigation";
import { DetailsSkeletonView } from "./skeleton-view";
import { useMutate } from "../use-mutate";

import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import ErrorGuard from "@/components/error-guard";
import { useGetUserDetails } from "@/app/dashboard-api/users";
import FallbackImage from "@/components/fallback-image";
import Map, { MapMarker } from "@/components/map/map";
import Link from "next/link";
import { downloadFile } from "@/utils/files";

export default function DetailsView() {
  const { userId } = useParams();
  const { data, isLoading, isFetching, error } = useGetUserDetails(userId);

  const locale = useLocale();
  const t = useTranslations();
  const { changeStatus, onDeleteUserRole } = useMutate();
  const router = useRouter();
  if (isLoading) return <DetailsSkeletonView />;
  return (
    <div className="h-full dark:bg-dark-card flex flex-col">
      <ErrorGuard error={error}>
        {/* Details Header */}
        <div className="bg-emerald-600 md:h-1/8 md:min-h-48 p-6 flex flex-col md:flex-row gap-3 items-center">
          <div className="md:h-full md:w-fit min-h-36 min-w-36 rounded-full overflow-hidden shrink-0 relative">
            <FallbackImage
              src={data?.imageUrl ?? ""}
              fill
              className="object-fill"
              alt={
                locale === "ar" ? data?.nameAr ?? "--" : data?.nameEn ?? "--"
              }
            />
          </div>
          <div className="flex-1 ">
            <div className="flex flex-col md:items-start items-center">
              <h3 className="text-xl font-bold text-white flex flex-col-reverse md:flex-row items-center gap-3">
                {locale === "ar" ? data?.nameAr : data?.nameEn}

                <span
                  className={cn(
                    "text-xs font-semibold text-white bg-emerald-800  px-2 py-1 rounded-full "
                  )}
                >
                  {data?.status
                    ? t(`COMMON.${data?.status}`)
                    : t("COMMON.UNKOWN")}
                </span>
                <AnimatePresence>
                  {isFetching && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                    >
                      <Badge className="bg-emerald-800 dark:text-white">
                        <Spinner />
                        {t("COMMON.SYNCING")}
                      </Badge>
                    </motion.div>
                  )}
                </AnimatePresence>
              </h3>
              <p className="text-input dark:text-gray-200">
                {data?.roles
                  ?.map((role) => role?.[locale === "ar" ? "nameAr" : "nameEn"])
                  .join(" - ")}
              </p>
            </div>
          </div>
          <div className="flex flex-col w-full md:w-fit md:flex-row items-start gap-3">
            <Button
              onClick={() => router.push(`/dashboard/users/edit/${userId}`)}
              variant="ghost"
              className="border-2 border-white text-white h-12 w-full md:w-fit md:min-w-36 text-base hover:bg-transparent hover:border-gray-200 hover:text-gray-200 rounded-xl"
            >
              <Icon icon="iconamoon:edit-light" className="h-6! w-6!" />
              {t("COMMON.EDIT_TITLE", {
                ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_NAME"),
              })}
            </Button>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                changeStatus(data!);
              }}
              variant="ghost"
              className="border-2 border-white text-white h-12 w-full md:w-fit md:min-w-36 text-base hover:bg-transparent hover:border-gray-200 hover:text-gray-200 rounded-xl"
            >
              <Icon
                icon={
                  data?.status === "ACTIVE"
                    ? "ci:pause"
                    : "material-symbols:check-rounded"
                }
                className="h-6! w-6!"
              />
              {t(
                data?.status === "ACTIVE"
                  ? "COMMON.DEACTIVATE_TITLE"
                  : "COMMON.ACTIVATE_TITLE",
                {
                  ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                }
              )}
            </Button>
          </div>
        </div>
        {/* Details Content */}
        <div className="relative flex-1 width-full">
          <div className="h-full relative md:absolute overflow-y-auto w-full ">
            <div className="p-3 flex flex-col gap-6 dark:bg-dark-card w-full ">
              <div className="flex flex-col md:flex-row gap-3">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.NAME")}
                  secondaryLabel={
                    data?.[locale === "ar" ? "nameAr" : "nameEn"] ??
                    t("COMMON.UNKOWN")
                  }
                />
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.BRANCH")}
                  secondaryLabel={
                    data?.branch?.[locale === "ar" ? "nameAr" : "nameEn"] ??
                    t("COMMON.UNKOWN")
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.ADDRESS")}
                  secondaryLabel={
                    data?.location?.displayName ?? t("COMMON.UNKOWN")
                  }
                />
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.PHONE_NUMBER")}
                  secondaryLabel={data?.phoneNumber ?? t("COMMON.UNKOWN")}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <ListItem
                  primaryLabel={t("COMMON.STATUS")}
                  secondaryLabel={
                    data?.status
                      ? t(`COMMON.${data?.status}`)
                      : t("COMMON.UNKOWN")
                  }
                />
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.EMAIL_ADDRESS")}
                  secondaryLabel={data?.email ?? t("COMMON.UNKOWN")}
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.CITY")}
                  secondaryLabel={
                    data?.status
                      ? t(`COMMON.${data?.status}`)
                      : t("COMMON.UNKOWN")
                  }
                />
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.NATIONALITY")}
                  secondaryLabel={
                    data?.nationality?.[
                      locale === "ar" ? "nameAr" : "nameEn"
                    ] ?? t("COMMON.UNKOWN")
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.NATIONAL_ID")}
                  secondaryLabel={data?.nationalId ?? t("COMMON.UNKOWN")}
                />
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.BIRTH_DATE")}
                  secondaryLabel={
                    data?.birthDate
                      ? new Intl.DateTimeFormat(
                          locale === "ar" ? "ar-EG" : "en-US",
                          {
                            day: "2-digit",
                            weekday: "long",
                            month: "long",
                            year: "numeric",
                          }
                        ).format(new Date(data?.birthDate ?? ""))
                      : t("COMMON.UNKOWN")
                  }
                />
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.JOINING_DATE")}
                  secondaryLabel={
                    data?.joiningDate
                      ? new Intl.DateTimeFormat(
                          locale === "ar" ? "ar-EG" : "en-US",
                          {
                            day: "2-digit",
                            weekday: "long",
                            month: "long",
                            year: "numeric",
                          }
                        ).format(new Date(data?.joiningDate ?? ""))
                      : t("COMMON.UNKOWN")
                  }
                />
              </div>

              <div className="">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.ROLE_PERMISSIONS")}
                  className="mb-2"
                />
                <Accordion type="multiple" className="w-full ">
                  <ul className="flex flex-col gap-3">
                    {data?.permissionGroups?.map((group) => (
                      <li key={group?._id}>
                        <AccordionItem value={group?._id} className="">
                          <AccordionTrigger className="bg-gray-200 dark:bg-dark-background dark:text-gray-300  rounded-t-2xl rounded-b-none px-4 hover:no-underline cursor-pointer text-lg text-black [&[data-state=closed]]:rounded-b-2xl">
                            {locale === "ar" ? group?.nameAr : group?.nameEn}
                          </AccordionTrigger>
                          <AccordionContent className="bg-gray-100 rounded-b-2xl rounded-t-none p-2 py-6 flex flex-row gap-2 flex-wrap text-balance dark:bg-dark-900">
                            {group?.permissions?.map((permission) => (
                              <span
                                key={permission?._id}
                                className="bg-emerald-600 rounded-full w-fit px-4 py-0.5 text-white"
                              >
                                {locale === "ar"
                                  ? permission?.nameAr
                                  : permission?.nameEn}
                              </span>
                            ))}
                          </AccordionContent>
                        </AccordionItem>
                      </li>
                    ))}
                  </ul>
                </Accordion>
              </div>

              <div>
                <div className="flex flex-row items-start gap-4 w-fit">
                  <ListItem
                    primaryLabel={t("USERS_MANAGEMENT.LOCATION")}
                    className="mb-4"
                  />
                  <Link
                    href={data?.googleMapUrl ?? ""}
                    className="dark:text-emerald-400 flex flex-row items-center gap-2 text-emerald-600 font-semibold"
                  >
                    <Icon icon="hugeicons:maps" className="h-6 w-6" />
                    {t("USERS_MANAGEMENT.GO_TO_GOOGLE_MAPS")}
                  </Link>
                </div>
                <div className="rounded-lg overflow-hidden flex-1 h-96 w-full">
                  <Map>
                    {data?.location && <MapMarker position={data?.location} />}
                  </Map>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-3">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.LAST_LOGIN")}
                  secondaryLabel={
                    data?.lastLogin
                      ? new Intl.DateTimeFormat(
                          locale === "ar" ? "ar-EG" : "en-US",
                          {
                            day: "2-digit",
                            weekday: "long",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        ).format(new Date(data?.lastLogin ?? ""))
                      : t("COMMON.UNKOWN")
                  }
                />
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.CREATED_AT")}
                  secondaryLabel={
                    data?.updatedAt
                      ? new Intl.DateTimeFormat(
                          locale === "ar" ? "ar-EG" : "en-US",
                          {
                            day: "2-digit",
                            weekday: "long",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        ).format(new Date(data?.updatedAt ?? ""))
                      : t("COMMON.UNKOWN")
                  }
                />
              </div>
              <div className="">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.ROLES")}
                  className="mb-4"
                />
                <div className="flex md:flex-row gap-3 md:flex-wrap flex-col">
                  {data?.roles?.map((role) => (
                    <div
                      key={role?._id}
                      className="flex w-full md:w-[calc(50%_-_12px)] gap-3 flex-row shrink-0 "
                    >
                      <Icon
                        icon="qlementine-icons:user-16"
                        className="h-[3.5rem] w-[3.5rem] text-border"
                      />
                      <div className="flex flex-row flex-1 justify-between">
                        <div className="flex flex-col">
                          <p className="text-black text-lg font-semibold dark:text-white">
                            {locale === "ar" ? role?.nameAr : role?.nameEn}
                          </p>
                          <Badge
                            className={cn(
                              "bg-emerald-600 capitalize dark:text-white",
                              role?.status === "INACTIVE" && "bg-rose-800"
                            )}
                          >
                            {t(`COMMON.${role?.status}`)}
                          </Badge>
                        </div>
                        <Button
                          className="rounded-full h-12 aspect-square md:aspect-auto md:w-32 text-rose-800 dark:text-rose-600 border-rose-800 dark:border-rose-600 border-2 hover:bg-rose-800 hover:dark:bg-rose-600 hover:dark:text-white hover:text-white p-0! "
                          variant="ghost"
                          onClick={() => onDeleteUserRole(data, role)}
                        >
                          <Icon icon="mynaui:trash" className="h-6! w-6!" />
                          <span className="hidden md:block">
                            {t("USERS_MANAGEMENT.DELETE")}{" "}
                          </span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="">
                <ListItem
                  primaryLabel={t("USERS_MANAGEMENT.OFFICIAL_DOCUMENTS")}
                  className="mb-4"
                />
                <div className="flex md:flex-row gap-3 md:flex-wrap flex-col">
                  {data?.files?.map((file: any) => (
                    <div
                      key={file?._id}
                      className="flex w-full md:w-[calc(50%_-_12px)] gap-3 flex-row shrink-0 "
                    >
                      <Icon
                        icon="mdi-light:file"
                        className="h-[3.5rem] w-[3.5rem] text-border"
                      />
                      <div className="flex flex-row flex-1 justify-between">
                        <div className="flex flex-col">
                          <p className="text-black text-lg font-semibold dark:text-white">
                            {file?.name}
                          </p>
                          <span className="text-sm text-muted-foreground whitespace-nowrap ">
                            {Math.round(file?.size / 1024)} {t("COMMON.KB")}
                          </span>
                        </div>
                        <Button
                          className="rounded-lg h-12 w-12 aspect-square md:aspect-auto  text-emerald-800 dark:text-emerald-600 border-emerald-800 dark:border-emerald-600 border-2 hover:bg-emerald-800 hover:dark:bg-emerald-600 hover:dark:text-white hover:text-white p-0! "
                          variant="ghost"
                          onClick={() => downloadFile(file?.url, file?.name)}
                        >
                          <Icon
                            icon="heroicons-outline:download"
                            className="h-6! w-6!"
                          />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ErrorGuard>
    </div>
  );
}
