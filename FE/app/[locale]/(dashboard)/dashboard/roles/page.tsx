import ListView from "@/dashboard-sections/roles/views/list-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roles Management Page",
  description: "Page for listing all the roles inside the system.",
};

export default function RolesPage() {
  return <ListView />;
}
