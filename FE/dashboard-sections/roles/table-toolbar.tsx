// import { RHFAutoComplete } from "@/components/rhf-autocomplete";
import RHFAutocomplete from "@/components/rhf-autocomplete";
import { RHFComboxbox } from "@/components/rhf-combobox";
import { RHFFilterTag } from "@/components/rhf-filter-tag";
import RHFForm from "@/components/rhf-form";
import RHFTextfield from "@/components/rhf-textfield";
import { useTranslations } from "next-intl";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function TableToolbar() {
  const t = useTranslations();
  const methods = useForm();
  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);
  const sortingOptions = [
    {
      label: "الاسم",
      value: "name",
    },
    {
      label: "عدد المستخدمين",
      value: "usersCount",
    },
    {
      label: "الحالة",
      value: "status",
    },
  ];
  return (
    <RHFForm
      methods={methods}
      onSubmit={onSubmit}
      className="min-w-76 bg-card rounded-xl p-3 shadow-[0_2px_12px_rgba(0,0,0,0.05)] h-full sticky top-0 flex flex-col gap-0"
    >
      <RHFTextfield
        name="name"
        label={t("COMMON.SEARCH_BY_NAME")}
        placeholder={t("COMMON.SEARCH_BY_NAME")}
        labelProps={{
          className: "text-sm font-medium",
        }}
        inputProps={{
          className: "h-12 bg-slate-50",
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
        />
        <RHFFilterTag
          name="status"
          placeholder={t("COMMON.INACTIVE")}
          labelProps={{
            className: "text-sm font-medium",
          }}
          value="INACTIVE"
        />
      </div>
      <RHFComboxbox name="sort" />
    </RHFForm>
  );
}
