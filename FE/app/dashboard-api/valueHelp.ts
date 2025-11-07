import { APIListResponse, LocalizedObject } from "@/types/common";
import { endpoints } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { getFetcher } from "./api";
import { useMemo } from "react";

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
