import { useMutateUser } from "@/app/dashboard-api/users";
import { Role } from "@/app/dashboard-types/roles";
import { User, UserListItem } from "@/app/dashboard-types/users";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";
import { usePrompt } from "@/components/prompt-provider";
import { LocalizedObject } from "@/types/common";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export function useMutate() {
  const t = useTranslations();
  const locale = useLocale();
  const { activateUser, deactivateUser, deleteUser, deleteUserRole } =
    useMutateUser();
  const { showPrompt, closePrompt } = usePrompt();

  const editRole = useCallback((role: Role) => {
    console.log(role, "payload");
  }, []);

  const onDeleteUserRole = useCallback(
    (user: User, role: LocalizedObject) => {
      const actionProps = {
        actionFn: async () => {
          try {
            await deleteUserRole.mutateAsync({
              roleId: role?._id,
              userId: user?._id,
              user,
              role,
            });
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
      if (user?.roles?.length > 1) {
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
      } else {
        showPrompt({
          variant: "ERROR",
          title: t("VALIDATIONS.LAST_USER_ROLE", {
            user: locale === "ar" ? user?.nameAr : user?.nameEn,
          }),
        });
      }
    },
    [closePrompt, deleteUserRole, locale, showPrompt, t]
  );
  const onDelete = useCallback(
    (role: User | UserListItem) => {
      const actionProps = {
        actionFn: async () => {
          try {
            await deleteUser.mutateAsync(role?._id);
            pushDashboardMessage({
              title: t("COMMON.SUCCESS_DIALOG_TITLE"),
              subtitle: t(`COMMON.DELETED_SUCCESSFULLY`, {
                ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
              }),
              variant: "success",
            });
          } catch {
            pushDashboardMessage({
              title: t("COMMON.FAIL_DIALOG_TITLE"),
              subtitle: t(`COMMON.DELETED_FAILED`, {
                ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
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
          ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_NAME"),
          ENTITY_VALUE: locale === "ar" ? role?.nameAr : role?.nameEn,
        }),
        content: t("COMMON.DELETION_DESC", {
          ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_NAME"),
          ENTITY_VALUE: locale === "ar" ? role?.nameAr : role?.nameEn,
        }),
      });
    },
    [closePrompt, deleteUser, locale, showPrompt, t]
  );
  const changeStatus = useCallback(
    (user: User | UserListItem) => {
      const actionProps = {
        actionFn: async () => {
          try {
            if (user?.status === "INACTIVE") {
              await activateUser.mutateAsync(user);
            } else {
              await deactivateUser.mutateAsync(user);
            }
            pushDashboardMessage({
              title: t("COMMON.SUCCESS_DIALOG_TITLE"),
              subtitle: t(
                `COMMON.${
                  user?.status === "INACTIVE" ? "ACTIVATED" : "DEACTIVATED"
                }_SUCCESSFULLY`,
                {
                  ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
                }
              ),
              variant: "success",
            });
          } catch {
            pushDashboardMessage({
              title: t("COMMON.FAIL_DIALOG_TITLE"),
              subtitle: t(
                `COMMON.${
                  user?.status === "INACTIVE" ? "ACTIVATED" : "DEACTIVATED"
                }_FAILED`,
                {
                  ENTITY_NAME: t("USERS_MANAGEMENT.DEFINITE_ENTITY_NAME"),
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
        variant: user?.status === "ACTIVE" ? "ALERT" : "SUCCESS",
        dialogTitle: t("COMMON.CONFIRMATION_DIALOG_TITLE", {
          OPERATION_NAME: t(
            user?.status === "ACTIVE"
              ? "COMMON.DEACTIVATION"
              : "COMMON.ACTIVATION"
          ),
        }),
        title: t(
          user?.status === "ACTIVE"
            ? "COMMON.DEACTIVATION_TITLE"
            : "COMMON.ACTIVATION_TITLE",
          {
            ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_NAME"),
            ENTITY_VALUE: locale === "ar" ? user?.nameAr : user?.nameEn,
          }
        ),
        content: t(
          user?.status === "ACTIVE"
            ? "COMMON.DEACTIVATION_DESC"
            : "COMMON.ACTIVATION_DESC",
          {
            ENTITY_NAME: t("USERS_MANAGEMENT.ENTITY_NAME"),
            ENTITY_VALUE: locale === "ar" ? user?.nameAr : user?.nameEn,
          }
        ),
      });
    },
    [activateUser, closePrompt, deactivateUser, locale, showPrompt, t]
  );

  const memoizedValue = useMemo(
    () => ({
      changeStatus,
      editRole,
      onDelete,
      onDeleteUserRole,
    }),
    [changeStatus, editRole, onDelete, onDeleteUserRole]
  );
  return memoizedValue;
}
