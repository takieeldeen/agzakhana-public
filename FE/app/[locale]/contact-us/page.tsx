"use client";
import { sendMessage } from "@/api/messages";
import RHFForm from "@/components/rhf-form";
import RHFTextarea from "@/components/rhf-textarea";
import RHFTextfield from "@/components/rhf-textfield";
import { pushMessage } from "@/components/toast-message";
import { LoadingButton } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
export default function ContactUsPage() {
  const t = useTranslations();
  const formSchema = z.object({
    firstName: z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("CONTACT_US.FIRST_NAME"),
      })
    ),
    lastName: z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("CONTACT_US.LAST_NAME"),
      })
    ),
    email: z
      .email(
        t("FORM_VALIDATIONS.INVALID_FORMAT", {
          field: t("CONTACT_US.EMAIL"),
        })
      )
      .min(
        1,
        t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("CONTACT_US.EMAIL"),
        })
      ),
    message: z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("CONTACT_US.MESSAGE"),
      })
    ),
  });
  const defaultValues = useMemo(
    () => ({
      firstName: "",
      lastName: "",
      email: "",
      message: "",
    }),
    []
  );
  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = useCallback(
    async (data: any) => {
      try {
        await sendMessage(data);
        pushMessage({
          variant: "success",
          subtitle: t("TOAST.MESSAGE_SENT"),
        });
        reset();
      } catch (err) {
        console.log(err);
        pushMessage({
          variant: "fail",
          subtitle: t("TOAST.ERROR_SENDING_MESSAGE"),
        });
      }
    },
    [reset, t]
  );
  return (
    <section className="grid grid-cols-2 py-16">
      {/* Left Section */}
      <div className="flex items-center justify-center ">
        {/* Form Card */}
        <div className="w-4/5 bg-gray-200 rounded-md p-4 flex flex-col gap-4 py-8 dark:bg-card-background-dark">
          <div className="flex flex-col gap-2">
            <h3 className="text-4xl font-bold dark:text-gray-200">
              {t("CONTACT_US.CONTACT_US_TITLE")}
            </h3>
            <span className="w-full font-semibold text-gray-500 dark:text-gray-400">
              {t("CONTACT_US.CONTACT_US_SUBTITLE")}
            </span>
          </div>
          <RHFForm methods={methods} onSubmit={onSubmit}>
            <div className="flex flex-row gap-2">
              <RHFTextfield
                label={t("CONTACT_US.FIRST_NAME")}
                name="firstName"
                mandatoryField
                className="w-full"
                inputProps={{
                  className: "border-gray-300 h-12 text-[16px]! ",
                  placeholder: t("CONTACT_US.FIRST_NAME"),
                }}
              />
              <RHFTextfield
                name="lastName"
                label={t("CONTACT_US.LAST_NAME")}
                className="w-full"
                mandatoryField
                inputProps={{
                  className: "border-gray-300 h-12 text-[16px]!",
                  placeholder: t("CONTACT_US.LAST_NAME"),
                }}
              />
            </div>
            <RHFTextfield
              name="email"
              label={t("CONTACT_US.EMAIL")}
              mandatoryField
              className="w-full"
              inputProps={{
                className: "border-gray-300 h-12 text-[16px]!",
                placeholder: t("CONTACT_US.EMAIL"),
              }}
            />
            <RHFTextarea
              name="message"
              label={t("CONTACT_US.MESSAGE")}
              mandatoryField
              className="w-full"
              inputProps={{
                className: "border-gray-300 h-24 text-[16px]!",
                placeholder: t("CONTACT_US.MESSAGE"),
              }}
            />
            <LoadingButton
              className="bg-agzakhana-primary h-12 font-bold dark:text-white"
              loading={isSubmitting}
            >
              {t("CONTACT_US.SUBMIT")}
            </LoadingButton>
          </RHFForm>
        </div>
      </div>
      <div className="">
        <ul className="flex flex-col gap-3 h-full">
          <li className="bg-gray-200 rounded-md h-full flex flex-row items-center justify-around gap-8 px-12 hover:bg-agzakhana-primary dark:hover:bg-agzakhana-primary dark:hover:text-card-background-dark transition-all duration-300 hover:text-white dark:bg-card-background-dark dark:text-gray-300">
            <Icon icon="tdesign:location" className="text-6xl" />
            <div className="w-full flex flex-col gap-0.5">
              <p className="font-semibold">{t("CONTACT_US.ADDRESS")}</p>
              <p>{t("CONTACT_US.ADDRESS_VAL_1")}</p>
              <p>{t("CONTACT_US.ADDRESS_VAL_2")}</p>
            </div>
          </li>
          <li className="bg-gray-200 rounded-md h-full flex flex-row items-center justify-around gap-8 px-12 hover:bg-agzakhana-primary dark:hover:bg-agzakhana-primary dark:hover:text-card-background-dark transition-all duration-300 hover:text-white dark:bg-card-background-dark dark:text-gray-300">
            <Icon icon="mingcute:phone-line" className="text-6xl" />
            <div className="w-full flex flex-col gap-0.5">
              <p className="font-semibold">{t("CONTACT_US.CONTACT")}</p>
              <p>{t("CONTACT_US.CONTACT_VAL_1")}</p>
              <p>{t("CONTACT_US.CONTACT_VAL_2")}</p>
            </div>
          </li>
          <li className="bg-gray-200 rounded-md h-full flex flex-row items-center justify-around gap-8 px-12 hover:bg-agzakhana-primary dark:hover:bg-agzakhana-primary dark:hover:text-card-background-dark transition-all duration-300 hover:text-white dark:bg-card-background-dark dark:text-gray-300">
            <Icon icon="mage:email" className="text-6xl" />
            <div className="w-full flex flex-col gap-0.5">
              <p className="font-semibold">{t("CONTACT_US.EMAIL")}</p>
              <p>{t("CONTACT_US.EMAIL_VAL_1")}</p>
              <p>{t("CONTACT_US.EMAIL_VAL_2")}</p>
            </div>
          </li>
          <li className="bg-gray-200 rounded-md h-full flex flex-row items-center justify-around gap-8 px-12 hover:bg-agzakhana-primary dark:hover:bg-agzakhana-primary dark:hover:text-card-background-dark transition-all duration-300 hover:text-white dark:bg-card-background-dark dark:text-gray-300">
            <Icon icon="material-symbols:alarm-outline" className="text-6xl" />
            <div className="w-full flex flex-col gap-0.5">
              <p className="font-semibold">{t("CONTACT_US.WORKING_HOURS")}</p>
              <p>{t("CONTACT_US.WORKING_HOURS_VAL_1")}</p>
              <p>{t("CONTACT_US.WORKING_HOURS_VAL_2")}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
