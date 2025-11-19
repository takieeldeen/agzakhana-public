import {
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { getFetcher } from "./api";
import { APIListResponse } from "@/types/common";
import { Role, RoleListItem } from "../dashboard-types/roles";
import { useMemo } from "react";
import axios, { endpoints } from "./axios";
import { AxiosRequestConfig } from "axios";
import { ParamValue } from "next/dist/server/request/params";
import { BranchListItem, BranchType } from "../dashboard-types/branches";

let FIRST_LIST_KEY: [string, AxiosRequestConfig<any>] | null = null;
let LAST_LIST_KEY: [string, AxiosRequestConfig<any>] | null = null;

export function useGetBranches(
  limit: number,
  page: number,
  filters?: { [filter: string]: string | null },
  options?: Omit<
    UndefinedInitialDataOptions<
      APIListResponse<BranchListItem>,
      Error,
      APIListResponse<BranchListItem>,
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
    APIListResponse<BranchListItem>,
    Error
  >({
    ...options,
    queryKey: ["branches", URL],
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

export function useMutateBranch() {
  const queryClient = useQueryClient();
  // -------------------------
  // Creation
  // -------------------------
  const createBranch = useMutation({
    mutationFn: async (data: any) => {
      const URL = endpoints.branches.list;
      const {
        nameAr,
        nameEn,
        startHour,
        endHour,
        address,
        manager,
        phoneNumber,
      } = data;
      const modifiedData = {
        nameAr,
        nameEn,
        startHour,
        endHour,
        address: {
          lat: address?.lat,
          lng: address?.lng,
          displayName: address?.displayName,
        },
        manager: manager?._id,
        phoneNumber,
      };
      return axios.post(URL, modifiedData);
    },
    onSuccess: () => {
      if (FIRST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["branches", FIRST_LIST_KEY],
        });
    },
  });
  // -------------------------
  // Activate
  // -------------------------
  const activateBranch = useMutation({
    mutationFn: async (branch: BranchListItem | BranchType) => {
      const URL = endpoints.branches.activate(branch?._id);
      await axios.post(URL);
    },
    onSuccess: (res, branch) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["branches", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;
            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const targetListItem = updatedData?.content?.find(
              (cur: BranchListItem) => cur._id === branch?._id
            );
            if (!targetListItem) return;
            targetListItem.status = "ACTIVE";
            return updatedData;
          }
        );
      }
      queryClient.setQueryData(
        ["branches", endpoints.branches.details(branch?._id)],
        (cachedData: any) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = { ...updatedData.content, status: "ACTIVE" };
          return updatedData;
        }
      );
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["branches", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["branches", endpoints.branches.details(branch?._id)],
      });
    },
  });
  // -------------------------
  // Deactivate
  // -------------------------
  const deactivateBranch = useMutation({
    mutationFn: async (branch: BranchListItem | BranchType) => {
      const URL = endpoints.branches.deactivate(branch?._id);
      await axios.post(URL);
    },
    onSuccess: (res, branch) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(
          ["branches", LAST_LIST_KEY],
          (cachedData: any) => {
            if (!cachedData) return undefined;
            const updatedData = JSON.parse(JSON.stringify(cachedData));
            const targetListItem = updatedData?.content?.find(
              (cur: BranchListItem) => cur._id === branch?._id
            );
            if (!targetListItem) return;
            targetListItem.status = "INACTIVE";
            return updatedData;
          }
        );
      }
      queryClient.setQueryData(
        ["branches", endpoints.branches.details(branch?._id)],
        (cachedData: any) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = { ...updatedData.content, status: "INACTIVE" };
          return updatedData;
        }
      );
      if (!!LAST_LIST_KEY)
        queryClient.invalidateQueries({
          queryKey: ["branches", LAST_LIST_KEY],
        });
      queryClient.invalidateQueries({
        queryKey: ["branches", endpoints.branches.details(branch?._id)],
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
  const deleteBranch = useMutation({
    mutationFn: async (branchId: string) => {
      const URL = endpoints.branches.details(branchId);
      return axios.delete(URL);
    },
    onSuccess: (res, branchId) => {
      if (LAST_LIST_KEY) {
        queryClient.setQueryData(["branches", LAST_LIST_KEY], (cachedData) => {
          if (!cachedData) return undefined;
          const updatedData = JSON.parse(JSON.stringify(cachedData));
          updatedData.content = updatedData.content?.filter(
            (branch: BranchListItem) => branch?._id !== branchId
          );
          return updatedData;
        });
        queryClient.setQueryData(
          ["branches", endpoints.branches.details(branchId)],
          undefined
        );
      }
      queryClient.invalidateQueries({
        queryKey: ["branches", endpoints.branches.details(branchId)],
      });
      queryClient.invalidateQueries({ queryKey: ["branches", LAST_LIST_KEY] });
    },
  });
  return {
    createBranch,
    activateBranch,
    deactivateBranch,
    editRole,
    deleteBranch,
  };
}
