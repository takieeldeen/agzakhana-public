import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { Drawer, DrawerTrigger } from "../ui/drawer";
import MobileNavbar from "./mobile-navbar";
import { useTranslations } from "next-intl";

export default function DashboardMobileSidebar() {
  const [activeItem, setActiveItem] = useState("");
  const t = useTranslations();
  return (
    <Drawer direction="right" onClose={() => setActiveItem("")}>
      <aside className="fixed bottom-0 left-0 z-50 h-18 w-full bg-background shadow-[0_-4px_12px_rgba(0,0,0,0.1)] flex flex-row dark:bg-dark-card ">
        <ul className="w-full flex flex-row justify-around items-center">
          <DrawerTrigger>
            <li
              className={cn("flex flex-col items-center gap-1")}
              onClick={() => setActiveItem("MENU")}
            >
              <div
                className={cn(
                  " px-3 py-1 rounded-4xl transition-all duration-300 text-gray-500 ",
                  activeItem === "MENU" && "bg-emerald-100/50 dark:bg-dark-975"
                )}
              >
                <Icon
                  icon="mingcute:menu-fill"
                  className={cn(
                    "h-7 w-7 dark:text-gray-300",

                    activeItem === "MENU" && "text-emerald-600"
                  )}
                />
              </div>
              <p
                className={cn(
                  "flex flex-col items-center gap-1 dark:text-gray-300",
                  activeItem === "MENU" &&
                    "text-emerald-600 dark:text-emerald-600"
                )}
              >
                {t("DASHBOARD_NAV_BAR.MENU")}
              </p>
            </li>
          </DrawerTrigger>
          <li
            className={cn("flex flex-col items-center gap-1")}
            onClick={() => setActiveItem("CHAT")}
          >
            <div
              className={cn(
                " px-3 py-1 rounded-4xl transition-all duration-300 text-gray-500",
                activeItem === "CHAT" && "bg-emerald-100/50 dark:bg-dark-975"
              )}
            >
              <Icon
                icon="akar-icons:chat-dots"
                className={cn(
                  "h-7 w-7 dark:text-gray-300",

                  activeItem === "CHAT" && "text-emerald-600"
                )}
              />
            </div>
            <p
              className={cn(
                "flex flex-col items-center gap-1 dark:text-gray-300",
                activeItem === "CHAT" &&
                  "text-emerald-600 dark:text-emerald-600"
              )}
            >
              {t("DASHBOARD_NAV_BAR.CHAT")}
            </p>
          </li>
          <li
            className={cn("flex flex-col items-center gap-1")}
            onClick={() => setActiveItem("NOTIFICATION")}
          >
            <div
              className={cn(
                " px-3 py-1 rounded-4xl transition-all duration-300 text-gray-500",
                activeItem === "NOTIFICATION" &&
                  "bg-emerald-100/50 dark:bg-dark-975"
              )}
            >
              <Icon
                icon="solar:bell-linear"
                className={cn(
                  "h-7 w-7 dark:text-gray-300",

                  activeItem === "NOTIFICATION" && "text-emerald-600"
                )}
              />
            </div>
            <p
              className={cn(
                "flex flex-col items-center gap-1 dark:text-gray-300",
                activeItem === "NOTIFICATION" &&
                  "text-emerald-600 dark:text-emerald-600"
              )}
            >
              {t("DASHBOARD_NAV_BAR.NOTIFICATIONS")}
            </p>
          </li>
          <li
            className={cn("flex flex-col items-center gap-1")}
            onClick={() => setActiveItem("SEARCH")}
          >
            <div
              className={cn(
                " px-3 py-1 rounded-4xl transition-all duration-300 text-gray-500",
                activeItem === "SEARCH" && "bg-emerald-100/50 dark:bg-dark-975"
              )}
            >
              <Icon
                icon="ri:search-line"
                className={cn(
                  "h-7 w-7 dark:text-gray-300",

                  activeItem === "SEARCH" && "text-emerald-600"
                )}
              />
            </div>
            <p
              className={cn(
                "flex flex-col items-center gap-1 dark:text-gray-300",
                activeItem === "SEARCH" &&
                  "text-emerald-600 dark:text-emerald-600"
              )}
            >
              {t("DASHBOARD_NAV_BAR.SEARCH")}
            </p>
          </li>
          <li
            className={cn("flex flex-col items-center gap-1")}
            onClick={() => setActiveItem("PROFILE")}
          >
            <div
              className={cn(
                " px-3 py-1 rounded-4xl transition-all duration-300 text-gray-500",
                activeItem === "PROFILE" && "bg-emerald-100/50 dark:bg-dark-975"
              )}
            >
              <Icon
                icon="gg:profile"
                className={cn(
                  "h-7 w-7 dark:text-gray-300",
                  activeItem === "PROFILE" && "text-emerald-600 "
                )}
              />
            </div>
            <p
              className={cn(
                "flex flex-col items-center gap-1 dark:text-gray-300",
                activeItem === "PROFILE" &&
                  "text-emerald-600 dark:text-emerald-600"
              )}
            >
              {t("DASHBOARD_NAV_BAR.PROFILE")}
            </p>
          </li>
        </ul>
      </aside>
      <MobileNavbar />
    </Drawer>
  );
}
