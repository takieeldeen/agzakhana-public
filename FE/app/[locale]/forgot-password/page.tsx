import { GuestGuard } from "@/components/auth-guard";
import { ForgetPasswordView } from "@/sections/auth/views";

export default function ForgotPasswordPage() {
  return (
    <GuestGuard>
      <ForgetPasswordView />
    </GuestGuard>
  );
}
