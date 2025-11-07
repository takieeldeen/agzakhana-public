import {
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getDummyFetcher, getFetcher } from "./api";
import { APIListResponse } from "@/types/common";
import { Role, RoleListItem } from "../dashboard-types/roles";
import { USER_PER_ROLE_MOCK_DATA } from "../_mock/_roles";
import { useMemo } from "react";
import axios, { endpoints } from "./axios";
import { AxiosRequestConfig } from "axios";
import { ParamValue } from "next/dist/server/request/params";

let FIRST_LIST_KEY: [string, AxiosRequestConfig<any>] | null = null;
let LAST_LIST_KEY: [string, AxiosRequestConfig<any>] | null = null;

export function useGetRoles(
  limit: number,
  page: number,
  filters?: { [filter: string]: string | null },
  options?: Omit<
    UndefinedInitialDataOptions<
      APIListResponse<RoleListItem>,
      Error,
      APIListResponse<RoleListItem>,
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
          endpoints.roles.list,
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
    APIListResponse<RoleListItem>,
    Error
  >({
    ...options,
    queryKey: ["roles", URL],
    queryFn: getFetcher(URL),
  });

  const memoizedValue = useMemo(
    () => ({
      data: data?.content ?? [],
      results: data?.results,
      isLoading,
      isFetching,
      refetch,
      error,
    }),
    [data?.content, data?.results, error, isFetching, isLoading, refetch]
  );

  return memoizedValue;
}

export function useGetRoleDetails(
  roleId: ParamValue | string | undefined,
  options?: Omit<
    UndefinedInitialDataOptions<any, Error, any, readonly unknown[]>,
    "queryKey" | "queryFn"
  >
) {
  const URL = roleId ? endpoints.roles.details(roleId?.toString()) : "";
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    { content: Role },
    Error
  >({
    queryKey: ["roles", URL],
    queryFn: getFetcher<any>(URL),
    retry: false,
    ...(options ?? {}),
  });
  const memoizedValue = useMemo(
    () => ({
      data: data?.content ?? null,
      isLoading,
      isFetching,
      refetch,
      error,
    }),
    [data?.content, error, isFetching, isLoading, refetch]
  );

  return memoizedValue;
}

export function useGetUsersPerRole(roleId: ParamValue | string | undefined) {
  const URL = roleId ? endpoints.roles.details(roleId?.toString()) : "";
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<{
      _id: string;
      nameAr: string;
      nameEn: string;
      imageUrl: string;
      email: string;
    }>,
    Error
  >({
    queryKey: ["roles", "users", URL],
    queryFn: getDummyFetcher<
      APIListResponse<{
        _id: string;
        nameAr: string;
        nameEn: string;
        imageUrl: string;
        email: string;
      }>
    >(USER_PER_ROLE_MOCK_DATA),
    staleTime: Infinity,
  });
  const memoizedValue = useMemo(
    () => ({
      data: data?.content ?? [],
      results: data?.results ?? 0,
      isLoading,
      isFetching,
      refetch,
      error,
    }),
    [data?.content, data?.results, error, isFetching, isLoading, refetch]
  );

  return memoizedValue;
}

export function useMutateRole() {
  const queryClient = useQueryClient();
  // -------------------------
  // Creation
  // -------------------------
  const createRole = useMutation({
    mutationFn: async (data: any) => {
      const URL = endpoints.users.list;
      return axios.post(URL, data);
    },
    onSuccess: () => {
      if (FIRST_LIST_KEY)
        queryClient.invalidateQueries({ queryKey: ["users", FIRST_LIST_KEY] });
    },
  });
  // -------------------------
  // Activate
  // -------------------------
  const activateRole = useMutation({
    mutationFn: async (role: RoleListItem | Role) => {
      const URL = endpoints.roles.activate(role?._id);
      await axios.post(URL);
    },
    onSuccess: (res, role) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["roles", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;
            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const targetListItem = updatedData?.content?.find(
              (cur: RoleListItem) => cur._id === role?._id
            );
            if (!targetListItem) return;
            targetListItem.status = "ACTIVE";
            return updatedData;
          }
        );
      }
      queryClient.setQueryData(
        ["roles", endpoints.roles.details(role?._id)],
        (cachedData: any) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = { ...updatedData.content, status: "ACTIVE" };
          return updatedData;
        }
      );
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["roles", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["roles", endpoints.roles.details(role?._id)],
      });
    },
  });
  // -------------------------
  // Deactivate
  // -------------------------
  const deactivateRole = useMutation({
    mutationFn: async (role: RoleListItem | Role) => {
      const URL = endpoints.roles.deactivate(role?._id);
      await axios.post(URL);
    },
    onSuccess: (res, role) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["roles", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;
            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const targetListItem = updatedData?.content?.find(
              (cur: RoleListItem) => cur._id === role?._id
            );
            if (!targetListItem) return;
            targetListItem.status = "INACTIVE";
            return updatedData;
          }
        );
      }
      queryClient.setQueryData(
        ["roles", endpoints.roles.details(role?._id)],
        (cachedData: any) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = { ...updatedData.content, status: "INACTIVE" };
          return updatedData;
        }
      );
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["roles", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["roles", endpoints.roles.details(role?._id)],
      });
    },
  });
  // -------------------------
  // Update
  // -------------------------
  const editRole = useMutation({
    mutationFn: async (payload: any) => {
      const URL = endpoints.roles.details(payload?._id);
      return await axios.patch(URL, payload);
    },
    onSuccess: (res, data) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["roles", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;
            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const targetListItem = updatedData?.content?.find(
              (cur: RoleListItem) => cur._id === data?._id
            );
            if (!targetListItem) return;
            if (data.status) targetListItem.status = data.status;
            if (data.nameAr) targetListItem.nameAr = data.nameAr;
            if (data.nameEn) targetListItem.nameEn = data.nameEn;
            if (data.descriptionAr)
              targetListItem.descriptionAr = data.descriptionAr;
            if (data.descriptionEn)
              targetListItem.descriptionEn = data.descriptionAr;
            return updatedData;
          }
        );
      }
      queryClient.setQueryData(
        ["roles", endpoints.roles.details(data._id)],
        (cachedData: any) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          console.log(updatedData);
          updatedData.content = { ...updatedData.content, ...data };
          return updatedData;
        }
      );
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["roles", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["roles", endpoints.roles.details(data._id)],
      });
    },
  });
  // -------------------------
  // Deletion
  // -------------------------
  const deleteRole = useMutation({
    mutationFn: async (roleId: string) => {
      const URL = endpoints.roles.details(roleId);
      return axios.delete(URL);
    },
    onSuccess: (res, roleId) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(["roles", LAST_LIST_KEY], (cachedData) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = updatedData.content?.filter(
            (role: RoleListItem) => role?._id !== roleId
          );
          return updatedData;
        });
        queryClient.setQueryData(
          ["roles", endpoints.roles.details(roleId)],
          undefined
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["roles", endpoints.roles.details(roleId)],
      });
      queryClient.invalidateQueries({ queryKey: ["roles", LAST_LIST_KEY] });
    },
  });
  return { createRole, activateRole, deactivateRole, editRole, deleteRole };
}
