"use client";
import { useLocale } from "next-intl";
import { Toaster } from "sonner";

export default function DashboardToaster() {
  const locale = useLocale();
  return <Toaster dir={locale === "ar" ? "rtl" : "ltr"} />;
}
