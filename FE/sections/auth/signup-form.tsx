/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import RHFForm from "@/components/rhf-form";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import RHFTextfield from "@/components/rhf-textfield";
import { Button, LoadingButton } from "@/components/ui/button";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { register } from "@/api/auth";

export default function SignupForm() {
  // State Management ////////////////////////////////
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const t = useTranslations();
  const loginFormSchema = z.object({
    email: z.email(
      t("FORM_VALIDATIONS.INVALID_FORMAT", { field: t("LOGIN.EMAIL") })
    ),
    password: z
      .string()
      .refine(
        (val) => val !== "",
        t("FORM_VALIDATIONS.REQUIRED_FIELD", { field: t("LOGIN.PASSWORD") })
      )
      .min(8, t("VALIDATIONS.PASSWORD_MIN_LENGTH")),
    passwordConfirmation: z
      .string()
      .min(
        1,
        t("FORM_VALIDATIONS.REQUIRED_FIELD", { field: t("LOGIN.PASSWORD") })
      )
      .max(20, t("VALIDATIONS.PASSWORD_MAX_LENGTH"))
      .refine((val) => val !== "sad"),
  });
  const defaultValues = {
    email: "",
    password: "",
    passwordConfirmation: "",
  };
  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  const {
    watch,
    formState: { dirtyFields, isSubmitting },
  } = methods;
  const values = watch();
  const onSubmit = useCallback(async (data: any) => {
    try {
      await register(data);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const IS_DIRTY_PASSWORD = dirtyFields.password;
  const IS_DIRTY_CONFIRM_PASSWORD = dirtyFields.passwordConfirmation;
  // Password validation checks ///////////////////////
  const PASSWORD_SHORT =
    values.password.length > 0 && values.password.length < 8;
  const PASSWORD_MEDIUM =
    values.password.length >= 8 && values.password.length <= 12;
  const PASSWORD_STRONG = values.password.length > 12;
  const PASSWORD_LONG_ENOUGH = values.password.length >= 8;
  const PASSWORD_HAS_UPPERCASE = /[A-Z]/.test(values.password);
  const PASSWORD_HAS_SPECIAL_CHAR = /[!@#$%^&*(),.?":{}|<>]/.test(
    values.password
  );
  const PASSWORDS_MATCH = values.password === values.passwordConfirmation;
  return (
    <RHFForm methods={methods} onSubmit={onSubmit} className="w-128">
      <Button className="border-2 bg-transparent flex flex-row gap-2 text-text-primary text-base font-semibold py-6 border-gray-300">
        <Icon icon="flat-color-icons:google" className="h-8! w-8!" />
        {t("SIGNUP.SIGNUP_WITH_GOOGLE")}
      </Button>
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
        labelProps={{ className: "text-base font-semibold" }}
        className="gap-1"
      />
      <RHFTextfield
        name="passwordConfirmation"
        label={t("RESET_PASSWORD.CONFIRM_PASSWORD")}
        placeholder={t("RESET_PASSWORD.CONFIRM_PASSWORD")}
        inputProps={{
          className: "h-10 font-semibold text-lg",
          type: showConfirmPassword ? "text" : "password",
          endAdornment: (
            <Button
              className="bg-transparent text-text-primary"
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              <Icon
                icon={
                  showConfirmPassword
                    ? "majesticons:eye-off-line"
                    : "mdi:eye-outline"
                }
                className=" w-5! h-5! text-gray-600"
              />
            </Button>
          ),
        }}
        labelProps={{ className: "text-base font-semibold" }}
        className="gap-1"
      />
      <div className="flex flex-row gap-2 h-2">
        <span
          className={cn(
            "w-1/3 rounded-l-full rtl:rounded-l-none rtl:rounded-r-full transition-all duration-300",
            PASSWORD_SHORT && "bg-red-700",
            PASSWORD_MEDIUM && "bg-orange-400",
            PASSWORD_STRONG && "bg-agzakhana-primary",
            values?.password?.length > 12 && "bg-agzakhana-primary",
            !IS_DIRTY_PASSWORD && "bg-gray-300"
          )}
        ></span>
        <span
          className={cn(
            "w-1/3 bg-agzakhana-primary",
            PASSWORD_SHORT && "bg-gray-300",
            PASSWORD_MEDIUM && "bg-orange-400",
            PASSWORD_STRONG && "bg-agzakhana-primary",
            values?.password?.length > 12 && "bg-agzakhana-primary",
            !IS_DIRTY_PASSWORD && "bg-gray-300"
          )}
        ></span>
        <span
          className={cn(
            "w-1/3 bg-agzakhana-primary rounded-r-full rtl:rounded-r-none rtl:rounded-l-full",
            PASSWORD_SHORT && "bg-gray-300",
            PASSWORD_MEDIUM && "bg-gray-300",
            PASSWORD_STRONG && "bg-agzakhana-primary",
            !IS_DIRTY_PASSWORD && "bg-gray-300"
          )}
        ></span>
      </div>
      <Separator className="my-4" />
      <ul>
        <li className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon="charm:cross"
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                PASSWORD_LONG_ENOUGH ? "text-green-700" : "text-red-700",
                !IS_DIRTY_PASSWORD && "text-gray-500"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500",
                PASSWORD_LONG_ENOUGH ? "text-green-700" : "text-red-700",
                !IS_DIRTY_PASSWORD && "text-gray-500"
              )}
            >
              {t("RESET_PASSWORD.MIN_8_CHARACTERS")}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon="charm:cross"
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                PASSWORD_HAS_UPPERCASE ? "text-green-700" : "text-red-700",
                !IS_DIRTY_PASSWORD && "text-gray-500"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500",
                PASSWORD_HAS_UPPERCASE ? "text-green-700" : "text-red-700",
                !IS_DIRTY_PASSWORD && "text-gray-500"
              )}
            >
              {t("RESET_PASSWORD.PASSWORD_CASE")}
            </span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon="charm:cross"
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                PASSWORD_HAS_SPECIAL_CHAR ? "text-green-700" : "text-red-700",
                !IS_DIRTY_PASSWORD && "text-gray-500"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500",
                PASSWORD_HAS_SPECIAL_CHAR ? "text-green-700" : "text-red-700",
                !IS_DIRTY_PASSWORD && "text-gray-500"
              )}
            >
              {t("RESET_PASSWORD.SPECIAL_CHAR")}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon="charm:cross"
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500",
                PASSWORDS_MATCH ? "text-green-700" : "text-red-700",
                !IS_DIRTY_CONFIRM_PASSWORD && "text-gray-500"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500",
                PASSWORDS_MATCH ? "text-green-700" : "text-red-700",
                !IS_DIRTY_CONFIRM_PASSWORD && "text-gray-500"
              )}
            >
              {t("RESET_PASSWORD.PASSWORD_MATCH")}
            </span>
          </div>
        </li>
      </ul>

      <LoadingButton
        loading={isSubmitting}
        className="bg-agzakhana-primary text-white text-base font-semibold py-6"
      >
        {t("SIGNUP.CREATE_ACCOUNT")}
      </LoadingButton>

      <p className="flex flex-row gap-2 self-center text-gray-800">
        {t("SIGNUP.ALREADY_HAVE_AN_ACCOUNT")}
        <Link
          href="/login"
          className="font-bold text-text-primary hover:underline"
        >
          {t("SIGNUP.SIGN_IN")}
        </Link>
      </p>
    </RHFForm>
  );
}
