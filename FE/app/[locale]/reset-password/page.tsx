import { ResetPasswordView } from "@/sections/auth/views";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset your password",
};

export default async function ResetPasswordForm({
  searchParams,
}: {
  searchParams: Promise<any>;
}) {
  const { token } = await searchParams;
  return <ResetPasswordView token={token} />;
}
