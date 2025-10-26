import {
  UndefinedInitialDataOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { dummyFetcher } from "./api";
import { APIListResponse } from "@/types/common";
import { Role } from "../dashboard-types/roles";
import { ROLES_MOCK_DATA } from "../_mock/_roles";
import { useMemo } from "react";
import axios, { endpoints } from "./axios";
import { AxiosRequestConfig } from "axios";

export function useGetRoles(
  limit: number,
  page: number,
  filters?: { [filter: string]: string | null },
  options?: Omit<
    UndefinedInitialDataOptions<
      APIListResponse<Role>,
      Error,
      APIListResponse<Role>,
      readonly unknown[]
    >,
    "queryKey" | "queryFn"
  >
) {
  const URL: [string, AxiosRequestConfig] = [
    endpoints.roles.list,
    {
      params: {
        page,
        size: limit,
        ...filters,
      },
    },
  ];

  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<Role>,
    Error
  >({
    ...options,
    queryKey: ["roles", URL],
    queryFn: dummyFetcher<APIListResponse<Role>>(ROLES_MOCK_DATA, URL, true),
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
        console.log(data);
        return data;
      }),
    onError: (res) =>
      queryClient.setQueryData(["roles"], (data) => {
        console.log(data);
        return data;
      }),
  });

  // -------------------------
  // Remove From Cart
  // -------------------------
  // const removeFromCart = useMutation({
  //   mutationFn: async (cartItemId: string) => {
  //     const URL = endpoints.cart.single(cartItemId);
  //     return await axios.delete(URL);
  //   },
  //   onSuccess: (res) => {
  //     queryClient.setQueryData(["cart"], res?.data);
  //     queryClient.setQueryData(["cart-details"], (oldData: any) => {
  //       const modifiedData = JSON.parse(JSON.stringify(oldData));
  //       modifiedData.content.cart = res?.data?.content?.cart;
  //       return modifiedData;
  //     });
  //   },
  // });

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
  return { createRole };
}
