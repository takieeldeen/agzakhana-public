"use client";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";
import Logo from "./logo";

export default function UserBar() {
  const t = useTranslations();
  return (
    <div className="h-[10dvh]  bg-slate-50 border-b-2 flex flex-row items-center px-2 dark:bg-dark-background">
      <Logo className="md:h-12 md:w-30" />
      <div className="mx-auto w-96 bg-white rounded-md">
        <div className="relative">
          <Icon
            icon="mingcute:search-line"
            className="absolute top-1/2 -translate-y-1/2 left-2 text-gray-500 dark:text-white rtl:left-auto rtl:right-2 z-10"
          />
          <Input
            placeholder={t("COMMON.SEARCH_ANYTHING")}
            className="pl-8 rtl:pl-0 rtl:pr-8 dark:bg-dark-card h-12 rounded-md dark:text-white"
          />
        </div>
      </div>
      <div className="ml-auto rtl:mr-auto rtl:ml-0 px-2 w-fit">
        <div className="flex flex-row gap-2 items-center">
          <div className="rounded-full h-10 w-10 relative overflow-hidden">
            <Image
              src="https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/ahmed_yasser"
              alt="user image"
              fill
              className="object-fill"
            />
          </div>
          <Button className="flex flex-col gap-1 text-lg text-gray-600 bg-transparent shadow-none px-1!">
            <Icon icon="flowbite:chevron-sort-outline" />
          </Button>
        </div>
      </div>
    </div>
  );
}
