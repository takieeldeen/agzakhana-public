"use client";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/hooks/useAuth";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function PersonalInfoSection() {
  const t = useTranslations();
  const { user } = useAuth();
  return (
    <aside className="py-2 px-4 flex flex-col items-center gap-4 ">
      <h4 className="text-2xl font-bold text-right self-start dark:text-gray-200">
        {t("PROFILE.PERSONAL_INFO")}
      </h4>
      <Separator className="" />
      {!user?.imageUrl && (
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
            src={user?.imageUrl}
            alt={user?.name}
            fill
            className="object-contain"
          />
        </div>
      )}
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
        </div>
      </div>
    </aside>
  );
}
