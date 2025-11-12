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
      id: "ROLES_MANAGEMENT_1",
      label: t("DASHBOARD_NAV_BAR.USER_MANAGEMENT"),
      path: paths.dashboard.users.list,
      icon: "solar:key-broken",
    },
    {
      id: "USERS_MANAGEMENT",
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
