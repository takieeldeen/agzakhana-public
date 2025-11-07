import { ReactNode } from "react";
import View404 from "./views/404";

export default function ErrorGuard({
  error,
  children,
}: {
  error: Error | null;
  children: ReactNode;
}) {
  if (error?.message === "not-found") return <View404 />;
  return children;
}
