import {
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { dummyFetcher, dummyPromise, getDummyFetcher } from "./api";
import { APIListResponse } from "@/types/common";
import { Role, RoleListItem } from "../dashboard-types/roles";
import {
  ROLES_DETAILS_MOCK_DATA,
  ROLES_MOCK_DATA,
  USER_PER_ROLE_MOCK_DATA,
} from "../_mock/_roles";
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
    queryFn: dummyFetcher<APIListResponse<RoleListItem>>(ROLES_MOCK_DATA, URL, true),
    staleTime: Infinity,
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

export function useGetRoleDetails(roleId: ParamValue | string | undefined) {
  const URL = roleId ? endpoints.roles.details(roleId?.toString()) : "";
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    { content: Role },
    Error
  >({
    queryKey: ["roles", URL],
    queryFn: getDummyFetcher<any>(ROLES_DETAILS_MOCK_DATA),
    staleTime: Infinity,
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
      const URL = endpoints.roles.list;
      return axios.post(URL, data);
    },
    onSuccess: (res) =>
      queryClient.setQueryData(["roles"], (data) => {
        return data;
      }),
    onError: (res) =>
      queryClient.setQueryData(["roles"], (data) => {
        return data;
      }),
  });
  // -------------------------
  // Update
  // -------------------------
  const editRole = useMutation({
    mutationFn: async (data: any) => {
      const URL = endpoints.roles.details;
      return await dummyPromise();
      // return axios.post(URL, data);
    },
    onSuccess: (res, data) =>
      queryClient.setQueryData(
        ["roles", endpoints.roles.details(data.id)],
        (data) => {
          console.log(data);
          return data;
        }
      ),
    onError: (res) =>
      queryClient.setQueryData(["roles"], (data) => {
        console.log(data);
        return data;
      }),
  });

  // -------------------------
  // Clear Cart
  // -------------------------
  // const clearCart = useMutation({
  //   mutationFn: async () => {
  //     const URL = endpoints.cart.list;
  //     return await axios.delete(URL);
  //   },
  //   mutationKey: ["cart"],
  //   onSuccess: (res) => queryClient.setQueryData(["cart"], res?.data),
  // });
  // -------------------------
  // Update Cart Item
  // -------------------------
  // const updateCartItem = useMutation({
  //   mutationFn: async ({
  //     cartItemId,
  //     payload,
  //   }: {
  //     cartItemId: string;
  //     payload: any;
  //   }) => {
  //     const URL = endpoints.cart.single(cartItemId);
  //     return await axios.patch(URL, { cartItemId, ...payload });
  //   },
  //   onSuccess: (res) => queryClient.setQueryData(["cart"], res?.data),
  // });
  return { createRole, editRole };
}
