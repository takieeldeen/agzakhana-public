import { Separator } from "@/components/ui/separator";
import LoginForm from "../login-form";
import { getTranslations } from "next-intl/server";

export default async function LoginView() {
  const t = await getTranslations("");
  return (
    <div className="flex items-center justify-center py-32 flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
        <h2 className="font-bold text-4xl dark:text-gray-200">
          {t("LOGIN.PAGE_TITLE")}
        </h2>
        <p className="mb-6 dark:text-gray-400">{t("LOGIN.PAGE_SUBTITLE")} </p>
        <Separator />
      </div>
      <LoginForm />
    </div>
  );
}
