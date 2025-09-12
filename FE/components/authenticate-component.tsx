"use client";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};
export default function Authenticate({ children }: Props) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return null;
  return children;
}
