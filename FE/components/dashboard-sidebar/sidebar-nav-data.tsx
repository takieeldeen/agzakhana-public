"use client";
import { useTranslations } from "next-intl";
import { paths } from "./paths";

export type Tab = {
  id: string;
  label: string;
  path: string;
  icon: string;
  children?: { id: string; label: string; path: string }[];
};
export const useDashboardNavData = () => {
  const t = useTranslations();
  const tabs: Tab[] = [
    {
      id: "ROLES_MANAGEMENT_1",
      label: t("DASHBOARD_NAV_BAR.BRANCHES_MANAGEMENT"),
      path: paths.dashboard.branches.list,
      icon: "streamline-plump:store-2",
    },
    {
      id: "USER_MANAGEMENT_GROUP",
      label: t("DASHBOARD_NAV_BAR.USER_MANAGEMENT"),
      path: paths.dashboard.users.list,
      icon: "mynaui:users",
      children: [
        {
          id: "USER_LIST",
          label: t("DASHBOARD_NAV_BAR.USER_MANAGEMENT"),
          path: paths.dashboard.users.list,
        },
        {
          id: "USER_DISTRIBUTION",
          label: t("DASHBOARD_NAV_BAR.USERS_DISTRIBUTION"),
          path: paths.dashboard.users.allocation,
        },
        {
          id: "SHIFT_MANAGEMENT",
          label: t("STAFF_ALLOCATION.SHIFT_MANAGEMENT"),
          path: paths.dashboard.shifts.list,
        },
      ],
    },
    {
      id: "PERMISSIONS_MANAGEMENT_GROUP",
      label: t("DASHBOARD_NAV_BAR.PERMISSIONS_MANAGEMENT"),
      path: paths.dashboard.roles.list,
      icon: "solar:key-broken",
      children: [
        {
          id: "ROLES_MANAGEMENT",
          label: t("DASHBOARD_NAV_BAR.ROLES_MANAGEMENT"),
          path: paths.dashboard.roles.list,
        },
        {
          id: "PERMISSIONS_MANAGEMENT",
          label: t("DASHBOARD_NAV_BAR.PERMISSIONS_MANAGEMENT"),
          path: paths.dashboard.permissions.list,
        },
      ],
    },
  ];
  return { tabs };
};
