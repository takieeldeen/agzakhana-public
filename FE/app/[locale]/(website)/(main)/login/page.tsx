import { GuestGuard } from "@/components/auth-guard";
import { LoginView } from "@/sections/auth/views";

export default function Login() {
  return (
    <GuestGuard>
      <LoginView />
    </GuestGuard>
  );
}
