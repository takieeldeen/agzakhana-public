import { getTranslations } from "next-intl/server";
import ResetPasswordForm from "../reset-password-form";
import { checkResetToken } from "@/api/auth";
import Link from "next/link";
import ErrorView from "@/components/error-view";

export default async function LoginView({ token }: { token: string }) {
  const t = await getTranslations("");
  const { status, content, error } = await checkResetToken({ token });
  console.log(status, content, error);
  if (error)
    return (
      <ErrorView
        title={t("FORGOT_PASSWORD.TOKEN_ERROR_TITLE")}
        subtitle={t("FORGOT_PASSWORD.TOKEN_ERROR_SUBTITLE")}
        actionLink="/forgot-password"
        actionTitle={t("FORGOT_PASSWORD.BACK_TO_FORGET_PASSWORD")}
      />
    );
  return (
    <div className="flex items-center justify-center py-32 flex-col gap-6">
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl md:text-4xl dark:text-gray-200">
          {t("RESET_PASSWORD.PAGE_TITLE")}
        </h2>
        <p className="mb-2 md:mb-6 dark:text-gray-400 text-sm md:text-base">
          {t("RESET_PASSWORD.PAGE_SUBTITLE")}
        </p>
      </div>
      <ResetPasswordForm />
    </div>
  );
}
