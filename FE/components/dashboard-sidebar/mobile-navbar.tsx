import { DrawerContent } from "../ui/drawer";
import DashbaordSidebarDesktop from "./dashboard-sidebar-desktop";

export default function MobileNavbar() {
  return (
    <DrawerContent>
      <DashbaordSidebarDesktop mobile />
    </DrawerContent>
  );
}
