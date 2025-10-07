"use client";

// import {
//   IconCreditCard,
//   IconDotsVertical,
//   IconLogout,
//   IconNotification,
//   IconUserCircle,
// } from "@tabler/icons-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { DrawerClose } from "../ui/drawer";

export function NavUser() {
  const { user } = useAuth();
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const t = useTranslations();
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        > */}
        <Button className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-16 bg-gray-200">
          <Link href="/profile">
            <Avatar className="h-11 w-11">
              <AvatarImage
                key={user?.imageUrl} // 🔑 ensures reload when URL changes
                src={user?.imageUrl}
                alt="@shadcn"
                referrerPolicy="no-referrer"
              />
              <AvatarFallback className="bg-gray-300 font-semibold text-xl ">
                {user?.name
                  ?.split(" ")
                  ?.slice(0, 2)
                  ?.map((el) => el[0])
                  ?.join(" ")}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div className="grid flex-1 text-left text-sm leading-tight text-gray-700 rtl:text-right">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
        </Button>
        {/* <IconDotsVertical className="ml-auto size-4" /> */}
        {/* </SidebarMenuButton> */}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        // side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center rtl:flex-row-reverse gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user.imageUrl} alt={user.name} />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight rtl:text-right">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-muted-foreground truncate text-xs">
                {user.email}
              </span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <DrawerClose>
              <Link
                href="/profile"
                className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-full"
              >
                <Icon icon="solar:user-outline" />
                {t("PROFILE.NAVBAR_TITLE")}
              </Link>
            </DrawerClose>
          </DropdownMenuItem>
          <DropdownMenuItem className="rtl:flex-row-reverse">
            <Icon icon="vaadin:cart-o" />
            {t("HEADER.CART")}
          </DropdownMenuItem>
          <DropdownMenuItem className="rtl:flex-row-reverse">
            <Icon icon={isDark ? "circum:light" : "circum:dark"} />
            {isDark
              ? t("HEADER.SWITCH_TO_LIGHT_MODE")
              : t("HEADER.SWITCH_TO_DARK_MODE")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="rtl:flex-row-reverse">
          <Icon icon="si:sign-out-duotone" />
          {/* <IconLogout /> */}
          {t("HEADER.SIGN_OUT")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
