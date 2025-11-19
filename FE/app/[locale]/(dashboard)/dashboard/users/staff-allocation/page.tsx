import KanbanView from "@/dashboard-sections/staff-allocation/views/kanban-view";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staff Allocation Page",
  description: "Page for distributing all the users to the branches.",
};

export default function StaffAllocation() {
  return <KanbanView />;
}
