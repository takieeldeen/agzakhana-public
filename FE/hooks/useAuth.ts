"use client";
import { AuthContext } from "@/providers/auth-provider";
import { useContext } from "react";

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw Error("useAuth must be used inside of auth provider");
  return value;
}
