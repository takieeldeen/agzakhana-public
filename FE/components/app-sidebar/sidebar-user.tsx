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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { DrawerClose } from "../ui/drawer";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { logout } from "@/api/auth";

export function NavUser() {
  // Custom Hooks //////////////////////////////////
  const { user } = useAuth();
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations();
  // Helper Constants //////////////////////////////////
  const isDark = resolvedTheme === "dark";
  const { logout: logoutLocally } = useAuth();
  const router = useRouter();
  // Callback Fns //////////////////////////////////
  const handleLogout = useCallback(async () => {
    await logout();
    logoutLocally();
    router.refresh();
  }, [logoutLocally, router]);
  const handleToggleTheme = useCallback(async () => {
    setTheme(resolvedTheme === "light" ? "dark" : "light");
  }, [resolvedTheme, setTheme]);
  if (!user) return null;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        > */}
        <Button className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-16 bg-gray-200 dark:bg-card-background-dark">
          <Avatar className="h-11 w-11" onClick={() => router.push("/profile")}>
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
          <div className="grid flex-1 text-left text-sm leading-tight text-gray-700 dark:text-gray-200 rtl:text-right">
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
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-card-background-dark"
        // side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal ">
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
            <DrawerClose
              className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-full"
              onClick={() => router.push("/profile")}
            >
              <Icon icon="solar:user-outline" />
              {t("PROFILE.NAVBAR_TITLE")}
            </DrawerClose>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DrawerClose
              className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-full"
              onClick={() => router.push("/cart")}
            >
              <Icon icon="vaadin:cart-o" />
              {t("HEADER.CART")}
            </DrawerClose>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <DrawerClose
              className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-full"
              onClick={handleToggleTheme}
            >
              <Icon icon={isDark ? "circum:light" : "circum:dark"} />
              {isDark
                ? t("HEADER.SWITCH_TO_LIGHT_MODE")
                : t("HEADER.SWITCH_TO_DARK_MODE")}
            </DrawerClose>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <DrawerClose
            className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-full"
            onClick={handleLogout}
          >
            <Icon icon="si:sign-out-duotone" />
            {t("HEADER.SIGN_OUT")}
          </DrawerClose>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
