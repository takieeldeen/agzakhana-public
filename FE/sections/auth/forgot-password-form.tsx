"use client";
import RHFForm from "@/components/rhf-form";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import RHFTextfield from "@/components/rhf-textfield";
import { LoadingButton } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { forgetPassword } from "@/client-api/auth";
import { pushMessage } from "@/components/toast-message";

export default function ForgotPasswordForm() {
  const t = useTranslations();
  const loginFormSchema = z.object({
    email: z.email(
      t("FORM_VALIDATIONS.INVALID_FORMAT", { field: t("LOGIN.EMAIL") })
    ),
  });
  const defaultValues = {
    email: "",
  };

  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  const {
    formState: { isSubmitting },
  } = methods;
  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const res = await forgetPassword({ email: data?.email });
        pushMessage({
          variant: "success",
          subtitle: res?.data?.message,
        });
      } catch {
        pushMessage({
          variant: "fail",
          subtitle: t("VALIDATIONS.RESET_PASSWORD_FAIL"),
        });
      }
    },
    [t]
  );
  return (
    <RHFForm methods={methods} onSubmit={onSubmit} className="w-full md:w-128">
      <RHFTextfield
        name="email"
        label={t("LOGIN.EMAIL")}
        placeholder={t("LOGIN.EMAIL")}
        inputProps={{
          className: "h-12 font-semibold text-base md:text-lg",
          type: "email",
        }}
        labelProps={{ className: "text-base font-semibold" }}
      />

      <LoadingButton
        loading={isSubmitting}
        className="bg-agzakhana-primary text-white text-base font-semibold py-6"
      >
        {t("FORGOT_PASSWORD.RESET_PASSWORD")}
      </LoadingButton>

      <p className="flex flex-row gap-2 self-center text-gray-800 dark:text-gray-400">
        {t("LOGIN.DON'T_HAVE_AN_ACCOUNT")}
        <Link
          href="/sign-up"
          className="font-semibold md:font-bold text-text-primary hover:underline dark:text-gray-200"
        >
          {t("LOGIN.SIGN_UP_FOR_FREE")}
        </Link>
      </p>
    </RHFForm>
  );
}
