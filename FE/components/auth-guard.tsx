"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (!isAuthenticated) {
    router.push("/");
    return null;
  }
  return <>{children}</>;
}

export function GuestGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  if (isAuthenticated) {
    router.push("/");
    return null;
  }
  return <>{children}</>;
}
