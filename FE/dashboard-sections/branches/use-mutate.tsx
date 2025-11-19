import { useMutateBranch } from "@/app/dashboard-api/branches";
import { BranchListItem, BranchType } from "@/app/dashboard-types/branches";
import { Role } from "@/app/dashboard-types/roles";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";
import { usePrompt } from "@/components/prompt-provider";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export function useMutate() {
  const t = useTranslations();
  const locale = useLocale();
  const { activateBranch, deactivateBranch, deleteBranch } = useMutateBranch();
  const { showPrompt, closePrompt } = usePrompt();

  const editRole = useCallback((role: Role) => {
    console.log(role, "payload");
  }, []);

  const onDelete = useCallback(
    (branch: BranchType | BranchListItem) => {
      const actionProps = {
        actionFn: async () => {
          try {
            await deleteBranch.mutateAsync(branch?._id);
            pushDashboardMessage({
              title: t("COMMON.SUCCESS_DIALOG_TITLE"),
              subtitle: t(`COMMON.DELETED_SUCCESSFULLY`, {
                ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
              }),
              variant: "success",
            });
          } catch {
            pushDashboardMessage({
              title: t("COMMON.FAIL_DIALOG_TITLE"),
              subtitle: t(`COMMON.DELETED_FAILED`, {
                ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
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
          ENTITY_NAME: t("BRANCHES_MANAGEMENT.ENTITY_NAME"),
          ENTITY_VALUE: locale === "ar" ? branch?.nameAr : branch?.nameEn,
        }),
        content: t("COMMON.DELETION_DESC", {
          ENTITY_NAME: t("BRANCHES_MANAGEMENT.ENTITY_NAME"),
          ENTITY_VALUE: locale === "ar" ? branch?.nameAr : branch?.nameEn,
        }),
      });
    },
    [closePrompt, deleteBranch, locale, showPrompt, t]
  );
  const changeStatus = useCallback(
    (branch: BranchType | BranchListItem) => {
      const actionProps = {
        actionFn: async () => {
          try {
            if (branch?.status === "INACTIVE") {
              await activateBranch.mutateAsync(branch);
            } else {
              await deactivateBranch.mutateAsync(branch);
            }
            pushDashboardMessage({
              title: t("COMMON.SUCCESS_DIALOG_TITLE"),
              subtitle: t(
                `COMMON.${
                  branch?.status === "INACTIVE" ? "ACTIVATED" : "DEACTIVATED"
                }_SUCCESSFULLY`,
                {
                  ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                }
              ),
              variant: "success",
            });
          } catch {
            pushDashboardMessage({
              title: t("COMMON.FAIL_DIALOG_TITLE"),
              subtitle: t(
                `COMMON.${
                  branch?.status === "INACTIVE" ? "ACTIVATED" : "DEACTIVATED"
                }_FAILED`,
                {
                  ENTITY_NAME: t("BRANCHES_MANAGEMENT.DEFINITE_ENTITY_NAME"),
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
        variant: branch?.status === "ACTIVE" ? "ALERT" : "SUCCESS",
        dialogTitle: t("COMMON.CONFIRMATION_DIALOG_TITLE", {
          OPERATION_NAME: t(
            branch?.status === "ACTIVE"
              ? "COMMON.DEACTIVATION"
              : "COMMON.ACTIVATION"
          ),
        }),
        title: t(
          branch?.status === "ACTIVE"
            ? "COMMON.DEACTIVATION_TITLE"
            : "COMMON.ACTIVATION_TITLE",
          {
            ENTITY_NAME: t("BRANCHES_MANAGEMENT.ENTITY_NAME"),
            ENTITY_VALUE: locale === "ar" ? branch?.nameAr : branch?.nameEn,
          }
        ),
        content: t(
          branch?.status === "ACTIVE"
            ? "COMMON.DEACTIVATION_DESC"
            : "COMMON.ACTIVATION_DESC",
          {
            ENTITY_NAME: t("BRANCHES_MANAGEMENT.ENTITY_NAME"),
            ENTITY_VALUE: locale === "ar" ? branch?.nameAr : branch?.nameEn,
          }
        ),
      });
    },
    [activateBranch, closePrompt, deactivateBranch, locale, showPrompt, t]
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
