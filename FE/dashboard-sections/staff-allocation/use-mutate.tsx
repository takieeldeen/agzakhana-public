import { useMutateUser } from "@/app/dashboard-api/staff-allocation";
import { Role } from "@/app/dashboard-types/roles";
import { User, UserListItem } from "@/app/dashboard-types/users";
import { pushDashboardMessage } from "@/components/dashboard-toast-message";
import { usePrompt } from "@/components/prompt-provider";
import { LocalizedObject } from "@/types/common";
import { arrayMove } from "@dnd-kit/sortable";
import { useQueryClient } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useMemo } from "react";

export function useMutate() {
  const t = useTranslations();
  const locale = useLocale();
  const {
    listKey,
    activateUser,
    deactivateUser,
    deleteUser,
    deleteUserRole,
    allocateUser,
  } = useMutateUser();
  const { showPrompt, closePrompt } = usePrompt();
  const queryClient = useQueryClient();
  const editRole = useCallback((role: Role) => {
    console.log(role, "payload");
  }, []);

  const onAllocating = useCallback(
    async (
      user: any,
      branch: any,
      shift: any,
      method: "reorder" | "allocate"
    ) => {
      if (!user || !branch) return;
      if (method === "allocate") {
        queryClient.setQueryData(listKey, (cachedData: any) => {
          if (!cachedData) return cachedData;
          const oldArray = Array.isArray(cachedData?.content)
            ? [...cachedData.content]
            : [];
          const activeIndex = oldArray.findIndex((u) => u._id === user._id);
          if (activeIndex === -1) return cachedData;
          const [removed] = oldArray.splice(activeIndex, 1);

          const targetBranchId = branch?._id;
          const branchIds = oldArray?.map((user) => user?.branch?._id);
          const lastBranchIndex = branchIds.lastIndexOf(targetBranchId);
          const insertionIndex =
            lastBranchIndex === -1 ? oldArray?.length : lastBranchIndex + 1;

          const moved = { ...removed, branch };
          oldArray.splice(insertionIndex, 0, moved);

          return { ...cachedData, content: oldArray };
        });
      } else {
        queryClient.setQueryData(listKey, (data: any) => {
          if (!data) return data;
          const oldArray = Array.isArray(data.content) ? [...data.content] : [];
          const activeIndex = oldArray.findIndex(
            (u: any) => u?._id === user?._id
          );
          const overIndex = oldArray.findIndex(
            (u: any) => u?._id === branch?._id
          );
          if (activeIndex === -1 || overIndex === -1) return data;
          // preserve branch on swap (you already did this)
          if (oldArray[activeIndex]?.branch) {
            oldArray[activeIndex].branch =
              oldArray[overIndex]?.branch ?? oldArray[activeIndex].branch;
          }
          const newArray = arrayMove(oldArray, activeIndex, overIndex);
          return { ...data, content: newArray };
        });
      }
      // await allocateUser.mutateAsync(data);
    },
    [listKey, queryClient]
  );

  const onUnallocating = useCallback(
    async (user: any) => {
      queryClient.setQueryData(listKey, (data: any) => {
        if (!data) return data;
        const oldArray = Array.isArray(data.content) ? [...data.content] : [];
        const activeIndex = oldArray.findIndex(
          (u: any) => u?._id === user?._id
        );
        if (activeIndex === -1) return data;
        const [removed] = oldArray?.splice(activeIndex, 1);
        // preserve branch on swap (you already did this)
        const newBranch = {
          _id: "UNALLOCATED",
          nameAr: "موظفين غير معينيين",
          nameEn: "Unallocated Staff",
        };

        const newUserData = { ...removed, branch: newBranch };
        return { ...data, content: [...oldArray, newUserData] };
      });
    },
    [listKey, queryClient]
  );
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
      onAllocating,
      onUnallocating,
      changeStatus,
      editRole,
      onDelete,
      onDeleteUserRole,
    }),
    [
      changeStatus,
      editRole,
      onAllocating,
      onDelete,
      onDeleteUserRole,
      onUnallocating,
    ]
  );
  return memoizedValue;
}
