import { APIListResponse, LocalizedObject } from "@/types/common";
import { endpoints } from "./axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { dummyFetcher, getFetcher } from "./api";
import { useMemo } from "react";
import { ACTIVE_BRANCHES } from "@/_mock/_staff";
import { StaffCountedActiveBranchesType } from "../dashboard-types/staff-allocation";

export function useGetAllCities() {
  const URL = endpoints.valueHelp.cities;
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<LocalizedObject>,
    Error
  >({
    queryKey: ["valueHelp", "city", URL],
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

export function useGetAllNationalities() {
  const URL = endpoints.valueHelp.nationalities;
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<LocalizedObject>,
    Error
  >({
    queryKey: ["valueHelp", "nationality", URL],
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

export function useGetAllActiveBranches() {
  const URL = endpoints.valueHelp.activeBranches;
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<LocalizedObject>,
    Error
  >({
    queryKey: ["valueHelp", "branches", "active", URL],
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

export function useGetAllActiveRoles() {
  const URL = endpoints.valueHelp.activeRoles;
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<LocalizedObject>,
    Error
  >({
    queryKey: ["valueHelp", "roles", "active", URL],
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
export function useGetAllActiveUsers() {
  const URL = endpoints.valueHelp.activeUsers;
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<LocalizedObject>,
    Error
  >({
    queryKey: ["valueHelp", "users", "active", URL],
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

export function useGetStaffCountedActiveBranches() {
  const URL = endpoints.valueHelp.activeUsers;
  const queryClient = useQueryClient();
  const key = useMemo(
    () => ["valueHelp", "branches", "users", "active", URL],
    [URL]
  );
  const { data, isLoading, isFetching, refetch, error } = useQuery<
    APIListResponse<StaffCountedActiveBranchesType>,
    Error
  >({
    queryKey: key,
    queryFn: dummyFetcher<APIListResponse<StaffCountedActiveBranchesType>>(
      ACTIVE_BRANCHES,
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
