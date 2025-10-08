import { Separator } from "@/components/ui/separator";
import LoginForm from "../login-form";
import { getTranslations } from "next-intl/server";
import Logo from "@/components/logo";

export default async function LoginView() {
  const t = await getTranslations("");
  return (
    <div className="flex items-center justify-center pt-12 py-32 flex-col gap-6">
      <div className="flex flex-col items-center gap-1">
        <div className="mb-12">
          <Logo className="w-72 h-28" />
        </div>
        <h2 className="font-bold text-2xl md:text-4xl dark:text-gray-200">
          {t("LOGIN.PAGE_TITLE")}
        </h2>
        <p className="mb-2 md:mb-6 dark:text-gray-400 text-sm md:text-base text-center md:text-left md:rtl:text-right">
          {t("LOGIN.PAGE_SUBTITLE")}{" "}
        </p>
        <Separator />
      </div>
      <LoginForm />
    </div>
  );
}
