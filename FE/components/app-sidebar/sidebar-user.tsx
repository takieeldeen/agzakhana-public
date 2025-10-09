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
import Authenticate from "../authenticate-component";

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
  // if (!user) return null;
  console.log(user);
  return (
    <DropdownMenu>
      {!!user && (
        <DropdownMenuTrigger asChild>
          <Authenticate>
            <Button className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-16 bg-gray-200 dark:bg-card-background-dark">
              {
                <>
                  <Avatar
                    className="h-11 w-11"
                    onClick={() => router.push("/profile")}
                  >
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
                    <span className="truncate font-medium">{user?.name}</span>
                    <span className="text-muted-foreground truncate text-xs">
                      {user?.email}
                    </span>
                  </div>
                </>
              }
            </Button>
          </Authenticate>
        </DropdownMenuTrigger>
      )}
      {!user && (
        <DropdownMenuTrigger asChild>
          <Button className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground h-16 bg-gray-200 dark:bg-card-background-dark dark:text-gray-200 flex flex-row items-center gap-2">
            <Icon
              icon="material-symbols-light:settings-outline"
              className="h-6! w-6!"
            />
            {t("COMMON.SETTINGS")}
          </Button>
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg bg-card-background-dark"
        // side={isMobile ? "bottom" : "right"}
        align="end"
        sideOffset={4}
      >
        <Authenticate>
          <DropdownMenuLabel className="p-0 font-normal ">
            <div className="flex items-center rtl:flex-row-reverse gap-2 px-1 py-1.5 text-left text-sm">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user?.imageUrl} alt={user?.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight rtl:text-right">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
        </Authenticate>

        <DropdownMenuGroup>
          <Authenticate>
            <DropdownMenuItem>
              <DrawerClose
                className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-12"
                onClick={() => router.push("/profile")}
              >
                <Icon icon="solar:user-outline" className="h-6! w-6!" />
                {t("PROFILE.NAVBAR_TITLE")}
              </DrawerClose>
            </DropdownMenuItem>
          </Authenticate>
          <Authenticate>
            <DropdownMenuItem>
              <DrawerClose
                className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-12"
                onClick={() => router.push("/cart")}
              >
                <Icon icon="vaadin:cart-o" className="h-6! w-6!" />
                {t("HEADER.CART")}
              </DrawerClose>
            </DropdownMenuItem>
          </Authenticate>
          <DropdownMenuItem>
            <DrawerClose
              className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-12"
              onClick={handleToggleTheme}
            >
              <Icon
                icon={isDark ? "circum:light" : "circum:dark"}
                className="h-6! w-6!"
              />
              {isDark
                ? t("HEADER.SWITCH_TO_LIGHT_MODE")
                : t("HEADER.SWITCH_TO_DARK_MODE")}
            </DrawerClose>
          </DropdownMenuItem>
          {!user && (
            <DropdownMenuItem>
              <DrawerClose
                className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-12"
                onClick={() => router.push("/login")}
              >
                <Icon icon="si:sign-out-duotone" className="h-6! w-6!" />
                {t("HEADER.SIGN_IN")}
              </DrawerClose>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <Authenticate>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <DrawerClose
              className="flex flex-row items-center gap-2 rtl:flex-row-reverse text-right  w-full h-12"
              onClick={handleLogout}
            >
              <Icon icon="si:sign-out-duotone" className="h-6! w-6!" />
              {t("HEADER.SIGN_OUT")}
            </DrawerClose>
          </DropdownMenuItem>
        </Authenticate>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
