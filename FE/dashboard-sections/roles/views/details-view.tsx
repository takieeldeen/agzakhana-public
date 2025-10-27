"use client";
import ListItem from "@/components/list-item";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { lazy, useState } from "react";
import { cn } from "@/lib/utils";
import { useGetRoleDetails } from "@/app/dashboard-api/roles";
import { useParams } from "next/navigation";
import { DetailsSkeletonView } from "./skeleton-view";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";

const NewEditForm = lazy(() => import("../new-edit-form"));

export default function DetailsView() {
  const { roleId } = useParams();
  const { data: role, isLoading: rolesLoading } = useGetRoleDetails(roleId);
  const [showEditModal, setShowEditModal] = useState<
    "CREATE" | "EDIT" | "HIDDEN"
  >("HIDDEN");
  console.log(role);
  const locale = useLocale();
  const t = useTranslations();
  if (rolesLoading) return <DetailsSkeletonView />;
  return (
    <div className="h-full dark:bg-dark-card flex flex-col">
      {/* Details Header */}
      <div className="bg-emerald-600 h-1/8 min-h-48 p-6 flex flex-row gap-3">
        <div className="h-full w-fit">
          <Icon
            icon="qlementine-icons:user-16"
            className="h-full w-full text-emerald-700"
          />
        </div>
        <div className="flex-1 ">
          <div>
            <h3 className="text-xl font-bold text-white flex flex-row items-center gap-3">
              {locale === "ar" ? role?.nameAr : role?.nameEn}
              <span
                className={cn(
                  "text-xs font-semibold text-white bg-emerald-800 px-2 py-1 rounded-full "
                )}
              >
                {role?.status
                  ? t(`COMMON.${role?.status}`)
                  : t("COMMON.UNKOWN")}
              </span>
            </h3>
            <p className="text-input dark:text-gray-200">{`${t(
              "ROLES_MANAGEMENT.PERMISSIONS_CNT",
              { count: 9 }
            )} - ${t("ROLES_MANAGEMENT.USERS_WITH_PERMISSIONS", {
              count: 0,
            })}`}</p>
          </div>
        </div>
        <div className="flex flex-row items-start gap-3 ">
          <Button
            onClick={() => setShowEditModal("EDIT")}
            variant="ghost"
            className="border-2 border-white text-white h-12 min-w-36 text-base hover:bg-transparent hover:border-gray-200 hover:text-gray-200 rounded-xl"
          >
            <Icon icon="iconamoon:edit-light" className="h-6! w-6!" />
            {t("COMMON.EDIT_TITLE", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
            })}
          </Button>
          <Button
            variant="ghost"
            className="border-2 border-white text-white h-12 min-w-36 text-base hover:bg-transparent hover:border-gray-200 hover:text-gray-200 rounded-xl"
          >
            <Icon icon="ci:pause" className="h-6! w-6!" />
            {t("COMMON.DEACTIVATE_TITLE", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
            })}
          </Button>
        </div>
      </div>
      {/* Details Content */}
      <div className="relative flex-1 width-full">
        <div className="h-full absolute overflow-y-auto w-full ">
          <div className="p-3 flex flex-col gap-6 dark:bg-dark-card w-full ">
            <div className="flex flex-row gap-3">
              <ListItem
                primaryLabel={t("COMMON.STATUS")}
                secondaryLabel={
                  role?.status
                    ? t(`COMMON.${role?.status}`)
                    : t("COMMON.UNKOWN")
                }
              />
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.PERMISSIONS_COUNT")}
                secondaryLabel={role?.permissionsCount}
              />
            </div>
            <ListItem
              primaryLabel={t("ROLES_MANAGEMENT.ROLE_DESCRIPTION")}
              secondaryLabel={
                locale === "ar" ? role?.descriptionAr : role?.descriptionEn
              }
            />
            <div className="">
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.ROLE_PERMISSIONS")}
                className="mb-2"
              />
              <Accordion type="multiple" className="w-full ">
                <ul className="flex flex-col gap-3">
                  {role?.permissionGroups?.map((group) => (
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
            <div className="flex flex-row gap-3">
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.CREATED_BY")}
                secondaryLabel={
                  locale === "ar"
                    ? role?.createdBy?.nameAr
                    : role?.createdBy?.nameEn
                }
              />
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.CREATED_AT")}
                secondaryLabel={
                  role?.createdAt
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
                      ).format(new Date(role?.createdAt ?? ""))
                    : t("COMMON.UNKOWN")
                }
              />
            </div>
            <div className="">
              <ListItem
                primaryLabel={t("ROLES_MANAGEMENT.USERS_INFO_WITH_PERMISSIONS")}
                className="mb-4"
              />
              <div className="flex flex-row gap-3 flex-wrap">
                {role?.users?.map((user) => (
                  <div
                    key={user?._id}
                    className="flex w-[calc(50%_-_12px)] gap-3 flex-row shrink-0"
                  >
                    <Avatar className="h-14 w-14">
                      <AvatarImage src={user?.imageUrl} alt="@shadcn" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-row flex-1 justify-between">
                      <div className="flex flex-col">
                        <p className="text-black text-lg font-semibold dark:text-white">
                          {locale === "ar" ? user?.nameAr : user?.nameEn}
                        </p>
                        <p className="text-gray-600 dark:text-gray-300">
                          {user?.email}
                        </p>
                      </div>
                      <Button
                        className="rounded-full h-12 w-32 text-rose-800 dark:text-rose-600 border-rose-800 dark:border-rose-600 border-2 hover:bg-rose-800 hover:dark:bg-rose-600 hover:dark:text-white hover:text-white"
                        variant="ghost"
                      >
                        <Icon icon="mynaui:trash" className="h-6! w-6!" />
                        {t("ROLES_MANAGEMENT.DELETE")}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showEditModal !== "HIDDEN" && (
        <NewEditForm
          open
          onClose={() => setShowEditModal("HIDDEN")}
          refetch={() => {}}
          currentRole={role}
        />
      )}
    </div>
  );
}
