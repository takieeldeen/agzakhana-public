"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import { lazy, Suspense, useState } from "react";

const MemoizedUpdateProfileForm = lazy(() => import("../profile-update-form"));
export default function PersonalInfoSection() {
  const [showEditPersonalInfoModal, setShowEditPersonalInfoModal] =
    useState<boolean>(false);
  const t = useTranslations();
  const { user } = useAuth();
  const locale = useLocale();
  return (
    <aside className="py-2 px-4 flex flex-col items-center gap-4 ">
      <div className="flex flex-row items-center justify-between  w-full  ">
        <h4 className="text-2xl font-bold text-right self-start dark:text-gray-200">
          {t("PROFILE.PERSONAL_INFO")}
        </h4>
        <Button
          className="flex flex-row rtl:flex-row-reverse items-center gap-2 bg-gray-200 text-gray-700 font-semibold dark:bg-card-background-dark dark:text-gray-200"
          onClick={() => setShowEditPersonalInfoModal(true)}
        >
          <Icon icon="material-symbols-light:edit-outline" />
          <span>{t("PROFILE.UPDATE")}</span>
        </Button>
      </div>
      <Separator className="" />
      {/* {!user?.imageUrl && (
        <div className="bg-gray-200 h-64 w-64 rounded-full shrink-0 aspect-square flex items-center justify-center">
          <Icon
            icon="solar:user-linear"
            className="text-[10rem] text-gray-400"
          />
        </div>
      )}
      {!!user?.imageUrl && (
        <div className="bg-gray-200 h-64 w-64 rounded-full shrink-0 aspect-square flex items-center justify-center overflow-hidden relative">
          <Image
            src={`${user?.imageUrl}?t=${new Date().toLocaleDateString()}`}
            alt={user?.name}
            fill
            className="object-contain"
          />
        </div>
      )} */}
      <Avatar className="w-48 h-48 ">
        <AvatarImage src={user?.imageUrl} />

        <AvatarFallback>
          <Icon icon="solar:user-outline" className="h-36 w-36 text-gray-400" />
        </AvatarFallback>
      </Avatar>
      <div className="w-full p-2">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col items-center">
            <strong className="text-base font-semibold text-gray-600 dark:text-gray-200">
              {t("PROFILE.USERNAME")}
            </strong>
            <strong className="text-lg font-semibold dark:text-gray-400">
              {user?.name ?? t("COMMON.UNKOWN")}
            </strong>
          </div>
          <Separator className="" />

          <div className="flex flex-col items-center">
            <strong className="text-base font-semibold text-gray-600 dark:text-gray-200">
              {t("PROFILE.EMAIL")}
            </strong>
            <strong className="text-lg font-semibold dark:text-gray-400">
              {user?.email ?? t("COMMON.UNKOWN")}
            </strong>
          </div>
          <Separator className="" />

          <div className="flex flex-col items-center">
            <strong className="text-base font-semibold text-gray-600 dark:text-gray-200">
              {t("PROFILE.PHONE")}
            </strong>
            <strong className="text-lg font-semibold dark:text-gray-400">
              {user?.phoneNumber ?? t("COMMON.UNKOWN")}
            </strong>
          </div>
          <Separator className="" />

          <div className="flex flex-col items-center">
            <strong className="text-base font-semibold text-gray-600 dark:text-gray-200">
              {t("PROFILE.ADDRESS")}
            </strong>
            <strong className="text-lg font-semibold dark:text-gray-400">
              {user?.address ?? t("COMMON.UNKOWN")}
            </strong>
          </div>
          <Separator className="" />

          <div className="flex flex-col items-center">
            <strong className="text-base font-semibold text-gray-600 dark:text-gray-200">
              {t("PROFILE.GENDER")}
            </strong>
            <strong className="text-lg font-semibold dark:text-gray-400">
              {user?.gender ? t(`PROFILE.${user?.gender}`) : t("COMMON.UNKOWN")}
            </strong>
          </div>
          <Separator className="" />

          <div className="flex flex-col items-center">
            <strong className="text-base font-semibold text-gray-600 dark:text-gray-200">
              {t("PROFILE.BIRTH_DATE")}
            </strong>
            <strong className="text-lg font-semibold dark:text-gray-400">
              {user?.birthDate
                ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-US", {
                    weekday: "long",
                    month: "long",
                    year: "numeric",
                    day: "2-digit",
                  }).format(new Date(user.birthDate)) // ✅ Convert string to Date
                : t("COMMON.UNKOWN")}
            </strong>
          </div>
        </div>
      </div>
      <Suspense>
        {showEditPersonalInfoModal && (
          <MemoizedUpdateProfileForm
            open={showEditPersonalInfoModal}
            onOpenChange={(open) => setShowEditPersonalInfoModal(open)}
            currentUser={user}
          />
        )}
      </Suspense>
    </aside>
  );
}
