"use client";

import { useResponsive } from "@/hooks/use-responsive";
import DashbaordSidebarDesktop from "./dashboard-sidebar-desktop";
import DashboardMobileSidebar from "./dashboard-sidebar-mobile";

export default function DashboardSidebar() {
  const mdUp = useResponsive("up", "md");
  if (mdUp) return <DashbaordSidebarDesktop />;
  return <DashboardMobileSidebar />;
}
