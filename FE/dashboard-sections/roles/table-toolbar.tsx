// import { RHFAutoComplete } from "@/components/rhf-autocomplete";
import { RHFComboxbox } from "@/components/rhf-combobox";
import { RHFFilterTag } from "@/components/rhf-filter-tag";
import RHFForm from "@/components/rhf-form";
import RHFTextfield from "@/components/rhf-textfield";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";

export default function TableToolbar() {
  const t = useTranslations();
  const defaultValues = useMemo(
    () => ({
      name: "",
      status: null,
      sort: null,
      permission: null,
    }),
    []
  );
  const methods = useForm({ defaultValues });
  const {
    formState: { dirtyFields },
  } = methods;
  const HAS_FILTERS = dirtyFields && Object.keys(dirtyFields).length > 0;
  const onSubmit = useCallback((data: any) => {
    console.log(data);
  }, []);

  const sortingOptions = [
    {
      label: t("ROLES_MANAGEMENT.NAME"),
      value: "name",
    },
    {
      label: t("ROLES_MANAGEMENT.USERS_COUNT"),
      value: "usersCount",
    },
    {
      label: t("COMMON.STATUS"),
      value: "status",
    },
  ];
  return (
    <RHFForm
      methods={methods}
      onSubmit={onSubmit}
      className="min-w-76 bg-card rounded-xl  shadow-[0_2px_12px_rgba(0,0,0,0.05)] md:h-full sticky top-[4.5rem] flex flex-col gap-0 self-stretch"
    >
      <div className="p-3">
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
            clearable
          />
          <RHFFilterTag
            name="status"
            placeholder={t("COMMON.INACTIVE")}
            labelProps={{
              className: "text-sm font-medium",
            }}
            value="INACTIVE"
            clearable
          />
        </div>
        <RHFComboxbox
          clearable
          name="sort"
          label={t("COMMON.ORDER_BY")}
          placeholder={t("COMMON.ORDER_BY")}
          labelProps={{
            className: "text-sm font-medium",
          }}
          options={sortingOptions}
        />
        <RHFComboxbox
          clearable
          name="permission"
          label={t("ROLES_MANAGEMENT.PERMISSIONS")}
          placeholder={t("ROLES_MANAGEMENT.PERMISSIONS")}
          labelProps={{
            className: "text-sm font-medium",
          }}
          options={sortingOptions}
        />
      </div>
      <Button
        className="h-17 rounded-xl rounded-t-none disabled:bg-gray-50 bg-emerald-600 disabled:text-black"
        disabled={!HAS_FILTERS}
      >
        <Icon icon="cuida:refresh-outline" className="w-6! h-6!" />
        <p>{t("COMMON.CANCEL_FILTERS")}</p>
      </Button>
    </RHFForm>
  );
}
