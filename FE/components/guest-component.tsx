"use client";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};
export default function GuestOnly({ children }: Props) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return null;
  return children;
}
