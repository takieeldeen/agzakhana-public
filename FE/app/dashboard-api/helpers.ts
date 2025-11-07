import { useQuery } from "@tanstack/react-query";
import { getFetcher } from "./api";
import { APIListResponse, LocalizedObject } from "@/types/common";
import { useMemo } from "react";
import { endpoints } from "./axios";

export function useGetPermissionsHelper() {
  const URL = endpoints.valueHelp.permissions;

  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<LocalizedObject>,
    Error
  >({
    queryKey: ["permissions", "helper"],
    queryFn: getFetcher<APIListResponse<LocalizedObject>>(URL),
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
