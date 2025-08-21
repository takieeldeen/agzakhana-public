/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import RHFForm from "@/components/rhf-form";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import RHFTextfield from "@/components/rhf-textfield";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";

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
  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);
  return (
    <RHFForm methods={methods} onSubmit={onSubmit} className="w-128">
      <RHFTextfield
        name="email"
        label={t("LOGIN.EMAIL")}
        placeholder={t("LOGIN.EMAIL")}
        inputProps={{ className: "h-10 font-semibold text-lg", type: "email" }}
        labelProps={{ className: "text-base font-semibold mb-2" }}
      />

      <Button className="bg-agzakhana-primary text-white text-base font-semibold py-6">
        {t("FORGOT_PASSWORD.RESET_PASSWORD")}
      </Button>

      <p className="flex flex-row gap-2 self-center text-gray-800">
        {t("LOGIN.DON'T_HAVE_AN_ACCOUNT")}
        <Link
          href="/sign-up"
          className="font-bold text-text-primary hover:underline"
        >
          {t("LOGIN.SIGN_UP_FOR_FREE")}
        </Link>
      </p>
    </RHFForm>
  );
}
