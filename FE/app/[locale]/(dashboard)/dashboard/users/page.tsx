import ListView from "@/dashboard-sections/users/views/list-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users Management Page",
  description: "Page for listing all the users inside the system.",
};

export default function RolesPage() {
  return <ListView />;
}
