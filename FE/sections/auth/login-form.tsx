"use client";
import RHFForm from "@/components/rhf-form";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import RHFTextfield from "@/components/rhf-textfield";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { login } from "@/api/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GoogleAuthButton from "@/components/google-auth-button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { pushMessage } from "@/components/toast-message";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
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

  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const res = await login(data);
        loginLocally(res?.data?.user);
        router.push("/");
      } catch (err: any) {
        pushMessage({ variant: "fail", subtitle: err?.message });
        console.log(err);
      }
    },
    [loginLocally, router]
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
        labelProps={{ className: "text-base font-normal md:font-semibold" }}
      />
      <RHFTextfield
        name="password"
        label={t("LOGIN.PASSWORD")}
        placeholder={t("LOGIN.PASSWORD")}
        inputProps={{
          className: "h-12 font-semibold text-base md:text-lg",
          type: showPassword ? "text" : "password",
          endAdornment: (
            <Button
              className="bg-transparent text-text-primary"
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              <Icon
                icon={
                  showPassword ? "majesticons:eye-off-line" : "mdi:eye-outline"
                }
                className=" w-5! h-5! text-gray-600"
              />
            </Button>
          ),
        }}
        labelProps={{ className: "text-base font-normal md:font-semibold" }}
        className="gap-1"
      />
      <Link
        href="/forgot-password"
        className="font-semibold md:font-bold hover:underline transition-all duration-300 dark:text-gray-300"
      >
        {t("LOGIN.FORGOT_PASSWORD")}
      </Link>
      <Button
        className="bg-agzakhana-primary text-white text-base font-semibold py-6"
        disabled={isSubmitting}
      >
        {t("LOGIN.LOGIN")}
      </Button>
      <GoogleAuthButton />
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
