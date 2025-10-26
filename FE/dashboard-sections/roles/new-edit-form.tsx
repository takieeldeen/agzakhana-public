import * as Z from "zod";
import { RHFComboxbox } from "@/components/rhf-combobox";
import RHFForm from "@/components/rhf-form";
import RHFTextarea from "@/components/rhf-textarea";
import RHFTextfield from "@/components/rhf-textfield";
import { Button, LoadingButton } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { ORDER_BY_OPTIONS } from "./constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutateRole } from "@/app/dashboard-api/roles";
import { Role } from "@/app/dashboard-types/roles";

type NewEditFormProps = {
  open: boolean;
  onClose: VoidFunction;
  refetch: VoidFunction;
  currentRole?: Role;
};
export default function NewEditForm({
  open,
  onClose,
  refetch,
  currentRole,
}: NewEditFormProps) {
  const locale = useLocale();
  const t = useTranslations();
  const { createRole } = useMutateRole();
  const schema = Z.object({
    nameAr: Z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("COMMON.NAME_AR"),
      })
    ),
    nameEn: Z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("COMMON.NAME_EN"),
      })
    ),
    descriptionAr: Z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("COMMON.DESC_AR"),
      })
    ),
    descriptionEn: Z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("COMMON.DESC_EN"),
      })
    ),
    permissions: Z.array(
      Z.object({
        _id: Z.string(),
        nameAr: Z.string(),
        nameEn: Z.string(),
        value: Z.string(),
      })
    ).min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("COMMON.DESC_EN"),
      })
    ),
  });
  const defaultValues = useMemo(
    () => ({
      nameAr: currentRole?.nameAr ?? "",
      nameEn: currentRole?.nameEn ?? "",
      descriptionAr: currentRole?.descriptionAr ?? "",
      descriptionEn: currentRole?.descriptionEn ?? "",
      permissions: [],
    }),
    [
      currentRole?.descriptionAr,
      currentRole?.descriptionEn,
      currentRole?.nameAr,
      currentRole?.nameEn,
    ]
  );
  const methods = useForm({ defaultValues, resolver: zodResolver(schema) });
  const {
    formState: { isSubmitting },
  } = methods;
  const onSubmit = useCallback(
    async (data: Z.output<typeof schema>) => {
      await createRole.mutateAsync(data);
      refetch();
      console.log(data);
    },
    [createRole, refetch]
  );
  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction={locale === "ar" ? "right" : "left"}
    >
      <DrawerContent className="border-r-0! p-0! border-l-0! bg-slate-50 dark:bg-dark-background">
        <DrawerHeader className="bg-emerald-600 p-1 gap-0! py-4 px-2 rtl:items-start relative">
          <DrawerClose className="" asChild>
            <Button className="h-12 w-12 bg-emerald-600 hover:bg-emerald-700 absolute top-0 right-0 rtl:right-auto rtl:left-0 p-0 rounded-none shadow-none">
              <Icon
                icon="basil:cross-solid"
                className="h-8! w-8! dark:text-white"
              />
            </Button>
          </DrawerClose>
          <div className="flex flex-row gap-2 items-center">
            <Icon icon="gg:add" className="text-3xl text-white" />
            <div className="flex flex-col rtl:items-start">
              <DrawerTitle className="text-white text-lg">
                {t("COMMON.CREATION_TITLE", {
                  ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
                })}
              </DrawerTitle>
              <DrawerDescription className="text-muted dark:text-gray-300">
                {t("COMMON.CREATION_SUBTITLE", {
                  ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
                })}
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>
        <RHFForm
          methods={methods}
          onSubmit={onSubmit as any}
          className="p-3 gap-0 h-full"
        >
          <div className="flex-1">
            <RHFTextfield
              name="nameAr"
              label={t("COMMON.NAME_AR")}
              placeholder={t("COMMON.NAME_AR")}
              inputProps={{
                className: "h-12",
              }}
            />
            <RHFTextfield
              name="nameEn"
              label={t("COMMON.NAME_EN")}
              placeholder={t("COMMON.NAME_EN")}
              inputProps={{
                className: "h-12",
              }}
            />
            <RHFTextarea
              name="descriptionAr"
              label={t("COMMON.DESC_AR")}
              placeholder={t("COMMON.DESC_AR")}
              inputProps={{
                className: "h-24",
              }}
            />
            <RHFTextarea
              name="descriptionEn"
              label={t("COMMON.DESC_EN")}
              placeholder={t("COMMON.DESC_EN")}
              inputProps={{
                className: "h-24",
              }}
            />
            <RHFComboxbox
              multiple
              name="permissions"
              label={t("ROLES_MANAGEMENT.PERMISSIONS")}
              placeholder={t("ROLES_MANAGEMENT.PERMISSIONS")}
              options={ORDER_BY_OPTIONS}
              getOptionLabel={(option) => {
                if (!option) return "";
                return locale === "ar" ? option?.nameAr : option?.nameEn;
              }}
              optionValueComparator={(option, value) =>
                option?._id === value?._id
              }
            />
          </div>
          <DrawerFooter className="gap-0! py-2 px-0 ">
            <div className="flex flex-row gap-2 h-12 items-stretch">
              <Button
                className="flex-1 h-full border-border border-2 dark:border-gray-500 dark:text-gray-300"
                variant="ghost"
                onClick={onClose}
              >
                {t("COMMON.CANCEL")}
              </Button>
              <LoadingButton
                className="flex-1 h-full bg-emerald-600 dark:text-white"
                loading={isSubmitting}
              >
                {t("COMMON.CREATE", {
                  ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                })}
              </LoadingButton>
            </div>
          </DrawerFooter>
        </RHFForm>
      </DrawerContent>
    </Drawer>
  );
}
