import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { dummyFetcher } from "./api";
import { APIListResponse } from "@/types/common";
import { Role } from "../dashboard-types/roles";
import { ROLES_MOCK_DATA } from "../_mock/_roles";
import { useMemo } from "react";
import { endpoints } from "./axios";
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
