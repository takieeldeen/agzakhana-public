import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query";
import { endpoints } from "./axios";
import { getFetcher } from "./api";
import { useMemo } from "react";
import axios from "axios";

export function useGetAddress(
  lat: number,
  lng: number,
  options?: Omit<
    UndefinedInitialDataOptions<any, Error, any, readonly unknown[]>,
    "queryKey" | "queryFn"
  >
) {
  const URL = lat && lng ? endpoints.common.geocode(lat, lng) : "";
  const { data, isLoading, isFetching, refetch, error } = useQuery<any, Error>({
    queryKey: ["roles", URL],
    queryFn: getFetcher<any>(URL),
    retry: false,
    ...(options ?? {}),
  });
  const memoizedValue = useMemo(
    () => ({
      data: data ?? null,
      isLoading,
      isFetching,
      refetch,
      error,
    }),
    [data, error, isFetching, isLoading, refetch]
  );

  return memoizedValue;
}

export function useGetLocationSuggestions(
  q: string,
  options?: Omit<
    UndefinedInitialDataOptions<any, Error, any, readonly unknown[]>,
    "queryKey" | "queryFn"
  >
) {
  const URL = q ? endpoints.common.addressSuggestions(q) : "";
  const { data, isLoading, isFetching, refetch, error } = useQuery<any, Error>({
    queryKey: ["roles", URL],
    queryFn: async () => {
      const res = await axios.get(URL);
      return res?.data;
    },
    retry: false,
    ...(options ?? {}),
  });
  const bounds = useMemo(() => {
    const lats = Array.isArray(data)
      ? data?.map((suggestion: any) => parseFloat(suggestion?.lat))
      : [0];
    const longs = Array.isArray(data)
      ? data?.map((suggestion: any) => parseFloat(suggestion?.lon))
      : [0];
    console.log(lats, longs);

    return {
      minLat: Math.min(...lats),
      maxLat: Math.max(...lats),
      minLng: Math.min(...longs),
      maxLng: Math.max(...longs),
    };
  }, [data]);
  const memoizedValue = useMemo(
    () => ({
      data: data ?? null,
      bounds,
      isLoading,
      isFetching,
      refetch,
      error,
    }),
    [bounds, data, error, isFetching, isLoading, refetch]
  );

  return memoizedValue;
}
