import NewEditForm from "@/dashboard-sections/users/new-edit-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create New User",
  description: "Add a new user to the system",
};

export default function CreateUserPage() {
  return <NewEditForm />;
}
