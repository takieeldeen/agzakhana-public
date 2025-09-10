"use client";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: React.ReactNode;
};
export default function Authenticate({ children }: Props) {
  console.log("isAuthenticated");
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated, "isAuthenticated");
  if (!isAuthenticated) return null;
  return children;
}
