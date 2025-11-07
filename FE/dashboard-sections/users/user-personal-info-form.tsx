import { RHFComboxbox } from "@/components/rhf-combobox";
import RHFImagePicker from "@/components/rhf-imagePicker";
import RHFTextfield from "@/components/rhf-textfield";
import { GENDER_OPTIONS } from "./constants";
import { RHFDatePicker } from "@/components/rhf-datePicker";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import {
  useGetAllActiveRoles,
  useGetAllNationalities,
} from "@/app/dashboard-api/valueHelp";

export default function UserPersonalInfoForm() {
  const t = useTranslations();
  const locale = useLocale();
  const { data: nationalities, isLoading: nationalitiesLoaading } =
    useGetAllNationalities();
  const { data: roles, isLoading: rolesLoading } = useGetAllActiveRoles();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        className="flex flex-col gap-3"
      >
        <div className="mb-8">
          <RHFImagePicker
            name="imageUrl"
            label={t("PROFILE.PROFILE_PICTURE")}
          />
        </div>
        <div className="flex flex-row gap-3">
          <RHFTextfield
            mandatoryField
            name="nameAr"
            label={t("COMMON.NAME_AR")}
            placeholder={t("COMMON.NAME_AR")}
            inputProps={{
              className: "h-12",
              autoFocus: true,
            }}
            className="flex-1"
          />
          <RHFTextfield
            mandatoryField
            name="nameEn"
            label={t("COMMON.NAME_EN")}
            placeholder={t("COMMON.NAME_EN")}
            inputProps={{
              className: "h-12",
              autoFocus: true,
            }}
            className="flex-1"
          />
        </div>
        <div className="flex flex-row gap-3">
          <RHFTextfield
            mandatoryField
            name="email"
            label={t("USERS_MANAGEMENT.EMAIL_ADDRESS")}
            placeholder={t("USERS_MANAGEMENT.EMAIL_ADDRESS")}
            inputProps={{
              className: "h-12",
              autoFocus: true,
              type: "email",
            }}
            className="flex-1"
          />
          <RHFComboxbox
            mandatoryField
            name="gender"
            label={t("USERS_MANAGEMENT.GENDER")}
            placeholder={t("USERS_MANAGEMENT.GENDER")}
            options={Object.values(GENDER_OPTIONS)}
            triggerProps={{
              className: "bg-gray-100",
            }}
            getOptionLabel={(option) => {
              if (!option) return "";
              return locale === "ar" ? option?.nameAr : option?.nameEn;
            }}
            optionValueComparator={(option, value) =>
              option?._id === value?._id
            }
          />
        </div>
        <div className="flex flex-row gap-3">
          <RHFTextfield
            mandatoryField
            name="nationalId"
            label={t("USERS_MANAGEMENT.NATIONAL_ID")}
            placeholder={t("USERS_MANAGEMENT.NATIONAL_ID")}
            inputProps={{
              className: "h-12",
              autoFocus: true,
            }}
            className="flex-1"
          />
          <RHFDatePicker
            mandatoryField
            label={t("USERS_MANAGEMENT.BIRTH_DATE")}
            placeholder={t("USERS_MANAGEMENT.BIRTH_DATE")}
            name="birthDate"
          />
        </div>
        <div className="flex flex-row gap-3">
          <RHFDatePicker
            mandatoryField
            label={t("USERS_MANAGEMENT.JOINING_DATE")}
            placeholder={t("USERS_MANAGEMENT.JOINING_DATE")}
            name="joiningDate"
          />
          <RHFComboxbox
            mandatoryField
            name="nationality"
            label={t("USERS_MANAGEMENT.NATIONALITY")}
            placeholder={t("USERS_MANAGEMENT.NATIONALITY")}
            options={nationalities}
            isLoading={nationalitiesLoaading}
            triggerProps={{
              className: "bg-gray-100",
            }}
            getOptionLabel={(option) => {
              if (!option) return "";
              return locale === "ar" ? option?.nameAr : option?.nameEn;
            }}
            optionValueComparator={(option, value) =>
              option?._id === value?._id
            }
          />
        </div>
        <div className="flex flex-row gap-3 w-full md:w-1/2">
          <RHFComboxbox
            mandatoryField
            name="roles"
            label={t("USERS_MANAGEMENT.ROLES")}
            placeholder={t("USERS_MANAGEMENT.ROLES")}
            options={roles}
            multiple
            isLoading={rolesLoading}
            triggerProps={{
              className: "dark:bg-transparent",
            }}
            getOptionLabel={(option) => {
              if (!option) return "";
              return locale === "ar" ? option?.nameAr : option?.nameEn;
            }}
            optionValueComparator={(option, value) =>
              option?._id === value?._id
            }
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
