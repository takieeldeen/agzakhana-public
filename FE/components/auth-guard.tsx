"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import CircularProgress from "./circular-progress";

export function AuthGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, userLoading } = useAuth();
  const router = useRouter();
  if (!isAuthenticated && !userLoading) {
    router.push("/");
    return null;
  }
  if (userLoading)
    return (
      <div className="w-full h-full flex items-center justify-center min-h-64">
        <CircularProgress className="h-36 w-36" />
      </div>
    );
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
