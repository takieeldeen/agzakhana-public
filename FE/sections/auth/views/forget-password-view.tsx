import { getTranslations } from "next-intl/server";
import ForgotPasswordForm from "../forgot-password-form";

export default async function ForgetPasswordView() {
  const t = await getTranslations("");

  return (
    <div className="flex items-center justify-center py-32 flex-col gap-4">
      <div className="flex flex-col items-center gap-1">
        <h2 className="font-bold text-4xl dark:text-gray-200">
          {t("FORGOT_PASSWORD.PAGE_TITLE")}
        </h2>
        <p className="mb-6 dark:text-gray-400">
          {t("FORGOT_PASSWORD.PAGE_SUBTITLE")}
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
