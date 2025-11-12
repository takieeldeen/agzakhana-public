import NewEditForm from "@/dashboard-sections/users/new-edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit User",
  description: "Edit User Information",
};

export default function EditUserPage() {
  return <NewEditForm />;
}
