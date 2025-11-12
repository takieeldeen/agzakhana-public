import "leaflet/dist/leaflet.css";
import { RHFComboxbox } from "@/components/rhf-combobox";
import RHFTextfield from "@/components/rhf-textfield";
import { useLocale, useTranslations } from "next-intl";
import { AnimatePresence, motion } from "framer-motion";
import L from "leaflet";
import { RHFLocationPicker } from "@/components/rhf-locationPicker";
import { useFormContext } from "react-hook-form";
import {
  useGetAllActiveBranches,
  useGetAllCities,
} from "@/app/dashboard-api/valueHelp";

// Fix default marker icons
delete (L as any).Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function UserLocationInfoForm() {
  const t = useTranslations();
  const locale = useLocale();
  const methods = useFormContext();
  const { setValue } = methods;
  const { data: cities, isLoading: citiesLoaading } = useGetAllCities();
  const { data: branches, isLoading: branchesLoading } =
    useGetAllActiveBranches();
  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: 100 }}
        className="flex flex-col gap-3 justify-center h-full"
      >
        <div className="flex flex-row gap-3">
          <RHFTextfield
            mandatoryField
            name="phoneNumber"
            label={t("USERS_MANAGEMENT.PHONE_NUMBER")}
            placeholder={t("USERS_MANAGEMENT.PHONE_NUMBER")}
            inputProps={{
              className: "h-12",
            }}
            className="w-1/2"
          />

          <RHFComboxbox
            name="branch"
            label={t("USERS_MANAGEMENT.BRANCH")}
            placeholder={t("USERS_MANAGEMENT.BRANCH")}
            options={branches}
            isLoading={branchesLoading}
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
          <RHFComboxbox
            mandatoryField
            name="city"
            label={t("USERS_MANAGEMENT.CITY")}
            placeholder={t("USERS_MANAGEMENT.CITY")}
            isLoading={citiesLoaading}
            options={cities}
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
          <RHFLocationPicker
            mandatoryField
            name="location"
            label={t("USERS_MANAGEMENT.LOCATION")}
            placeholder={t("USERS_MANAGEMENT.LOCATION")}
            reverseGeoCode
            getLocationLabel={(location) => {
              return !location.displayName
                ? `${location.lat} ${location.lng}`
                : location.displayName;
            }}
            onChange={(location) => {
              setValue("googleMapUrl", location?.googleMapUrl);
              setValue("lat", location?.lat);
              setValue("lng", location?.lng);
            }}
          />
        </div>
        <div className="flex flex-row gap-3">
          <RHFTextfield
            name="googleMapUrl"
            label={t("USERS_MANAGEMENT.GOOGLE_MAPS_LINK")}
            placeholder={t("USERS_MANAGEMENT.GOOGLE_MAPS_LINK")}
            inputProps={{
              className: "h-12",
              disabled: true,
            }}
            className="flex-1"
          />
          <div className="flex flex-row flex-1 gap-3">
            <RHFTextfield
              name="lat"
              label={t("USERS_MANAGEMENT.LAT")}
              placeholder={t("USERS_MANAGEMENT.LAT")}
              inputProps={{
                className: "h-12",
                disabled: true,
              }}
              className="flex-1"
            />
            <RHFTextfield
              name="lng"
              label={t("USERS_MANAGEMENT.LONG")}
              placeholder={t("USERS_MANAGEMENT.LONG")}
              inputProps={{
                className: "h-12",
                disabled: true,
              }}
              className="flex-1"
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
