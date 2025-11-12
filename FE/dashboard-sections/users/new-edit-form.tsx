"use client";
import * as Z from "zod";
import RHFForm from "@/components/rhf-form";
import { Button } from "@/components/ui/button";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@/app/dashboard-types/roles";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { paths } from "@/components/dashboard-sidebar/paths";
import UserPersonalInfoForm from "./user-personal-info-form";
import UserLocationInfoForm from "./user-contact-info-form";
import UserDocumentInfoForm from "./user-document-info-form";
import { useGetUserDetails, useMutateUser } from "@/app/dashboard-api/users";
import Fade from "@/components/Fade";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";
import { useParams, useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import { GENDER_OPTIONS } from "./constants";

type NewEditFormProps = {
  mode?: "NEW" | "EDIT";
  currentEntity?: Role;
  roleId?: string;
};

const fieldsPerStep = [
  [
    "nameAr",
    "nameEn",
    "email",
    "gender",
    "nationalId",
    "birthDate",
    "joiningDate",
    "nationality",
    "roles",
  ],
  ["city", "branch", "phoneNumber", "location", "branch"],
  ["files"],
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const ACCEPTED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
export const MAX_FILE_COUNT = 5;
export default function NewEditForm({}: // currentEntity,
NewEditFormProps) {
  // State Management ////////////////////////////////////////////////////////
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Custom Hooks ////////////////////////////////////////////////////////
  const { userId } = useParams();
  const locale = useLocale();
  const t = useTranslations();
  const router = useRouter();
  const { createUser, editUser } = useMutateUser();

  const isEdit = !!userId;
  const { data: currentEntity, isLoading } = useGetUserDetails(userId, {
    enabled: isEdit,
  });
  console.log(currentEntity);
  const steps = [
    {
      title: t("USERS_MANAGEMENT.PERSONAL_INFORMATION"),
      stepValue: 1,
      icon: "solar:user-bold",
      stepOrderTitle: t("COMMON.FIRST_STEP"),
    },
    {
      title: t("USERS_MANAGEMENT.CONTACT_INFORMATION"),
      stepValue: 2,
      icon: "mingcute:location-line",
      stepOrderTitle: t("COMMON.SECOND_STEP"),
    },
    {
      title: t("USERS_MANAGEMENT.OFFICIAL_DOCUMENTS"),
      stepValue: 3,
      icon: "solar:documents-bold-duotone",
      stepOrderTitle: t("COMMON.THIRD_STEP"),
    },
  ];

  const UploadedFileSchema = Z.object({
    _id: Z.string(),
    name: Z.string(),
    type: Z.enum(ACCEPTED_FILE_TYPES),
    url: Z.url(),
    size: Z.number().max(MAX_FILE_SIZE, "File size must be less than 5MB"),
  }).refine((file) => file.size <= MAX_FILE_SIZE, {
    error: t("VALIDATIONS.MAX_FILE_SIZE_ERROR"),
  });

  const RawFileSchema = Z.instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      error: t("VALIDATIONS.MAX_FILE_SIZE_ERROR"),
    })
    .refine(
      (file) =>
        ACCEPTED_FILE_TYPES.includes(
          file.type as (typeof ACCEPTED_FILE_TYPES)[number]
        ),
      {
        error: t("VALIDATIONS.FILE_TYPE_ERROR"),
      }
    );
  const schema = Z.object({
    imageUrl: Z.any(),
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
    email: Z.email(
      t("FORM_VALIDATIONS.INVALID_FORMAT", { field: t("PROFILE.EMAIL") })
    ).min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("PROFILE.EMAIL"),
      })
    ),
    gender: Z.object({
      _id: Z.number(),
      nameAr: Z.string(),
      nameEn: Z.string(),
      value: Z.string(),
    })
      .nullable()
      .refine((val) => val !== null, {
        error: t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("PROFILE.GENDER"),
        }),
      }),
    nationalId: Z.string()
      .min(
        1,
        t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.NATIONAL_ID"),
        })
      )
      .refine(
        (val) => {
          const century = val[0];
          if (century !== "2" && century !== "3") return false;

          const year = parseInt(val.slice(1, 3), 10) || 0;
          const month = parseInt(val.slice(3, 5), 10) || 0;
          const day = parseInt(val.slice(5, 7), 10) || 0;
          // Validate month and day ranges
          if (month < 1 || month > 12) return false;
          if (day < 1 || day > 31) return false;
          if (year > new Date().getFullYear()) return false;
          return true;
        },
        {
          error: t("FORM_VALIDATIONS.INVALID_FORMAT", {
            field: t("USERS_MANAGEMENT.NATIONAL_ID"),
          }),
        }
      ),
    birthDate: Z.union([Z.string(), Z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .nullable()
      .refine((val) => val !== null, {
        message: t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.BIRTH_DATE"),
        }),
      })
      .refine((val) => (val ? val < new Date() : true), {
        message: t("FORM_VALIDATIONS.PAST_DATE", {
          field: t("USERS_MANAGEMENT.BIRTH_DATE"),
        }),
      }),
    joiningDate: Z.union([Z.string(), Z.date()])
      .transform((val) => (typeof val === "string" ? new Date(val) : val))
      .nullable()
      .refine((val) => val !== null, {
        error: t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.JOINING_DATE"),
        }),
      }),
    nationality: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
    })
      .nullable()
      .refine((val) => val !== null, {
        error: t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.NATIONALITY"),
        }),
      }),
    city: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
    })
      .nullable()
      .refine((val) => val !== null, {
        error: t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.CITY"),
        }),
      }),
    branch: Z.object({
      _id: Z.string(),
      nameAr: Z.string(),
      nameEn: Z.string(),
    }).nullable(),
    phoneNumber: Z.string()
      .min(
        1,
        t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.PHONE_NUMBER"),
        })
      )
      .refine((val) => /^01[0-2,5]{1}[0-9]{8}$/.test(val), {
        error: t("FORM_VALIDATIONS.INVALID_FORMAT", {
          field: t("USERS_MANAGEMENT.PHONE_NUMBER"),
        }),
      }),
    location: Z.object({
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
    files: Z.array(Z.union([RawFileSchema, UploadedFileSchema]))
      .min(
        1,
        t("FORM_VALIDATIONS.REQUIRED_FIELD", {
          field: t("USERS_MANAGEMENT.OFFICIAL_DOCUMENTS"),
        })
      )
      .max(5, t("VALIDATIONS.MAX_FILE_COUNT_ERROR"))
      .refine((val) => val.every((file) => file.size <= MAX_FILE_SIZE), {
        error: t("VALIDATIONS.MAX_FILE_SIZE_ERROR"),
      })
      .refine(
        (val) => val.every((file) => ACCEPTED_FILE_TYPES.includes(file.type)),
        {
          error: t("VALIDATIONS.FILE_TYPE_ERROR"),
        }
      ),
    roles: Z.array(
      Z.object({
        _id: Z.string(),
        nameAr: Z.string(),
        nameEn: Z.string(),
      })
    ).min(
      1,
      t("FORM_VALIDATIONS.REQUIRED_FIELD", {
        field: t("USERS_MANAGEMENT.ROLES"),
      })
    ),
    googleMapUrl: Z.string(),
  });
  const defaultValues = useMemo(
    () => ({
      imageUrl: currentEntity?.imageUrl ?? null,
      nameAr: currentEntity?.nameAr ?? "",
      nameEn: currentEntity?.nameEn ?? "",
      email: currentEntity?.email ?? "",
      gender: currentEntity?.gender
        ? GENDER_OPTIONS?.[currentEntity?.gender]
        : null,
      nationalId: currentEntity?.nationalId ?? "",
      birthDate: currentEntity?.birthDate ?? null,
      joiningDate: currentEntity?.joiningDate ?? null,
      nationality: currentEntity?.nationality ?? null,
      city: currentEntity?.city ?? null,
      branch: currentEntity?.branch ?? null,
      phoneNumber: currentEntity?.phoneNumber ?? "",
      location: currentEntity?.location ?? null,
      files: currentEntity?.files ?? [],
      roles: currentEntity?.roles ?? [],
      googleMapUrl: currentEntity?.googleMapUrl ?? "",
      lat: currentEntity?.location?.lat ?? "",
      lng: currentEntity?.location?.lng ?? "",
    }),
    [
      currentEntity?.birthDate,
      currentEntity?.branch,
      currentEntity?.city,
      currentEntity?.email,
      currentEntity?.files,
      currentEntity?.gender,
      currentEntity?.googleMapUrl,
      currentEntity?.imageUrl,
      currentEntity?.joiningDate,
      currentEntity?.location,
      currentEntity?.nameAr,
      currentEntity?.nameEn,
      currentEntity?.nationalId,
      currentEntity?.nationality,
      currentEntity?.phoneNumber,
      currentEntity?.roles,
    ]
  );
  const methods = useForm({
    defaultValues,
    resolver: zodResolver(schema),
    mode: "onChange",
    shouldUnregister: false,
    // shouldFocusError: true,
  });
  const {
    trigger,
    setError,
    formState: { isSubmitting },
    reset,
  } = methods;
  const onSubmit = useCallback(
    async (data: Z.output<typeof schema>) => {
      try {
        if (isEdit) {
          (data as any)._id = currentEntity?._id;
          await editUser.mutateAsync(data);
          router.replace(`/dashboard/users`);
          // onClose();
          pushDashboardMessage({
            title: t("COMMON.SUCCESS_DIALOG_TITLE"),
            subtitle: t("COMMON.UPDATED_SUCCESSFULLY", {
              ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            }),
            variant: "success",
          });
        } else {
          await createUser.mutateAsync(data);
          router.push("/dashboard/users");
          pushDashboardMessage({
            title: t("COMMON.SUCCESS_DIALOG_TITLE"),
            subtitle: t("COMMON.CREATED_SUCCESSFULLY", {
              ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
            }),
            variant: "success",
          });
        }
      } catch (error: any) {
        let firstErrorStep = 1;
        if (error?.isFormError && error?.error?.errorObject) {
          Object.keys(error.error.errorObject).forEach((key) => {
            const currentErrorStep = fieldsPerStep.findIndex((step) =>
              step.includes(key)
            );
            firstErrorStep = Math.min(
              currentErrorStep >= 0 ? currentErrorStep + 1 : Infinity,
              firstErrorStep
            );
            setError(key as any, {
              type: "validate",
              message: error?.error?.errorObject[key],
            });
          });
        }
        setCurrentStep(firstErrorStep);
        pushDashboardMessage({
          title: t("COMMON.FAIL_DIALOG_TITLE"),
          subtitle: t("COMMON.CREATED_FAILED", {
            ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
          }),
          variant: "fail",
        });
      }
    },
    [createUser, currentEntity?._id, editUser, isEdit, router, setError, t]
  );
  const handlePreviousStep = useCallback(async () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);
  const handleNextStep = useCallback(async () => {
    const currentStepFields = fieldsPerStep[currentStep - 1] as any[];
    const isValid = await trigger(currentStepFields);
    if (!isValid) return;
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  }, [currentStep, trigger]);
  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);
  if (isLoading) return null;
  return (
    <div className="h-full w-full flex flex-col ltr:pr-4 rtl:pl-4">
      {/* Header */}
      <header className="p-3">
        <Link
          href={paths.dashboard.users.list}
          className="flex flex-row items-center gap-1 font-semibold text-gray-600 dark:text-gray-200 hover:gap-3 transition-all duration-300"
        >
          <Icon
            icon={
              locale === "ar" ? "pajamas:chevron-right" : "pajamas:chevron-left"
            }
          />
          {t("USERS_MANAGEMENT.BACK_TO_USERS_LIST")}
        </Link>
      </header>
      <RHFForm
        methods={methods as any}
        onSubmit={onSubmit as any}
        className="flex flex-row items-center h-full w-full flex-1"
      >
        {/* Stepper */}
        <ul className="flex flex-col gap-3 ">
          {steps?.map((step) => (
            <FormStep
              key={step?.stepValue}
              title={step?.title}
              stepValue={step?.stepValue}
              onChangeStep={(newVal) => setCurrentStep(newVal)}
              icon={step?.icon}
              currentStep={currentStep}
              stepOrderTitle={step?.stepOrderTitle}
            />
          ))}
        </ul>
        <div className="w-full h-full flex flex-col items-center gap-12 py-6">
          <div className="flex flex-col items-center gap-1">
            <h3 className="text-xl font-semibold text-gray-500 dark:text-gray-400">
              {currentEntity
                ? t("COMMON.EDIT_FORM_TITLE", {
                    ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                    ENTITY_VAL:
                      locale === "ar"
                        ? currentEntity?.nameAr
                        : currentEntity?.nameEn,
                  })
                : t("USERS_MANAGEMENT.USER_CREATION")}
            </h3>
            <h5 className="text-3xl font-bold dark:text-white">
              {t("USERS_MANAGEMENT.PERSONAL_INFORMATION")}
            </h5>
          </div>
          <div className="p-12 w-full h-full">
            <div className="bg-gray-100 dark:bg-dark-card w-full rounded-xl h-full p-3  px-32 overflow-x-hidden drop-shadow-md">
              {currentStep === 1 && <UserPersonalInfoForm />}
              {currentStep === 2 && <UserLocationInfoForm />}
              {currentStep === 3 && <UserDocumentInfoForm />}
            </div>
          </div>
          <div className="flex flex-row gap-2 w-full justify-end px-12">
            {currentStep !== 1 && (
              <Button
                onClick={handlePreviousStep}
                type="button"
                className="h-12 rounded-lg min-w-32 bg-emerald-600 text-white hover:bg-emerald-700 mr-auto rtl:ml-auto rtl:mr-0"
                disabled={isSubmitting}
              >
                {t("COMMON.PREVIOUS")}
              </Button>
            )}

            <Button
              type="button"
              className="h-12 rounded-lg min-w-32 border-2 border-emerald-700 text-emerald-600 hover:brightness-100 bg-transparent hover:text-white hover:bg-emerald-700"
            >
              {t("COMMON.CANCEL")}
            </Button>
            <Fade condition={currentStep !== 3}>
              <Button
                onClick={handleNextStep}
                type="button"
                className="h-12 rounded-lg min-w-32 bg-emerald-600 text-white hover:bg-emerald-700"
                disabled={isSubmitting}
              >
                {t("COMMON.NEXT")}
              </Button>
            </Fade>
            <Fade condition={currentStep === 3}>
              <Button
                type="submit"
                className="h-12 rounded-lg min-w-32 bg-emerald-600 text-white hover:bg-emerald-700 flex flex-row gap-2 items-center"
                disabled={isSubmitting}
              >
                {isSubmitting && <Spinner />}
                {currentEntity
                  ? t("COMMON.EDIT_TITLE", {
                      ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                    })
                  : t("COMMON.CREATE", {
                      ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                    })}
              </Button>
            </Fade>
          </div>
        </div>
      </RHFForm>
    </div>
  );
}

type FormStepProp = {
  stepOrderTitle: string;
  title: string;
  icon: string;
  stepValue: number;
  currentStep: number;
  onChangeStep: (newStep: number) => void;
};
function FormStep({
  stepOrderTitle,
  title,
  icon,
  stepValue,
  currentStep,
}: FormStepProp) {
  return (
    <li
      className={cn(
        "flex flex-col w-full flex-1",
        currentStep === 3 && "cursor-default"
      )}
    >
      <div className="flex flex-row gap-2 items-center">
        <span
          className={cn(
            "h-2 w-6 rounded-md bg-transparent transition-all duration-300",
            currentStep === stepValue && "bg-emerald-600"
          )}
        />
        <Button
          type="button"
          className={cn(
            "flex flex-row justify-start gap-2 items-center bg-transparent py-8! rounded-xl  shadow-none transition-all duration-300 cursor-default w-full flex-1 min-w-56",
            currentStep === stepValue &&
              "bg-black/5 cursor-default dark:bg-white/5 "
          )}
        >
          <Icon
            icon={icon}
            className={cn(
              "h-8! w-8! text-gray-500",
              currentStep === stepValue && "text-emerald-600"
            )}
          />
          <div className="flex flex-col items-start">
            <p
              className={cn(
                "text-sm font-semibold text-gray-500",
                currentStep === stepValue &&
                  "text-gray-700 dark:text-gray-300 transition-all duration-300"
              )}
            >
              {stepOrderTitle}
            </p>
            <p
              className={cn(
                " font-bold text-primary",
                currentStep === stepValue &&
                  "text-emerald-600 transition-all duration-300"
              )}
            >
              {title}
            </p>
          </div>
        </Button>
      </div>
    </li>
  );
}
