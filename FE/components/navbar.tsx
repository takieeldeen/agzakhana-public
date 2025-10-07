"use client";

import * as React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Navbar() {
  const t = useTranslations("");
  const { locale } = useParams();
  const defaultCategory = {
    id: 0,
    title: t("HOME_PAGE.ALL_CATEGORIES"),
    subtitle: t("NAV_BAR.BROWSE_ALL_CATEGORIES"),
    imageUrl:
      "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/codoral.png",
    link: "/products",
  };
  const [currentSelection, setCurrentSelection] =
    React.useState<any>(defaultCategory);
  const categories = React.useMemo(
    () => [
      {
        id: 1,
        title: t("FOOTER.SKIN_CARE"),
        subtitle: t("NAV_BAR.SKIN_CARE_SUBTITLE"),
        imageUrl:
          "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/skin-care-products.png",
        link: "/products?category=68ae00041d5513897936eaa2",
      },
      {
        id: 2,
        title: t("FOOTER.HAIR_CARE"),
        subtitle: t("NAV_BAR.HAIR_CARE_SUBTITLE"),
        imageUrl:
          "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/hair-care-products.png",
        link: "/products?category=68ae00041d5513897936eaa1",
      },
      {
        id: 3,
        title: t("FOOTER.VITAMINS_AND_SUPPLEMENTS"),
        subtitle: t("NAV_BAR.VITAMINS_AND_SUPPLEMENTS_SUBTITLE"),
        imageUrl:
          "https://ukbahlwracfvnetnxlba.supabase.co/storage/v1/object/public/agzakahan-public-portal/supplements.png",
        link: "/products?category=68ae00041d5513897936eaa4",
      },
    ],
    [t]
  );
  return (
    <NavigationMenu
      viewport={false}
      className="py-3 border-b-2 border-gray-200 dark:border-gray-600 w-full  max-w-full justify-start [&>div]:w-full px-8 hidden md:flex"
    >
      <NavigationMenuList className=" max-w-full w-full md:flex-row md:rtl:flex-row-reverse flex-col">
        {/* <SidebarTrigger />2 */}

        <Link
          href="/products"
          className="bg-[#3BB77E] text-white text-base mr-5 flex flex-row rtl:flex-row-reverse rounded-lg items-center gap-2 py-2 px-4 transition duration-300 hover:bg-[#35A571]"
        >
          <Icon icon="hugeicons:dashboard-square-01" height={20} width={20} />
          {t("NAV_BAR.BROWSE_ALL_CATEGORIES")}
        </Link>
        <NavigationMenuItem className="mr-4">
          <NavigationMenuLink
            asChild
            className="font-semibold flex flex-row rtl:flex-row-reverse"
          >
            <Link
              href="/deals"
              className="inline-flex flex-row gap-2 items-center text-[16px] dark:text-gray-200"
            >
              <Icon
                icon="solar:fire-broken"
                className="w-8! h-8! text-4xl text-agzakhana-primary"
              />
              {t("NAV_BAR.DEALS")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className="font-semibold">
            <Link
              href="/"
              className="inline-flex flex-row gap-2 items-center text-[16px] dark:text-gray-200"
            >
              {t("NAV_BAR.HOME")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rtl:flex-row-reverse dark:text-gray-200">
            {t("NAV_BAR.CATEGORIES")}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-20">
            <ul
              className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]"
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <li className="row-span-3">
                <NavigationMenuLink asChild className="">
                  <Link
                    className="from-muted/50 to-muted flex w-full flex-col rounded-md bg-linear-to-b px-6 no-underline outline-hidden select-none focus:shadow-md items-start h-full"
                    href={currentSelection?.link}
                  >
                    <div className="relative flex h-full w-full">
                      <Image
                        src={currentSelection?.imageUrl}
                        alt={currentSelection?.title}
                        className="top-1/2 left-1/2 object-contain"
                        fill
                      />
                    </div>
                    <div className="h-16 max-h-16 w-52 max-w-52">
                      <div className="text-lg font-medium rtl:text-right truncate leading-snug">
                        {currentSelection?.title ?? "--"}
                      </div>
                      <p className="text-muted-foreground text-sm leading-tight rtl:text-right line-clamp-2">
                        {currentSelection?.subtitle ?? "--"}
                      </p>
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
              {categories?.map((category) => (
                <ListItem
                  key={category?.id}
                  onMouseEnter={() => setCurrentSelection(category)}
                  onMouseLeave={() => setCurrentSelection(defaultCategory)}
                  href={category?.link}
                  title={category?.title}
                >
                  {category?.subtitle}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="md:ml-auto md:rtl:mr-auto rtl:ml-0">
          <NavigationMenuLink asChild className="font-semibold">
            <Link
              href="/contact-us "
              className="inline-flex flex-row gap-2 items-center text-[16px] dark:text-gray-200"
            >
              {t("NAV_BAR.CONTACT_US")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  const { locale } = useParams();
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href} className={cn(locale === "ar" && "text-right")}>
          <div className="text-sm leading-none font-medium  ">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug rtl:text-right ">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
