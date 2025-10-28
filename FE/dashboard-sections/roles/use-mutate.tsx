import { useMutateRole } from "@/app/dashboard-api/roles";
import { Role, RoleListItem } from "@/app/dashboard-types/roles";
import { usePrompt } from "@/components/prompt-provider";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export function useMutate() {
  const { showPrompt } = usePrompt();
  const t = useTranslations();
  const locale = useLocale();
  const {editRole} = useMutateRole();
  const changeStatus = useCallback(
    (role: Role | RoleListItem) =>
      showPrompt({
        action: async()=>{editRole.mutateAsync({status: role?.status === 'ACTIVE'? 'INACTIVE':'ACTIVE'});},
        variant: role?.status === "ACTIVE" ? "ALERT" : "SUCCESS",
        dialogTitle: t("COMMON.CONFIRMATION_DIALOG_TITLE", {
          OPERATION_NAME: t(
            role?.status === "ACTIVE"
              ? "COMMON.DEACTIVATION"
              : "COMMON.ACTIVATION"
          ),
        }),
        title: t(
          role?.status === "ACTIVE"
            ? "COMMON.DEACTIVATION_TITLE"
            : "COMMON.ACTIVATION_TITLE",
          {
            ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
            ENTITY_VALUE: locale === "ar" ? role?.nameAr : role?.nameEn,
          }
        ),
        content: t(
          role?.status === "ACTIVE"
            ? "COMMON.DEACTIVATION_DESC"
            : "COMMON.ACTIVATION_DESC",
          {
            ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
            ENTITY_VALUE: locale === "ar" ? role?.nameAr : role?.nameEn,
          }
        ),
      }),
    [editRole, locale, showPrompt, t]
  );

  const memoizedValue = useMemo(
    () => ({
      changeStatus,
    }),
    [changeStatus]
  );
  return memoizedValue;
}
