import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import ResetPasswordForm from "../reset-password-form";

export default async function LoginView() {
  const t = await getTranslations("");
  return (
    <div className="flex items-center justify-center py-32 flex-col gap-6">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-4xl">{t("RESET_PASSWORD.PAGE_TITLE")}</h2>
        <p className="mb-6">{t("RESET_PASSWORD.PAGE_SUBTITLE")}</p>
        <Separator />
      </div>
      <ResetPasswordForm />
    </div>
  );
}
