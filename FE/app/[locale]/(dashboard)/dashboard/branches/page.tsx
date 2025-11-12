import ListView from "@/dashboard-sections/branches/views/list-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Branches Page",
  description: "Page for listing all the branches inside the system.",
};

export default function RolesPage() {
  return <ListView />;
}
