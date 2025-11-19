import { APIListResponse } from "@/types/common";
import {
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosRequestConfig } from "axios";
import axios, { endpoints } from "./axios";
import { useMemo } from "react";
import { dummyFetcher } from "./api";
import { KANBAN_MODIFIED_MOCK } from "@/_mock/_kanban";
import { objectToFormData } from "@/utils/formData";
import { User, UserListItem } from "../dashboard-types/users";
import { ALLOCATED_STAFF } from "@/_mock/_staff";

let FIRST_LIST_KEY: [string, AxiosRequestConfig<any>] | null = null;
let LAST_LIST_KEY: [string, AxiosRequestConfig<any>] | null = null;
let STAFF_LIST_KEY: string[];
export function useGetStaffList(
  limit: number,
  page: number,
  filters?: { [filter: string]: string | null },
  options?: Omit<
    UndefinedInitialDataOptions<
      APIListResponse<any>,
      Error,
      APIListResponse<any>,
      readonly unknown[]
    >,
    "queryKey" | "queryFn"
  >,
  useLastKey?: boolean
) {
  const URL: [string, AxiosRequestConfig] =
    useLastKey && LAST_LIST_KEY
      ? LAST_LIST_KEY
      : [
          endpoints.branches.list,
          {
            params: {
              page,
              size: limit,
              ...filters,
            },
          },
        ];
  if (!FIRST_LIST_KEY) FIRST_LIST_KEY = URL;
  LAST_LIST_KEY = URL;
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<any>,
    Error
  >({
    ...options,
    queryKey: ["users", "branches", URL],
    queryFn: dummyFetcher<APIListResponse<any>>(KANBAN_MODIFIED_MOCK, URL),
  });
  const branches = useMemo(() => {
    if (!data?.content) return [];
    return Object.values(
      Object.groupBy(data?.content, (user) => user?.branch?._id)
    )?.map(
      (userGroup) =>
        userGroup?.[0]?.branch ?? {
          _id: "unassigned",
          nameAr: "موظفين غير معينيين",
          nameEn: "Unassigned Staff",
        }
    );
  }, [data?.content]);
  const modifiedStaff = data?.content?.map((user) =>
    !user.branch
      ? {
          ...user,
          branch: {
            _id: "unassigned",
            nameAr: "موظفيين غير معينيين",
            nameEn: "Unallocated staff",
          },
        }
      : user
  );
  const memoizedValue = useMemo(
    () => ({
      data: modifiedStaff ?? [],
      branches: branches ?? [],
      results: data?.results,
      isLoading,
      isFetching,
      refetch,
      error,
    }),
    [
      branches,
      data?.results,
      error,
      isFetching,
      isLoading,
      modifiedStaff,
      refetch,
    ]
  );

  return memoizedValue;
}

export function useGetAllocatedStaff() {
  const URL = endpoints.valueHelp.activeUsers;
  const queryClient = useQueryClient();
  const key = useMemo(
    () => ["valueHelp", "branches", "users", "allocated", URL],
    [URL]
  );
  STAFF_LIST_KEY = key;
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<any>,
    Error
  >({
    queryKey: key,
    queryFn: dummyFetcher<APIListResponse<any>>(ALLOCATED_STAFF, URL),
  });

  const memoizedValue = useMemo(
    () => ({
      data: data?.content ?? [],
      results: data?.results,
      isLoading,
      isFetching,
      refetch,
      error,
      key,
      queryClient,
    }),
    [
      data?.content,
      data?.results,
      error,
      isFetching,
      isLoading,
      key,
      queryClient,
      refetch,
    ]
  );

  return memoizedValue;
}

export function useMutateUser() {
  const queryClient = useQueryClient();
  // -------------------------
  // Allocate Users
  // -------------------------

  const allocateUser = useMutation({
    mutationFn: async (data: any) => {
      const allocationData = {
        user: data?.user?._id,
        branch: data?.branch?._id,
      };
      const URL = endpoints.branches.list;
      return true;
      //   await axios.post(URL, allocationData);
    },
    onSuccess: (res, allocationData) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["users", "branches", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;

            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const newUserData = allocationData?.user;
            newUserData.branch = allocationData.branch;
            const targetIndex = updatedData?.content?.findIndex(
              (cur: any) => cur?._id === allocationData?.user?._id
            );
            if (targetIndex < 0) return;
            updatedData.content[targetIndex] = newUserData;
            return updatedData;
          }
        );
        queryClient.invalidateQueries({
          queryKey: ["users", "branches", LAST_LIST_KEY],
        });
      }
    },
  });
  const createUser = useMutation({
    mutationFn: async (data: any) => {
      const modifiedData = {
        imageUrl: data?.imageUrl?.[0],
        nameAr: data?.nameAr,
        nameEn: data?.nameEn,
        email: data?.email,
        gender: data?.gender?.value,
        nationalId: data?.nationalId,
        birthDate: data?.birthDate,
        joiningDate: data?.joiningDate,
        nationality: data?.nationality?._id,
        city: data?.city?._id,
        branch: data?.branch?._id ?? null,
        phoneNumber: data?.phoneNumber,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
        displayName: data?.location?.displayName,
        files: data?.files?.map((file: any) => file?._id),
        googleMapUrl: data?.googleMapUrl ?? data?.location?.googleMapUrl,
        roles: data?.roles?.map((role: any) => role?._id),
      };
      const formData = objectToFormData(modifiedData);
      const URL = endpoints.users.list;
      await axios.post(URL, formData);
    },
    onSuccess: () => {
      if (FIRST_LIST_KEY)
        queryClient.invalidateQueries({ queryKey: ["roles", FIRST_LIST_KEY] });
    },
  });
  // -------------------------
  // Activate
  // -------------------------
  const activateUser = useMutation({
    mutationFn: async (user: UserListItem | User) => {
      const URL = endpoints.users.activate(user?._id);
      await axios.post(URL);
    },
    onSuccess: (res, user) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["users", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;
            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const targetListItem = updatedData?.content?.find(
              (cur: UserListItem) => cur._id === user?._id
            );
            if (!targetListItem) return;
            targetListItem.status = "ACTIVE";
            return updatedData;
          }
        );
      }
      queryClient.setQueryData(
        ["users", endpoints.users.details(user?._id)],
        (cachedData: any) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = { ...updatedData.content, status: "ACTIVE" };
          return updatedData;
        }
      );
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["users", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["users", endpoints.users.details(user?._id)],
      });
    },
  });
  // -------------------------
  // Deactivate
  // -------------------------
  const deactivateUser = useMutation({
    mutationFn: async (user: UserListItem | User) => {
      const URL = endpoints.users.deactivate(user?._id);
      await axios.post(URL);
    },
    onSuccess: (res, user) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["users", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;
            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const targetListItem = updatedData?.content?.find(
              (cur: UserListItem) => cur._id === user?._id
            );
            if (!targetListItem) return;
            targetListItem.status = "INACTIVE";
            return updatedData;
          }
        );
      }
      queryClient.setQueryData(
        ["users", endpoints.users.details(user?._id)],
        (cachedData: any) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = { ...updatedData.content, status: "INACTIVE" };
          return updatedData;
        }
      );
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["users", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["users", endpoints.users.details(user?._id)],
      });
    },
  });
  // -------------------------
  // Update
  // -------------------------
  const editUser = useMutation({
    mutationFn: async (data: any) => {
      const URL = endpoints.users.details(data?._id);
      const modifiedData = {
        imageUrl:
          typeof data?.imageUrl === "string"
            ? data?.imageUrl
            : data?.imageUrl?.[0],
        nameAr: data?.nameAr,
        nameEn: data?.nameEn,
        email: data?.email,
        gender: data?.gender?.value,
        nationalId: data?.nationalId,
        birthDate: data?.birthDate,
        joiningDate: data?.joiningDate,
        nationality: data?.nationality?._id,
        city: data?.city?._id,
        branch: data?.branch?._id ?? null,
        phoneNumber: data?.phoneNumber,
        lat: data?.location?.lat,
        lng: data?.location?.lng,
        displayName: data?.location?.displayName,
        files: data?.files?.map((file: any) => file?._id),
        googleMapUrl: data?.googleMapUrl ?? data?.location?.googleMapUrl,
        roles: data?.roles?.map((role: any) => role?._id),
      };
      const formData = objectToFormData(modifiedData);
      return await axios.patch(URL, formData);
    },
    onSuccess: (res, data) => {
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["users", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["users", endpoints.users.details(data._id)],
      });
    },
  });
  // -------------------------
  // Deletion
  // -------------------------
  const deleteUser = useMutation({
    mutationFn: async (id: string) => {
      const URL = endpoints.users.details(id);
      return axios.delete(URL);
    },
    onSuccess: (res, id) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(["users", LAST_LIST_KEY], (cachedData) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = updatedData.content?.filter(
            (cur: UserListItem) => cur?._id !== id
          );
          return updatedData;
        });
        queryClient.setQueryData(
          ["users", endpoints.users.details(id)],
          undefined
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["users", endpoints.users.details(id)],
      });
      queryClient.invalidateQueries({ queryKey: ["users", LAST_LIST_KEY] });
    },
  });
  // -------------------------
  // Delete User Role
  // -------------------------
  const deleteUserRole = useMutation({
    mutationFn: async (payload: any) => {
      const URL = endpoints.users.deleteUserRole(
        payload.roleId,
        payload.userId
      );
      return axios.post(URL);
    },
    onSuccess: (res, payload: any) => {
      queryClient.setQueryData(
        ["users", endpoints.users.details(payload?.userId?.toString())],
        (cachedData) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content.roles = res?.data?.roles;
          return updatedData;
        }
      );
      queryClient.invalidateQueries({
        queryKey: ["users", endpoints.users.details(payload?.roleId)],
      });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({
        queryKey: [
          "roles",
          "users",
          endpoints.users.userPerRoles(payload.roleId?.toString()),
        ],
      });
    },
  });
  return {
    listKey: STAFF_LIST_KEY,
    allocateUser,
    createUser,
    activateUser,
    deactivateUser,
    editUser,
    deleteUser,
    deleteUserRole,
  };
}
