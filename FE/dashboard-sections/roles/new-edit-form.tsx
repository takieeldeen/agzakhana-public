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
import { useCallback, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetRoleDetails, useMutateRole } from "@/app/dashboard-api/roles";
import { Role } from "@/app/dashboard-types/roles";
import { useGetPermissionsHelper } from "@/app/dashboard-api/helpers";
import { cn } from "@/lib/utils";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";
import { Spinner } from "@/components/ui/spinner";

type NewEditFormProps = {
  open: boolean;
  onClose: VoidFunction;
  refetch: VoidFunction;
  mode?: "NEW" | "EDIT";
  currentRole?: Role;
  roleId?: string;
};
export default function NewEditForm({
  open,
  onClose,
  refetch,
  currentRole,
  mode = "NEW",
  roleId,
}: NewEditFormProps) {
  const locale = useLocale();
  const t = useTranslations();
  const fetchRole = mode === "EDIT" && !!roleId && !currentRole;
  const { data: fetchedRole, isLoading } = useGetRoleDetails(roleId, {
    enabled: fetchRole,
  });
  const isEdit = currentRole || mode === "EDIT";
  console.log(isEdit, currentRole, mode);
  const { createRole, editRole } = useMutateRole();
  const { data: permissions, isLoading: permissionsLoading } =
    useGetPermissionsHelper();
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
      permissions:
        currentRole?.permissionGroups?.flatMap((group) => group.permissions) ??
        [],
    }),
    [
      currentRole?.descriptionAr,
      currentRole?.descriptionEn,
      currentRole?.nameAr,
      currentRole?.nameEn,
      currentRole?.permissionGroups,
    ]
  );
  const methods = useForm({ defaultValues, resolver: zodResolver(schema) });
  const {
    formState: { isSubmitting },
    reset,
  } = methods;
  const onSubmit = useCallback(
    async (data: Z.output<typeof schema>) => {
      try {
        if (isEdit) {
          (data as any)._id = currentRole?._id ?? fetchedRole?._id;
          await editRole.mutateAsync(data);
          onClose();
          pushDashboardMessage({
            title: t("COMMON.SUCCESS_DIALOG_TITLE"),
            subtitle: t("COMMON.UPDATED_SUCCESSFULLY", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            }),
            variant: "success",
          });
        } else {
          await createRole.mutateAsync(data);
          onClose();
          pushDashboardMessage({
            title: t("COMMON.SUCCESS_DIALOG_TITLE"),
            subtitle: t("COMMON.CREATED_SUCCESSFULLY", {
              ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            }),
            variant: "success",
          });
        }
        refetch();
      } catch {
        pushDashboardMessage({
          title: t("COMMON.FAIL_DIALOG_TITLE"),
          subtitle: t("COMMON.CREATED_FAILED", {
            ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
          }),
          variant: "fail",
        });
      }
    },
    [
      isEdit,
      refetch,
      currentRole?._id,
      fetchedRole?._id,
      editRole,
      onClose,
      t,
      createRole,
    ]
  );
  useEffect(() => {
    if (fetchRole && !isLoading) {
      const defaultValues = {
        nameAr: fetchedRole?.nameAr ?? "",
        nameEn: fetchedRole?.nameEn ?? "",
        descriptionAr: fetchedRole?.descriptionAr ?? "",
        descriptionEn: fetchedRole?.descriptionEn ?? "",
        permissions:
          fetchedRole?.permissionGroups?.flatMap(
            (group) => group.permissions
          ) ?? [],
      };
      reset(defaultValues);
    }
  }, [
    fetchRole,
    fetchedRole?.descriptionAr,
    fetchedRole?.descriptionEn,
    fetchedRole?.nameAr,
    fetchedRole?.nameEn,
    fetchedRole?.permissionGroups,
    isLoading,
    reset,
  ]);
  return (
    <Drawer
      open={open}
      onClose={onClose}
      direction={locale === "ar" ? "right" : "left"}
      modal
      dismissible={false}
    >
      <DrawerContent className="border-r-0! p-0! border-l-0! bg-slate-50 dark:bg-dark-background overflow-y-auto will-change-auto [transform:none]">
        {isLoading && (
          <div className="h-full w-full">
            <Spinner />
          </div>
        )}
        {!isLoading && (
          <>
            <DrawerHeader
              className={cn(
                "bg-emerald-600 p-1 gap-0! py-4 px-2 rtl:items-start relative",
                isEdit && "bg-teal-600"
              )}
            >
              <DrawerClose className="" asChild>
                <Button
                  onClick={onClose}
                  className={cn(
                    "h-12 w-12 bg-emerald-600 hover:bg-emerald-700 absolute top-0 right-0 rtl:right-auto rtl:left-0 p-0 rounded-none shadow-none",
                    isEdit && "bg-teal-600 hover:bg-teal-700"
                  )}
                >
                  <Icon
                    icon="basil:cross-solid"
                    className="h-8! w-8! dark:text-white"
                  />
                </Button>
              </DrawerClose>
              <div className="flex flex-row gap-2 items-start">
                <Icon
                  icon={
                    isEdit
                      ? "iconamoon:edit-light"
                      : "carbon:intent-request-create"
                  }
                  className="text-3xl text-white"
                />
                <div className="flex flex-col rtl:items-start">
                  <DrawerTitle className="text-white text-lg">
                    {isEdit
                      ? t("COMMON.EDIT_FORM_TITLE", {
                          ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
                          ENTITY_VAL:
                            locale === "ar"
                              ? currentRole?.nameAr ?? fetchedRole?.nameAr ?? ""
                              : currentRole?.nameEn ??
                                fetchedRole?.nameEn ??
                                "",
                        })
                      : t("COMMON.CREATION_TITLE", {
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
                    autoFocus: true,
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
                  isLoading={permissionsLoading}
                  options={permissions}
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
                    className={cn(
                      "flex-1 h-full bg-emerald-600 dark:text-white",
                      isEdit && "bg-teal-600"
                    )}
                    loading={isSubmitting}
                  >
                    {isEdit
                      ? t("COMMON.EDIT_TITLE", {
                          ENTITY_NAME: t(
                            "ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                          ),
                        })
                      : t("COMMON.CREATE", {
                          ENTITY_NAME: t(
                            "ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                          ),
                        })}
                  </LoadingButton>
                </div>
              </DrawerFooter>
            </RHFForm>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
