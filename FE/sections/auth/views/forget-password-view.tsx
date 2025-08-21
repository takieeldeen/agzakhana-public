import { Separator } from "@/components/ui/separator";
import { getTranslations } from "next-intl/server";
import ForgotPasswordForm from "../forgot-password-form";

export default async function ForgetPasswordView() {
  const t = await getTranslations("");

  return (
    <div className="flex items-center justify-center py-32 flex-col gap-6">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-4xl">
          {t("FORGOT_PASSWORD.PAGE_TITLE")}
        </h2>
        <p className="mb-6">{t("FORGOT_PASSWORD.PAGE_SUBTITLE")}</p>
        <Separator />
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
