"use client";
import RHFForm from "@/components/rhf-form";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z } from "zod";
import RHFTextfield from "@/components/rhf-textfield";
import { Button, LoadingButton } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasword } from "@/client-api/auth";
import { pushMessage } from "@/components/toast-message";

export default function ResetPasswordForm() {
  // State Management ////////////////////////////////
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const t = useTranslations();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const loginFormSchema = z.object({
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
    password: "",
    passwordConfirmation: "",
  };
  const methods = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues,
  });
  const {
    watch,
    setError,
    formState: { dirtyFields, isSubmitting },
    reset,
  } = methods;
  const values = watch();
  const IS_DIRTY_PASSWORD = dirtyFields.password;
  // Password validation checks ///////////////////////
  const PASSWORD_LONG_ENOUGH = values.password.length >= 8;
  const PASSWORD_HAS_UPPERCASE = /[A-Z]/.test(values.password);
  const PASSWORD_HAS_SPECIAL_CHAR = /[!@#$%^&*(),.?":{}|<>]/.test(
    values.password
  );
  const PASSWORDS_MATCH = values.password === values.passwordConfirmation;
  const onSubmit = useCallback(
    async (data: any) => {
      try {
        data.token = token;
        await resetPasword(data);
        pushMessage({
          variant: "success",
          subtitle: t("RESET_PASSWORD.RESET_SUCCESS"),
        });
        reset();
        router.push("/");
      } catch (err: any) {
        if (err?.isFormError) {
          // for(const [key,value] )
          for (const [key, value] of Object.entries(
            err?.error?.errorObject ?? {}
          )) {
            setError(key as any, { type: "custom", message: value as any });
          }
        }
        pushMessage({
          variant: "fail",
          subtitle: t("RESET_PASSWORD.RESET_FAILED"),
        });
      }
    },
    [reset, router, setError, t, token]
  );
  return (
    <RHFForm methods={methods} onSubmit={onSubmit} className="w-full md:w-128">
      <RHFTextfield
        name="password"
        label={t("LOGIN.PASSWORD")}
        placeholder={t("LOGIN.PASSWORD")}
        inputProps={{
          className: "h-[48px] font-semibold text-base md:text-lg",
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
          className: "h-[48px] font-semibold text-base md:text-lg",
          type: showConfirmPassword ? "text" : "password",
          endAdornment: (
            <Button
              className="bg-transparent text-text-primary"
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
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
      <div className="flex flex-row gap-2 h-2">
        <span
          className={cn(
            "w-1/3 rounded-l-full rtl:rounded-l-none rtl:rounded-r-full transition-all duration-300",
            values?.password?.length <= 8 && "bg-red-700",
            values?.password?.length > 8 &&
              values?.password?.length <= 12 &&
              "bg-orange-400",
            values?.password?.length > 12 && "bg-agzakhana-primary",
            !IS_DIRTY_PASSWORD && "bg-gray-300 dark:bg-gray-700"
          )}
        ></span>
        <span
          className={cn(
            "w-1/3 bg-agzakhana-primary",
            values?.password?.length <= 8 && "bg-red-700",
            values?.password?.length > 8 &&
              values?.password?.length <= 12 &&
              "bg-orange-400",
            values?.password?.length > 12 && "bg-agzakhana-primary",
            !IS_DIRTY_PASSWORD && "bg-gray-300 dark:bg-gray-700"
          )}
        ></span>
        <span
          className={cn(
            "w-1/3 bg-agzakhana-primary rounded-r-full rtl:rounded-r-none rtl:rounded-l-full",
            values?.password?.length <= 8 && "bg-red-700",
            values?.password?.length > 8 &&
              values?.password?.length <= 12 &&
              "bg-orange-400",
            values?.password?.length > 12 && "bg-agzakhana-primary",
            !IS_DIRTY_PASSWORD && "bg-gray-300 dark:bg-gray-700"
          )}
        ></span>
      </div>
      <Separator className="my-4" />
      <ul>
        <li className="flex flex-col gap-2">
          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon={PASSWORD_LONG_ENOUGH ? "stash:check-solid" : "charm:cross"}
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                PASSWORD_LONG_ENOUGH
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400",
                !IS_DIRTY_PASSWORD && "text-gray-500 dark:text-gray-300"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500 dark:text-gray-300",
                PASSWORD_LONG_ENOUGH
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400",
                !IS_DIRTY_PASSWORD && "text-gray-500 dark:text-gray-300"
              )}
            >
              {t("RESET_PASSWORD.MIN_8_CHARACTERS")}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon={
                PASSWORD_HAS_UPPERCASE ? "stash:check-solid" : "charm:cross"
              }
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                PASSWORD_HAS_UPPERCASE
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400",
                !IS_DIRTY_PASSWORD && "text-gray-500 dark:text-gray-300"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500 dark:text-gray-300",
                PASSWORD_HAS_UPPERCASE
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400",
                !IS_DIRTY_PASSWORD && "text-gray-500 dark:text-gray-300"
              )}
            >
              {t("RESET_PASSWORD.PASSWORD_CASE")}
            </span>
          </div>

          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon={
                PASSWORD_HAS_SPECIAL_CHAR ? "stash:check-solid" : "charm:cross"
              }
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                PASSWORD_HAS_SPECIAL_CHAR
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400",
                !IS_DIRTY_PASSWORD && "text-gray-500 dark:text-gray-300"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500 dark:text-gray-300",
                PASSWORD_HAS_SPECIAL_CHAR
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400",
                !IS_DIRTY_PASSWORD && "text-gray-500 dark:text-gray-300"
              )}
            >
              {t("RESET_PASSWORD.SPECIAL_CHAR")}
            </span>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Icon
              icon={PASSWORDS_MATCH ? "stash:check-solid" : "charm:cross"}
              width={22}
              height={22}
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500 dark:text-gray-300",
                PASSWORDS_MATCH
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400"
              )}
            />
            <span
              className={cn(
                "transition-all duration-300",
                "font-semibold text-gray-500 dark:text-gray-300",
                PASSWORDS_MATCH
                  ? "text-green-700 dark:text-green-400/80"
                  : "text-red-700 dark:text-red-400"
                // !IS_DIRTY_CONFIRM_PASSWORD && "text-gray-500 dark:text-gray-300"
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
        {t("RESET_PASSWORD.RESET_PASSWORD")}
      </LoadingButton>
    </RHFForm>
  );
}
