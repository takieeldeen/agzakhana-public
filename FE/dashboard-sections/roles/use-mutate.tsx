import { useMutateRole } from "@/app/dashboard-api/roles";
import { Role, RoleListItem } from "@/app/dashboard-types/roles";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";
import { usePrompt } from "@/components/prompt-provider";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export function useMutate() {
  const t = useTranslations();
  const locale = useLocale();
  const { activateRole, deactivateRole, deleteRole } = useMutateRole();
  const { showPrompt, closePrompt } = usePrompt();

  const editRole = useCallback((role: Role) => {
    console.log(role, "payload");
  }, []);

  const onDelete = useCallback(
    (role: Role | RoleListItem) => {
      const actionProps = {
        actionFn: async () => {
          try {
            await deleteRole.mutateAsync(role?._id);
            pushDashboardMessage({
              title: t("COMMON.SUCCESS_DIALOG_TITLE"),
              subtitle: t(`COMMON.DELETED_SUCCESSFULLY`, {
                ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
              }),
              variant: "success",
            });
          } catch {
            pushDashboardMessage({
              title: t("COMMON.FAIL_DIALOG_TITLE"),
              subtitle: t(`COMMON.DELETED_FAILED`, {
                ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
              }),
              variant: "fail",
            });
          } finally {
            closePrompt();
          }
        },
      };
      showPrompt({
        actionProps,
        variant: "ALERT",
        dialogTitle: t("COMMON.CONFIRMATION_DIALOG_TITLE", {
          OPERATION_NAME: t("COMMON.DELETION"),
        }),
        title: t("COMMON.DELETION_TITLE", {
          ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
          ENTITY_VALUE: locale === "ar" ? role?.nameAr : role?.nameEn,
        }),
        content: t("COMMON.DELETION_DESC", {
          ENTITY_NAME: t("ROLES_MANAGEMENT.ENTITY_NAME"),
          ENTITY_VALUE: locale === "ar" ? role?.nameAr : role?.nameEn,
        }),
      });
    },
    [closePrompt, deleteRole, locale, showPrompt, t]
  );
  const changeStatus = useCallback(
    (role: Role | RoleListItem) => {
      const actionProps = {
        actionFn: async () => {
          try {
            if (role?.status === "INACTIVE") {
              await activateRole.mutateAsync(role);
            } else {
              await deactivateRole.mutateAsync(role);
            }
            pushDashboardMessage({
              title: t("COMMON.SUCCESS_DIALOG_TITLE"),
              subtitle: t(
                `COMMON.${
                  role?.status === "INACTIVE" ? "ACTIVATED" : "DEACTIVATED"
                }_SUCCESSFULLY`,
                {
                  ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                }
              ),
              variant: "success",
            });
          } catch {
            pushDashboardMessage({
              title: t("COMMON.FAIL_DIALOG_TITLE"),
              subtitle: t(
                `COMMON.${
                  role?.status === "INACTIVE" ? "ACTIVATED" : "DEACTIVATED"
                }_FAILED`,
                {
                  ENTITY_NAME: t("ROLES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                }
              ),
              variant: "fail",
            });
          } finally {
            closePrompt();
          }
        },
      };
      showPrompt({
        actionProps,
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
      });
    },
    [activateRole, closePrompt, deactivateRole, locale, showPrompt, t]
  );

  const memoizedValue = useMemo(
    () => ({
      changeStatus,
      editRole,
      onDelete,
    }),
    [changeStatus, editRole, onDelete]
  );
  return memoizedValue;
}
