"use client";
import Image from "next/image";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useLocale, useTranslations } from "next-intl";
import Logo from "./logo";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useCallback, useMemo } from "react";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Switch } from "./ui/switch";
import { useTheme } from "next-themes";
import { usePathname, useRouter } from "next/navigation";

export default function UserBar() {
  const pathname = usePathname();
  const router = useRouter();
  const user = useMemo(
    () => ({
      _id: "fgjhfgdk22",
      nameAr: "تقي الدين أحمد علي عمر",
      nameEn: "Takie Eldeen",
      imageUrl:
        "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/ahmed_yasser",
      email: "takie.eldeen1998@gmail.com",
    }),
    []
  );
  const t = useTranslations();
  const locale = useLocale();
  const { resolvedTheme, setTheme } = useTheme();
  const isAr = locale === "ar";
  const isDark = resolvedTheme === "dark";
  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);
  const handleLocaleSwitch = useCallback(() => {
    const pathnameArray = pathname?.split("/");
    const currentLocale = pathnameArray?.[1];
    const newLocale = currentLocale === "ar" ? "en" : "ar";
    if (pathnameArray && currentLocale) pathnameArray[1] = newLocale;
    const newPathname = pathnameArray?.join("/");
    router.push(newPathname);
  }, [pathname, router]);
  return (
    <div className="py-2 bg-slate-50 border-b-2 flex flex-row items-center px-2 dark:bg-dark-background">
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
          <Popover>
            <PopoverTrigger asChild>
              <Button className="flex flex-col gap-1 text-lg text-gray-600 bg-transparent shadow-none px-1!">
                <Icon icon="flowbite:chevron-sort-outline" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 dark:bg-dark-card">
              <ul>
                <li className="flex flex-row gap-3 items-center p-3">
                  <div className="rounded-full h-13 w-13 relative overflow-hidden">
                    <Image
                      src="https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakhana-profilepic/ahmed_yasser"
                      alt="user image"
                      fill
                      className="object-fill"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <p className="text-sm">
                      {locale === "ar" ? user?.nameAr : user?.nameEn}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {user?.email}
                    </p>
                  </div>
                </li>
                <li>
                  <Separator />
                </li>
                <li>
                  <Link
                    href="settings"
                    className="h-full w-full flex flex-row items-center gap-2 px-2 py-3 text-gray-800 hover:bg-gray-100 hover:dark:bg-dark-background transition-all duration-300 dark:text-gray-300"
                  >
                    <Icon icon="mdi-light:settings" className="text-xl" />
                    <p>{t("COMMON.ACCOUNT_SETTINGS")}</p>
                  </Link>
                </li>
                <li className="h-full w-full flex flex-row items-center gap-2 px-2 py-3 text-gray-800 hover:bg-gray-100 hover:dark:bg-dark-background transition-all duration-300 dark:text-gray-300">
                  <div className="flex-1 flex flex-row gap-2 items-center">
                    <Icon icon="ph:paint-brush-broad" className="text-xl" />
                    <p>{t("COMMON.DARK_MODE")}</p>
                  </div>
                  <Switch
                    onClick={toggleTheme}
                    checked={isDark}
                    className="data-[state=unchecked]:bg-slate-200  data-[state=checked]:bg-slate-200 data-[state=checked]:[&_[data-slot='switch-thumb']]:bg-emerald-600 [&_[data-slot='switch-thumb']]:bg-gray-400"
                  />
                </li>
                <li className="h-full w-full flex flex-row items-center gap-2 px-2 py-3 text-gray-800 hover:bg-gray-100 hover:dark:bg-dark-background transition-all duration-300 dark:text-gray-300">
                  <div className="flex-1 flex flex-row gap-2 items-center">
                    <Icon icon="mdi:abjad-arabic" className="text-2xl" />
                    <p>{t("COMMON.ARABIC_LANGUAGE")}</p>
                  </div>
                  <Switch
                    onClick={handleLocaleSwitch}
                    checked={isAr}
                    className="data-[state=unchecked]:bg-slate-200 data-[state=checked]:bg-slate-200 data-[state=checked]:[&_[data-slot='switch-thumb']]:bg-emerald-600 [&_[data-slot='switch-thumb']]:bg-gray-400"
                  />
                </li>
                <li className="p-4">
                  <Button className=" shadow-none w-full h-12 bg-slate-800 dark:bg-dark-background dark:text-white">
                    <Icon icon="heroicons:power-16-solid" />
                    {t("COMMON.SIGN_OUT")}
                  </Button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
}
