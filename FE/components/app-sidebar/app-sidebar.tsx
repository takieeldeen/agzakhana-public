"use client";

import * as React from "react";

import {
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import Logo from "../logo";
import { Separator } from "../ui/separator";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { NavPath, useGetNavData } from "./config-navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useAuth } from "@/hooks/useAuth";
import { useGetCartItems } from "@/api/cart";
import Authenticate from "../authenticate-component";
import { NavUser } from "./sidebar-user";

export function AppSidebar() {
  const navData = useGetNavData();
  const { isAuthenticated } = useAuth();
  const { totalItems } = useGetCartItems(isAuthenticated);
  const t = useTranslations();
  return (
    <>
      <DrawerContent className="dark:bg-agzakhana-background-dark">
        <DrawerHeader>
          <DrawerTitle className="flex flex-col items-center justify-center ">
            <Logo />
          </DrawerTitle>
          <Separator />
          {/* <DrawerDescription>Menu</DrawerDescription> */}
        </DrawerHeader>
        <ul className="flex flex-col gap-2">
          {navData?.map((path) => (
            <NavItem navItemPath={path} key={path?.path} />
          ))}

          <Authenticate>
            <li className="flex flex-row h-12 gap-0 rtl:flex-row-reverse ">
              {/* <div className="h-full w-1 bg-agzakhana-primary rounded-tr-full rounded-br-full" /> */}
              <DrawerClose asChild>
                <Link
                  href="/cart"
                  className=" text-base  flex flex-row  rounded-lg items-center gap-2 py-2 px-4 transition duration-300 font-semibold hover:bg-gray-200 dark:hover:bg-card-background-dark w-full dark:text-gray-200"
                >
                  <Icon
                    icon="vaadin:cart-o"
                    height={20}
                    width={20}
                    className=""
                  />
                  {t("HEADER.CART")}
                  {totalItems && (
                    <span className="ml-auto rtl:ml-0 rtl:mr-auto bg-rose-600 min-w-6 min-h-6 p-1 aspect-square rounded-full text-white flex items-center justify-center text-sm font-base">
                      {totalItems}
                    </span>
                  )}
                </Link>
              </DrawerClose>
            </li>
          </Authenticate>
        </ul>
        <DrawerFooter>
          <NavUser />
        </DrawerFooter>
      </DrawerContent>
    </>
  );
}

type NavItemProps = {
  navItemPath: NavPath;
};
function NavItem({ navItemPath }: NavItemProps) {
  if (navItemPath?.children)
    return (
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="collapsed"
        // value={commentsSize}
        // onValueChange={(newVal) => setCommentsSize(newVal as any)}
      >
        <AccordionItem value="expanded">
          <AccordionTrigger className="rounded-lg font-semibold text-base items-center  hover:no-underline cursor-pointer hover:bg-gray-200 dark:hover:bg-card-background-dark gap-2 py-2 px-4 h-12 dark:text-gray-200">
            <div className="flex flex-row items-center gap-2">
              <Icon icon={navItemPath?.icon} height={20} width={20} />
              {navItemPath?.label}
            </div>
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance pb-0">
            <ul className="px-4 ">
              {navItemPath?.children?.map((child) => (
                <li
                  className="flex flex-row rtl:flex-row-reverse h-10 gap-0 "
                  key={child?.path}
                >
                  {/* <div className="h-full w-1 bg-agzakhana-primary rounded-tr-full rounded-br-full" /> */}
                  <DrawerClose asChild>
                    <Link
                      href={child?.path}
                      className=" text-base mr-5 flex flex-row  rounded-lg items-center gap-2 py-2 px-4 transition duration-300 font-semibold hover:bg-gray-200 dark:hover:bg-card-background-dark w-full text-gray-700 dark:text-gray-200"
                    >
                      <Icon icon={child?.icon} height={20} width={20} />
                      {child?.label}
                    </Link>
                  </DrawerClose>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  return (
    <li className="flex flex-row h-12 gap-0 rtl:flex-row-reverse ">
      {/* <div className="h-full w-1 bg-agzakhana-primary rounded-tr-full rounded-br-full" /> */}
      <DrawerClose asChild>
        <Link
          href={navItemPath?.path}
          className=" text-base  flex flex-row  rounded-lg items-center gap-2 py-2 px-4 transition duration-300 font-semibold hover:bg-gray-200 w-full dark:text-gray-200 dark:hover:bg-card-background-dark"
        >
          <Icon icon={navItemPath?.icon} height={20} width={20} />
          {navItemPath?.label}
        </Link>
      </DrawerClose>
    </li>
  );
}
