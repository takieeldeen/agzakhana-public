import { useQuery } from "@tanstack/react-query";
import { dummyFetcher } from "./api";
import { APIListResponse, LocalizedObject } from "@/types/common";
import { PERMISSIONS_HELPER_MOCK_DATA } from "../_mock/_roles";
import { useMemo } from "react";
import { endpoints } from "./axios";

export function useGetPermissionsHelper() {
  const URL = endpoints.helpers.permissions;

  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<LocalizedObject>,
    Error
  >({
    queryKey: ["permissions", "helper"],
    queryFn: dummyFetcher<APIListResponse<LocalizedObject>>(
      PERMISSIONS_HELPER_MOCK_DATA,
      URL
    ),
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
