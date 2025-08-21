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

export default function Navbar() {
  const t = useTranslations("");
  return (
    <NavigationMenu
      viewport={false}
      className="py-3 border-b-2 border-gray-200 w-full  max-w-full justify-start [&>div]:w-full"
    >
      <NavigationMenuList className=" max-w-full w-full rtl:flex-row-reverse">
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
              className="inline-flex flex-row gap-2 items-center text-[16px]"
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
              className="inline-flex flex-row gap-2 items-center text-[16px]"
            >
              {t("NAV_BAR.HOME")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rtl:flex-row-reverse">
            {t("NAV_BAR.CATEGORIES")}
          </NavigationMenuTrigger>
          <NavigationMenuContent className="z-20">
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr_1fr]">
              {/* <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md "
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Beautifully designed components built with Tailwind CSS.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li> */}
              <ListItem href="/products?category=skin-care" title="Skin Care">
                Products for skin care, including creams, lotions, and serums.
              </ListItem>
              <ListItem href="/products?category=hare-care" title="Hair Care">
                Products for hair care, including shampoos, conditioners, and
                treatments.
              </ListItem>
              <ListItem
                href="products?category=vitamins"
                title="Vitamin and Supplements"
              >
                A range of vitamins and supplements for health and wellness.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="">
          <NavigationMenuLink asChild className="font-semibold">
            <Link
              href="/docs"
              className="inline-flex flex-row gap-2 items-center text-[16px]"
            >
              {t("NAV_BAR.ABOUT")}
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem className="ml-auto rtl:mr-auto rtl:ml-0">
          <NavigationMenuLink asChild className="font-semibold">
            <Link
              href="/docs"
              className="inline-flex flex-row gap-2 items-center text-[16px]"
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
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
