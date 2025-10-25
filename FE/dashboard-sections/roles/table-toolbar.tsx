// import { RHFAutoComplete } from "@/components/rhf-autocomplete";
import { RHFComboxbox } from "@/components/rhf-combobox";
import { RHFFilterTag } from "@/components/rhf-filter-tag";
import RHFTextfield from "@/components/rhf-textfield";
import { Button } from "@/components/ui/button";
import { useDebounceFn } from "@/hooks/use-debounce-call";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { LIST_COUNT, ORDER_BY_OPTIONS, ORDER_DIR_OPTIONS } from "./constants";
import { useGetPermissionsHelper } from "@/app/dashboard-api/helpers";
import { useQueryParams } from "@/hooks/use-query-params";

export default function TableToolbar() {
  const t = useTranslations();
  const {
    formState: { dirtyFields },
    setValue,
    reset,
  } = useFormContext();
  const searchParams = useSearchParams();
  const router = useRouter();
  const HAS_FILTERS = dirtyFields && Object.keys(dirtyFields).length > 0;
  const { syncParam } = useQueryParams({ setValue });
  const { data: permissions, isLoading } = useGetPermissionsHelper();
  const handleChangeParam = useCallback(
    (paramName: string, value: string, deleteParam: boolean = false) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set("page", "1");
      if (deleteParam) {
        params.delete(paramName);
      } else {
        params.set(paramName, value);
      }
      router.replace(`?${params}`);
    },
    [router, searchParams]
  );
  const resetFilters = useCallback(() => {
    const params = new URLSearchParams();
    params.set("page", "1");
    router.replace(`?${params}`);
  }, [router]);
  const debouncedHandleChangeParam = useDebounceFn(handleChangeParam, 500);

  const locale = useLocale();
  useEffect(() => {
    const param = searchParams.get("permission");
    if (permissions?.length > 0 && param) {
      syncParam("permission", (val) =>
        permissions.find((per) => per._id === val)
      );
    }
  }, [permissions, searchParams, syncParam]);
  return (
    <>
      <div className="p-3 mb-auto md:h-[22rem] overflow-y-scroll">
        <RHFTextfield
          name="name"
          label={t("COMMON.SEARCH_BY_NAME")}
          placeholder={t("COMMON.SEARCH_BY_NAME")}
          labelProps={{
            className: "text-sm font-medium",
          }}
          inputProps={{
            className: "h-12 bg-slate-50 dark:bg-dark-card",
          }}
          onChange={(e: any) => {
            debouncedHandleChangeParam(
              "name",
              e?.target?.value,
              e?.target?.value === ""
            );
          }}
        />
        <div className="flex flex-row gap-3 w-full items-end">
          <RHFFilterTag
            name="status"
            placeholder={t("COMMON.ACTIVE")}
            label={t("COMMON.STATUS")}
            labelProps={{
              className: "text-sm font-medium",
            }}
            value="ACTIVE"
            clearable
            onChange={(newVal, reason) => {
              handleChangeParam("status", newVal, reason === "clear");
            }}
          />
          <RHFFilterTag
            name="status"
            placeholder={t("COMMON.INACTIVE")}
            labelProps={{
              className: "text-sm font-medium",
            }}
            value="INACTIVE"
            clearable
            onChange={(newVal, reason) => {
              handleChangeParam("status", newVal, reason === "clear");
            }}
          />
        </div>
        <RHFComboxbox
          clearable
          name="sort"
          label={t("COMMON.ORDER_BY")}
          placeholder={t("COMMON.ORDER_BY")}
          labelProps={{
            className: "text-sm font-medium ",
          }}
          options={ORDER_BY_OPTIONS}
          getOptionLabel={(option) => {
            if (!option) return "";
            return locale === "ar" ? option?.nameAr : option?.nameEn;
          }}
          optionValueComparator={(option, value) =>
            option?.value === value?.value
          }
          onChange={(newVal, reason) => {
            handleChangeParam("sort", newVal?.value, reason === "clear");
          }}
        />
        <RHFComboxbox
          clearable
          name="permission"
          isLoading={isLoading}
          label={t("ROLES_MANAGEMENT.PERMISSIONS")}
          placeholder={t("ROLES_MANAGEMENT.PERMISSIONS")}
          labelProps={{
            className: "text-sm font-medium",
          }}
          options={permissions}
          getOptionLabel={(option) => {
            if (!option) return "";
            return locale === "ar" ? option?.nameAr : option?.nameEn;
          }}
          optionValueComparator={(option, value) => option?._id === value?._id}
          onChange={(newVal, reason) => {
            handleChangeParam("permission", newVal?._id, reason === "clear");
          }}
          // getOptionValue
        />
        <RHFComboxbox
          clearable
          name="dir"
          isLoading={isLoading}
          label={t("COMMON.ORDER_DIR")}
          placeholder={t("COMMON.ORDER_DIR")}
          labelProps={{
            className: "text-sm font-medium",
          }}
          options={ORDER_DIR_OPTIONS}
          getOptionLabel={(option) => {
            if (!option) return "";
            return locale === "ar" ? option?.nameAr : option?.nameEn;
          }}
          optionValueComparator={(option, value) => option?._id === value?._id}
          onChange={(newVal, reason) => {
            handleChangeParam("dir", newVal?.value, reason === "clear");
          }}
          // getOptionValue
        />
        <RHFComboxbox
          clearable={false}
          name="size"
          isLoading={isLoading}
          label={t("COMMON.ROWS_PER_LIST")}
          placeholder={t("COMMON.ROWS_PER_LIST")}
          labelProps={{
            className: "text-sm font-medium",
          }}
          options={LIST_COUNT}
          getOptionLabel={(option) => option ?? ""}
          onChange={(newVal, reason) => {
            console.log(newVal);
            handleChangeParam("size", newVal, reason === "clear");
          }}
          // getOptionValue
        />
      </div>
      <Button
        className="h-17 rounded-xl rounded-t-none disabled:bg-gray-50 bg-emerald-600 disabled:text-black disabled:dark:bg-dark-800 disabled:dark:text-gray-300 dark:text-white"
        disabled={!HAS_FILTERS}
        onClick={() => {
          reset();
          resetFilters();
        }}
      >
        <Icon icon="cuida:refresh-outline" className="w-6! h-6!" />
        <p>{t("COMMON.CANCEL_FILTERS")}</p>
      </Button>
    </>
  );
}
