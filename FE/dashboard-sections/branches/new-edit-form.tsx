import * as Z from "zod";
import { RHFComboxbox } from "@/components/rhf-combobox";
import RHFForm from "@/components/rhf-form";
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
import { useGetRoleDetails } from "@/app/dashboard-api/roles";
import { cn } from "@/lib/utils";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";
import { Spinner } from "@/components/ui/spinner";
import { BranchType } from "@/app/dashboard-types/branches";
import RHFTimePicker from "@/components/rhf-timepicker";
import { RHFLocationPicker } from "@/components/rhf-locationPicker";
import { useGetAllActiveUsers } from "@/app/dashboard-api/valueHelp";
import { useMutateBranch } from "@/app/dashboard-api/branches";

type NewEditFormProps = {
  open: boolean;
  onClose: VoidFunction;
  refetch: VoidFunction;
  mode?: "NEW" | "EDIT";
  currentEntity?: BranchType;
  roleId?: string;
};
export default function NewEditForm({
  open,
  onClose,
  refetch,
  currentEntity,
  mode = "NEW",
  roleId,
}: NewEditFormProps) {
  const locale = useLocale();
  const t = useTranslations();
  const fetchRole = mode === "EDIT" && !!roleId && !currentEntity;
  const { data: fetchedRole, isLoading } = useGetRoleDetails(roleId, {
    enabled: fetchRole,
  });
  const isEdit = currentEntity || mode === "EDIT";
  const { createBranch, editRole } = useMutateBranch();
  const { data: users, isLoading: usersLoading } = useGetAllActiveUsers();
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
    manager: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
    })
      .nullable()
      .refine((val) => val !== null, {
        error: t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("BRANCHES_MANAGEMENT.BRANCH_MANAGER"),
        }),
      }),
    address: Z.object({
      lat: Z.number(),
      lng: Z.number(),
      displayName: Z.string(),
    })
      .nullable()
      .refine((val) => val !== null, {
        error: t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.LOCATION"),
        }),
      }),
    startHour: Z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT.START_HOUR"),
      })
    ),
    endHour: Z.string().min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("BRANCHES_MANAGEMENT.END_HOUR"),
      })
    ),
    phoneNumber: Z.string()
      .min(
        1,
        t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.PHONE_NUMBER"),
        })
      )
      .refine(
        (val) =>
          /^(010|011|012|015|016)\d{8}$/.test(val) || // Mobile
          /^0(2|3|4[0-10]|5[0-10]|6[0-10]|8[0-10]|9[0-10])\d{6,7}$/.test(val), // Landline
        {
          message: t("FORM_VALIDATIONS.INVALID_FORMAT", {
            field: t("USERS_MANAGEMENT.PHONE_NUMBER"),
          }),
        }
      ),
  });
  const defaultValues = useMemo(
    () => ({
      nameAr: currentEntity?.nameAr ?? "",
      nameEn: currentEntity?.nameEn ?? "",
      manager: currentEntity?.manager ?? null,
      address: currentEntity?.address ?? null,
      startHour: "",
      endHour: "",
      phoneNumber: currentEntity?.phoneNumber ?? "",
    }),
    [
      currentEntity?.address,
      currentEntity?.manager,
      currentEntity?.nameAr,
      currentEntity?.nameEn,
      currentEntity?.phoneNumber,
    ]
  );
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  const {
    watch,
    formState: { isSubmitting, errors },
    reset,
  } = methods;
  const values = watch();
  console.log(errors, "errors", values, "values");
  const onSubmit = useCallback(
    async (data: Z.output<typeof schema>) => {
      try {
        if (isEdit) {
          (data as any)._id = currentEntity?._id ?? fetchedRole?._id;
          await editRole.mutateAsync(data);
          onClose();
          pushDashboardMessage({
            title: t("COMMON.SUCCESS_DIALOG_TITLE"),
            subtitle: t("COMMON.UPDATED_SUCCESSFULLY", {
              ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            }),
            variant: "success",
          });
        } else {
          await createBranch.mutateAsync(data);
          onClose();
          pushDashboardMessage({
            title: t("COMMON.SUCCESS_DIALOG_TITLE"),
            subtitle: t("COMMON.CREATED_SUCCESSFULLY", {
              ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            }),
            variant: "success",
          });
        }
        refetch();
      } catch (err) {
        console.log(err);
        pushDashboardMessage({
          title: t("COMMON.FAIL_DIALOG_TITLE"),
          subtitle: t("COMMON.CREATED_FAILED", {
            ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
          }),
          variant: "fail",
        });
      }
    },
    [
      isEdit,
      refetch,
      currentEntity?._id,
      fetchedRole?._id,
      editRole,
      onClose,
      t,
      createBranch,
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
                          ENTITY_NAME: t("BRANCHES_MANAGEMENT.ENTITY_NAME"),
                          ENTITY_VAL:
                            locale === "ar"
                              ? currentEntity?.nameAr ??
                                fetchedRole?.nameAr ??
                                ""
                              : currentEntity?.nameEn ??
                                fetchedRole?.nameEn ??
                                "",
                        })
                      : t("COMMON.CREATION_TITLE", {
                          ENTITY_NAME: t("BRANCHES_MANAGEMENT.ENTITY_NAME"),
                        })}
                  </DrawerTitle>
                  <DrawerDescription className="text-muted dark:text-gray-300">
                    {t("COMMON.CREATION_SUBTITLE", {
                      ENTITY_NAME: t("BRANCHES_MANAGEMENT.ENTITY_NAME"),
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

                <div className="flex flex-row items-start gap-2">
                  <RHFTimePicker
                    name="startHour"
                    label={t("BRANCHES_MANAGEMENT.START_HOUR")}
                    placeholder={t("BRANCHES_MANAGEMENT.START_HOUR")}
                    className="flex-1"
                  />
                  <RHFTimePicker
                    name="endHour"
                    className="flex-1"
                    label={t("BRANCHES_MANAGEMENT.END_HOUR")}
                    placeholder={t("BRANCHES_MANAGEMENT.END_HOUR")}
                  />
                </div>
                <RHFComboxbox
                  name="manager"
                  label={t("BRANCHES_MANAGEMENT.BRANCH_MANAGER")}
                  placeholder={t("BRANCHES_MANAGEMENT.BRANCH_MANAGER")}
                  isLoading={usersLoading}
                  options={users}
                  getOptionLabel={(option) => {
                    if (!option) return "";
                    return locale === "ar" ? option?.nameAr : option?.nameEn;
                  }}
                  optionValueComparator={(option, value) =>
                    option?._id === value?._id
                  }
                />
                <RHFLocationPicker
                  mandatoryField
                  name="address"
                  label={t("USERS_MANAGEMENT.LOCATION")}
                  placeholder={t("USERS_MANAGEMENT.LOCATION")}
                  reverseGeoCode
                  getLocationLabel={(location) => {
                    return !location.displayName
                      ? `${location.lat} ${location.lng}`
                      : location.displayName;
                  }}
                  // onChange={(location) => {
                  //   setValue("googleMapUrl", location?.googleMapUrl);
                  //   setValue("lat", location?.lat);
                  //   setValue("lng", location?.lng);
                  // }}
                />
                <RHFTextfield
                  name="phoneNumber"
                  label={t("USERS_MANAGEMENT.PHONE_NUMBER")}
                  placeholder={t("USERS_MANAGEMENT.PHONE_NUMBER")}
                  inputProps={{
                    className: "h-12",
                    autoFocus: true,
                  }}
                />
              </div>
              <DrawerFooter className="gap-0! py-2 px-0 ">
                <div className="flex flex-row gap-2 h-12 items-stretch">
                  <Button
                    className="flex-1 h-full border-border border-2 dark:border-gray-500 dark:text-gray-300"
                    variant="ghost"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                    }}
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
                            "BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"
                          ),
                        })
                      : t("COMMON.CREATE", {
                          ENTITY_NAME: t(
                            "BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"
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
