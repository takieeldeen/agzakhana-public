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
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginForm() {
  const t = useTranslations();
  const router = useRouter();
  const { login: loginLocally } = useAuth();
  const loginFormSchema = z.object({
    email: z.email(
      t("FORM_VALIDATIONS.INVALID_FORMAT", { field: t("LOGIN.EMAIL") })
    ),
    password: z
      .string()
      .min(
        1,
        t("FORM_VALIDATIONS.REQUIRED_FIELD", { field: t("LOGIN.PASSWORD") })
      ),
  });
  const defaultValues = {
    email: "",
    password: "",
  };
  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  const {
    formState: { isSubmitting },
  } = methods;
  const onSubmit = useCallback(async (data: any) => {
    try {
      const res = await login(data);
      loginLocally(res?.data?.user);
      router.push("/");
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <RHFForm methods={methods} onSubmit={onSubmit} className="w-128">
      <RHFTextfield
        name="email"
        label={t("LOGIN.EMAIL")}
        placeholder={t("LOGIN.EMAIL")}
        inputProps={{ className: "h-10 font-semibold text-lg", type: "email" }}
        labelProps={{ className: "text-base font-semibold" }}
      />
      <RHFTextfield
        name="password"
        label={t("LOGIN.PASSWORD")}
        placeholder={t("LOGIN.PASSWORD")}
        inputProps={{
          className: "h-10 font-semibold text-lg",
          type: "password",
        }}
        labelProps={{ className: "text-base font-semibold" }}
        className="gap-1"
      />
      <Link
        href="/forgot-password"
        className="font-bold hover:underline transition-all duration-300"
      >
        {t("LOGIN.FORGOT_PASSWORD")}
      </Link>
      <Button
        className="bg-agzakhana-primary text-white text-base font-semibold py-6"
        disabled={isSubmitting}
      >
        {t("LOGIN.LOGIN")}
      </Button>
      <Button className="border-2 bg-transparent flex flex-row gap-2 text-text-primary text-base font-semibold py-6 border-gray-300">
        <Icon icon="flat-color-icons:google" className="h-8! w-8!" />
        {t("LOGIN.SIGN_IN_WITH_GOOGLE")}
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
