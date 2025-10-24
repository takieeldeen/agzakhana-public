"use client";
import { cn } from "@/lib/utils";
import Logo from "../logo";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import { useDashboardSidebar } from "./dashboard-sidebar-provider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Tab, useDashboardNavData } from "./sidebar-nav-data";
import { useLocale } from "next-intl";
import EllipsisTypography from "../ellipsis-typography";

export default function DashbaordSidebarDesktop({
  mobile = false,
}: {
  mobile?: boolean;
}) {
  const { collapsed: navbarCollapsed, onToggleCollapse } =
    useDashboardSidebar();
  const { tabs } = useDashboardNavData();
  const locale = useLocale();
  const isRtl = locale === "ar";
  const collapsed = navbarCollapsed && !mobile;
  return (
    <motion.aside
      animate={{ width: collapsed ? 96 : 304 }} // 24rem -> 304px, 6rem -> 96px
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className={cn(
        "border-r-2 rtl:border-r-0 rtl:border-l-2 h-full p-3 flex flex-col items-center sticky top-0 dark:bg-dark-card ",
        mobile && "border-r-0 border-l-0 rtl:border-r-0 rtl:border-l-0",
        collapsed && "px-1"
      )}
    >
      {!mobile && (
        <Button
          onClick={onToggleCollapse}
          className="h-8 w-8 rounded-full p-0 absolute left-full rtl:right-full rtl:left-0 -translate-x-1/2 rtl:translate-x-1/2 -translate-y-1/2 top-12 bg-slate-50 dark:bg-dark-card border-2 "
        >
          <Icon
            icon={isRtl ? "charm:chevron-right" : "charm:chevron-left"}
            className={cn(
              "w-4! h-4! text-slate-500 transition-all duration-300",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      )}
      {collapsed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Icon
            icon="solar:key-broken"
            className="h-12 w-12 text-agzakhana-primary mb-6"
          />
        </motion.div>
      )}
      {!collapsed && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Logo className={cn("w-12 mb-6", mobile && "w-24")} />
        </motion.div>
      )}
      <ul className="w-full flex flex-col gap-2">
        {tabs?.map((tab) => (
          <NavItem key={tab?.id} tab={tab} mobile={mobile} />
        ))}
      </ul>
    </motion.aside>
  );
}

function NavItem({ tab, mobile = false }: { tab: Tab; mobile?: boolean }) {
  const {
    collapsed: navbarCollapsed,
    onTabClick,
    activeTab,
    openedMenu,
    activeChild,
  } = useDashboardSidebar();
  const collapsed = navbarCollapsed && !mobile;

  // Helper Constants /////////////////////////////////////////
  const locale = useLocale();
  const isRtl = locale === "ar";
  const IS_ACTIVE = activeTab === tab?.id;
  const HAS_CHILDREN = (tab?.children?.length ?? 0) > 0;
  const MENU_OPENED = tab?.id === openedMenu;
  const HAS_ACTIVE_CHILD = !!tab?.children?.find(
    (tab) => tab?.id === activeChild
  );

  const CollapsedMenuNavItem = (
    <li>
      <Popover
        open={MENU_OPENED}
        onOpenChange={() => onTabClick(tab?.id, HAS_CHILDREN)}
      >
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex flex-row items-center rounded-md gap-3 h-12 hover:bg-gray-200 dark:hover:bg-dark-800 transition-all font-semibold text-muted-foreground cursor-pointer p-3 w-full text-base relative",
              collapsed &&
                "flex flex-col gap-0 justify-between h-19 w-full overflow-hidden py-2",
              IS_ACTIVE &&
                "bg-[#5BE49B]/15 text-emerald-600 dark:text-emerald-400 hover:bg-[#5BE49B]/25",
              MENU_OPENED && "bg-gray-200",
              HAS_ACTIVE_CHILD &&
                "bg-[#5BE49B]/15 text-emerald-600 dark:text-emerald-400 hover:bg-[#5BE49B]/25"
            )}
          >
            <div className="flex flex-row gap-2 relative">
              <Icon icon={tab?.icon} className="h-6! w-6! " />
              {HAS_CHILDREN && collapsed && (
                <Icon
                  icon={isRtl ? "charm:chevron-left" : "charm:chevron-right"}
                  className={cn(
                    "ml-auto transition-all duration-300 absolute left-[120%] rtl:left-0 rtl:right-[120%] top-2   "
                  )}
                />
              )}
            </div>
            <EllipsisTypography
              className={cn(
                "text-center",
                collapsed && "text-xs",
                (IS_ACTIVE || MENU_OPENED || HAS_ACTIVE_CHILD) && "font-bold"
              )}
              maxLines={2}
            >
              {tab?.label ?? "--"}
            </EllipsisTypography>
            {/* <span
              className={cn(
                "text-center",
                collapsed && "text-xs",
                (IS_ACTIVE || MENU_OPENED || HAS_ACTIVE_CHILD) && "font-bold"
              )}
            >
              {tab?.label ?? "--"}
            </span> */}
            {HAS_CHILDREN && !collapsed && (
              <Icon
                icon="charm:chevron-right"
                className={cn(
                  "ml-auto transition-all duration-300",
                  MENU_OPENED && "rotate-90 "
                )}
              />
            )}
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="p-2 bg-slate-50 dark:bg-dark-background rtl:mr-2 ml-2"
          side="right"
        >
          {MENU_OPENED && (
            <ul className="flex flex-col gap-2 relative">
              {tab?.children?.map((tab) => (
                <ChildNavItem key={tab?.id} tab={tab} />
              ))}
            </ul>
          )}
        </PopoverContent>
      </Popover>
    </li>
  );
  const RegularMenuNavItem = (
    <li>
      <div
        onClick={() => onTabClick(tab?.id, HAS_CHILDREN)}
        className={cn(
          "flex flex-row items-center rounded-md gap-3 h-12 hover:bg-gray-200 dark:hover:bg-dark-800 transition-all font-semibold text-muted-foreground dark:text-muted-foreground cursor-pointer p-3 w-full text-base relative",
          collapsed && "flex flex-col gap-2 h-19 w-full overflow-hidden py-2",
          IS_ACTIVE &&
            "bg-[#5BE49B]/15 text-emerald-600 dark:text-emerald-500 hover:bg-[#5BE49B]/25 font-bold",
          MENU_OPENED && "bg-gray-200 dark:bg-dark-800",
          HAS_ACTIVE_CHILD &&
            "bg-[#5BE49B]/15 text-emerald-600 dark:text-emerald-500 hover:bg-[#5BE49B]/25 font-bold"
        )}
      >
        <div className="flex flex-row gap-2 relative">
          <Icon icon={tab?.icon} className="h-6! w-6! " />
          {HAS_CHILDREN && collapsed && (
            <Icon
              icon={isRtl ? "charm:chevron-left" : "charm:chevron-right"}
              className={cn(
                "ml-auto rtl:ml-0 rtl:mr-auto transition-all duration-300 absolute left-[120%] rtl:left-0 rtl:right-[120%] top-2   "
              )}
            />
          )}
        </div>
        <span
          className={cn(
            "text-center transition-all duration-300",
            collapsed && "text-xs",
            (IS_ACTIVE || HAS_ACTIVE_CHILD || MENU_OPENED) && "font-bold"
          )}
        >
          {tab?.label ?? "--"}
        </span>
        {HAS_CHILDREN && !collapsed && (
          <Icon
            icon={isRtl ? "charm:chevron-left" : "charm:chevron-right"}
            className={cn(
              "ml-auto rtl:mr-auto rtl:ml-0 transition-all duration-300",
              MENU_OPENED && "rotate-90 rtl:-rotate-90 "
            )}
          />
        )}
      </div>
      {MENU_OPENED && !collapsed && (
        <ul className="pl-10 rtl:pr-10 rtl:pl-0 flex flex-col gap-2 py-2 relative before:absolute before:top-2 before:left-6 rtl:before:left-0 rtl:before:right-6 before:h-[calc(100%_-_40px)] before:w-[2px] before:bg-gray-200 dark:before:bg-dark-800">
          {tab?.children?.map((tab) => (
            <ChildNavItem key={tab?.id} tab={tab} />
          ))}
        </ul>
      )}
    </li>
  );
  if (collapsed) return CollapsedMenuNavItem;
  return RegularMenuNavItem;
}

function ChildNavItem({
  tab,
}: {
  tab: { id: string; label: string; path: string };
}) {
  const { onTabClick, activeChild, collapsed } = useDashboardSidebar();
  // Helper Constants /////////////////////////////////////////
  const IS_ACTIVE = activeChild === tab?.id;

  return (
    <li
      onClick={() => onTabClick(tab?.id, false, true)}
      key={tab?.id}
      className={cn(
        "h-9 flex items-center rounded-md pl-2 rtl:pl-0 rtl:pr-2 text-sm font-semibold text-muted-foreground hover:bg-gray-200 dark:hover:bg-dark-800 cursor-pointer transition-all duration-300 relative  ",
        IS_ACTIVE &&
          "bg-gray-200 dark:bg-dark-800 dark:text-gray-300 font-bold",
        !collapsed &&
          "before:absolute before:top-2 before:border-b-2 before:border-l-2 rtl:before:border-l-0  rtl:before:border-r-2 ltr:before:rounded-bl-4xl  rtl:before:rounded-br-4xl  before:-left-4 rtl:before:-right-4 before:h-3 before:border-gray-200 dark:   dark:before:border-dark-800 before:w-4 rtl:before:w-3"
      )}
    >
      {tab?.label}
    </li>
  );
}
