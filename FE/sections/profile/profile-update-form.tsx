import * as zod from "zod";
import RHFForm from "@/components/rhf-form";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { useLocale, useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import RHFTextfield from "@/components/rhf-textfield";
import { UserType } from "@/types/users";
import RHFImagePicker from "@/components/rhf-imagePicker";
import { RHFDatePicker } from "@/components/rhf-datePicker";
import RHFRadioGroup from "@/components/rhf-radiogroup";
import { Button, LoadingButton } from "@/components/ui/button";
import { updateProfile } from "@/client-api/auth";
import { pushMessage } from "@/components/toast-message";
import { useAuth } from "@/hooks/useAuth";
import { ScrollArea } from "@/components/ui/scroll-area";

type ProfileUpdateFormProps = {
  onOpenChange: (open: boolean) => void;
  open: boolean;
  currentUser: UserType | undefined;
};
export default function ProfileUpdateForm({
  onOpenChange,
  open,
  currentUser,
}: ProfileUpdateFormProps) {
  const locale = useLocale();
  const { login: loginLocally } = useAuth();
  const t = useTranslations();
  const formSchema = zod.object({
    email: zod.email("Please Enter a valid email"),
    name: zod.string(),
    birthDate: zod
      .date()
      .max(
        new Date(),
        t("FORM_VALIDATIONS.PAST_DATE", {
          field: t("PROFILE.BIRTH_DATE"),
        })
      )
      .nullable(),
    phoneNumber: zod.string().refine(
      (value) => {
        return value === "" || /^(01[0125]\d{8})$/.test(value);
      },
      {
        message: t("FORM_VALIDATIONS.INVALID_FORMAT", {
          field: t("PROFILE.PHONE"),
        }),
      }
    ),
    address: zod.string(),
    gender: zod.enum(["MALE", "FEMALE"]),
    imageUrl: zod.union([
      zod.string(), // existing URL
      zod
        .any()
        .refine(
          (value) => {
            if (!value) return true; // allow empty
            const file = value?.[0];
            return file instanceof File;
          },
          { message: "Invalid image file" }
        )
        .refine(
          (value) => {
            const file = value?.[0];
            if (!file) return true;
            return file.size <= 5 * 1024 * 1024; // ≤ 5MB
          },
          { message: "Image must be smaller than 5MB" }
        )
        .refine(
          (value) => {
            const file = value?.[0];
            if (!file) return true;
            return file.type?.startsWith("image/");
          },
          { message: "Only image files are allowed" }
        ),
    ]),
  });
  const defaultValues = {
    email: currentUser?.email ?? "",
    name: currentUser?.name ?? "",
    birthDate: currentUser?.birthDate ? new Date(currentUser?.birthDate) : null,
    phoneNumber: currentUser?.phoneNumber ?? "",
    address: currentUser?.address ?? "",
    gender: currentUser?.gender ?? "MALE",
    imageUrl: currentUser?.imageUrl ?? null,
  };

  const methods = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues,
  });
  const {
    formState: { isSubmitting, isDirty },
    reset,
  } = methods;
  const onSubmit = useCallback(
    async (data: any) => {
      try {
        const res = await updateProfile(data);
        loginLocally(res?.data?.user);
        reset(res?.data?.user);
        onOpenChange(false);
        pushMessage({
          variant: "success",
          subtitle: t("PROFILE.UPDATE_SUCCESS"),
        });
      } catch (err: any) {
        console.log(err);
        pushMessage({ variant: "fail", subtitle: t("PROFILE.UPDATE_FAIL") });
      }
    },
    [loginLocally, onOpenChange, reset, t]
  );
  return (
    <Drawer
      direction={locale === "ar" ? "right" : "left"}
      onOpenChange={onOpenChange}
      open={open}
    >
      <DrawerContent className="data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-none md:data-[vaul-drawer-direction=right]:w-3/4 data-[vaul-drawer-direction=right]:sm:max-w-sm dark:bg-card-background-dark">
        <ScrollArea className="h-full">
          <RHFForm
            onSubmit={onSubmit}
            methods={methods}
            className="flex flex-col h-full"
          >
            <DrawerHeader>
              <h3 className="text-left text-lg font-bold rtl:text-right dark:text-gray-200 md:text-2xl">
                {t("PROFILE.UPDATE_FORM_TITLE")}
              </h3>
            </DrawerHeader>

            <div className="px-4 h-full ">
              <RHFImagePicker
                name="imageUrl"
                label={t("PROFILE.PROFILE_PICTURE")}
              />
              <RHFTextfield
                name="email"
                label={t("LOGIN.EMAIL")}
                placeholder={t("LOGIN.EMAIL")}
                inputProps={{
                  className: "h-12 font-semibold text-base ",
                  type: "email",
                  disabled: true,
                }}
                labelProps={{
                  className: "text-base font-normal md:font-semibold",
                }}
              />
              <RHFTextfield
                name="name"
                label={t("PROFILE.USERNAME")}
                placeholder={t("PROFILE.USERNAME")}
                inputProps={{
                  className: "h-12 font-semibold text-base ",
                }}
                labelProps={{
                  className: "text-base font-normal md:font-semibold",
                }}
              />
              <RHFDatePicker
                name="birthDate"
                label={t("PROFILE.BIRTH_DATE")}
                placeholder={t("PROFILE.BIRTH_DATE")}
                clearable
              />
              <RHFTextfield
                name="phoneNumber"
                label={t("PROFILE.PHONE")}
                placeholder={t("PROFILE.PHONE")}
                inputProps={{
                  className: "h-12 font-semibold text-base ",
                }}
                labelProps={{
                  className: "text-base font-normal md:font-semibold",
                }}
              />
              <RHFTextfield
                name="address"
                label={t("PROFILE.ADDRESS")}
                placeholder={t("PROFILE.ADDRESS")}
                inputProps={{
                  className: "h-12 font-semibold text-base ",
                }}
                labelProps={{
                  className: "text-base font-normal md:font-semibold",
                }}
              />
              <RHFRadioGroup
                label={t("PROFILE.GENDER")}
                name="gender"
                options={[
                  { label: t("PROFILE.MALE"), value: "MALE" },
                  { label: t("PROFILE.FEMALE"), value: "FEMALE" },
                ]}
              />
            </div>
            <DrawerFooter className="">
              <div className="flex flex-row items-center justify-between">
                <DrawerClose asChild>
                  <Button
                    className="w-[49%] h-12 border-agzakhana-primary border-2 dark:text-gray-200"
                    variant={"outline"}
                  >
                    {t("PROFILE.CANCEL")}
                  </Button>
                </DrawerClose>
                <LoadingButton
                  type="submit"
                  disabled={!isDirty || isSubmitting}
                  loading={isSubmitting}
                  className="w-[49%] h-12 bg-agzakhana-primary text-white"
                >
                  {t("PROFILE.UPDATE")}
                </LoadingButton>
              </div>
            </DrawerFooter>
          </RHFForm>
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  );
}
