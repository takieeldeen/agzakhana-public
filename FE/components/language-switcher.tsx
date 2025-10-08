"use client";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "./ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "./ui/drawer";
import { Separator } from "./ui/separator";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function LanguageSwitcher() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const handleLocaleSwitch = useCallback(() => {
    const pathnameArray = pathname?.split("/");
    const currentLocale = pathnameArray?.[1];
    const newLocale = currentLocale === "ar" ? "en" : "ar";
    if (pathnameArray && currentLocale) pathnameArray[1] = newLocale;
    const newPathname = pathnameArray?.join("/");
    router.push(newPathname);
  }, [pathname, router]);
  return (
    <>
      <Drawer>
        <DrawerTrigger className="">
          <Button className="bg-gray-200 text-primary dark:bg-card-background-dark block md:hidden">
            <Icon
              icon={
                locale === "ar"
                  ? "tabler:badge-ar"
                  : "icon-park-outline:english"
              }
              className="h-6! w-6!"
            />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="dark:bg-card-background-dark">
          <DrawerHeader>
            <h3 className="text-left text-2xl font-bold rtl:text-right dark:text-gray-200">
              {t("HEADER.DISPLAY_LANGUAGE")}
            </h3>
          </DrawerHeader>
          <ul className="flex flex-col items-center gap-2 pb-4">
            <li>
              <Button
                disabled={locale === "ar"}
                className="flex flex-row items-center bg-transparent hover:bg-transparent text-primary text-lg shadow-none hover:text-gray-600 dark:hover:text-gray-400 hover:translate-x-2"
                onClick={handleLocaleSwitch}
              >
                <Icon icon="mdi:abjad-arabic" className="h-8! w-8!" />
                {t("HEADER.ARABIC")}
              </Button>
            </li>
            <Separator />
            <li>
              <Button
                disabled={locale === "en"}
                className="flex flex-row items-center bg-transparent hover:bg-transparent text-primary text-lg shadow-none hover:text-gray-600 dark:hover:text-gray-400 hover:translate-x-2"
                onClick={handleLocaleSwitch}
              >
                <Icon icon="icon-park-outline:english" className="h-8! w-8!" />
                {t("HEADER.ENGLISH")}
              </Button>
            </li>
          </ul>
        </DrawerContent>
      </Drawer>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="bg-gray-200 text-primary dark:bg-card-background-dark hidden md:block">
            <Icon
              icon={
                locale === "ar"
                  ? "tabler:badge-ar"
                  : "icon-park-outline:english"
              }
              className="h-6! w-6!"
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-48 dark:bg-card-background-dark">
          <ul className="flex flex-col gap-2">
            <li>
              <Button
                disabled={locale === "ar"}
                className="flex flex-row items-center bg-transparent hover:bg-transparent text-primary text-sm shadow-none hover:text-gray-600 dark:hover:text-gray-400 hover:translate-x-2"
                onClick={handleLocaleSwitch}
              >
                <Icon icon="mdi:abjad-arabic" className="h-6! w-6!" />
                {t("HEADER.ARABIC")}
              </Button>
            </li>
            <Separator />
            <li>
              <Button
                disabled={locale === "en"}
                className="flex flex-row items-center bg-transparent hover:bg-transparent text-primary text-sm shadow-none hover:text-gray-600 dark:hover:text-gray-400 hover:translate-x-2"
                onClick={handleLocaleSwitch}
              >
                <Icon icon="icon-park-outline:english" className="h-6! w-6!" />
                {t("HEADER.ENGLISH")}
              </Button>
            </li>
          </ul>
        </PopoverContent>
      </Popover>
    </>
  );
}
