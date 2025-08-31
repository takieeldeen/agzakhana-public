import { AxiosRequestConfig } from "axios";
import axios, { endpoints } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { getFetcher } from "./api";
import { useMemo } from "react";
import { ManufacturerListItem } from "@/types/medcines";
import { Category } from "@/types/categories";

export async function getAllDeals(
  page: string | undefined,
  limit: string | undefined,
  category: string | undefined,
  manufacturer: string | undefined
) {
  try {
    const URL: [string, AxiosRequestConfig] = [
      endpoints.deals.list,
      {
        params: {
          page: page ?? "1",
          limit: limit ?? "20",
          category,
          manufacturer,
        },
      },
    ];
    const res = await axios.get(URL[0], URL[1]);
    const { content, results, status } = res?.data;
    console.log(content, results, status);
    return { content, results, status, error: null };
  } catch (err: any) {
    return {
      content: [],
      results: 0,
      status: "fail",
      error: err?.response?.data,
    };
  }
}

export function useGetAllDealsManufacturers() {
  const URL = endpoints.deals.manufacturers;
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["filters", "manufacturer"],
    queryFn: getFetcher(URL),
  });
  const memoizedValue = useMemo(
    () => ({
      manufacturers: (data?.content as ManufacturerListItem[]) ?? [],
      manufacturersLoading: isLoading,
      refetch,
      manufacturersError: error,
    }),
    [data, error, isLoading, refetch]
  );
  return memoizedValue;
}
export function useGetAllDealsCategories() {
  const URL = endpoints.deals.manufacturers;
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["filters", "manufacturer"],
    queryFn: getFetcher(URL),
  });
  const memoizedValue = useMemo(
    () => ({
      manufacturers: (data?.content as ManufacturerListItem[]) ?? [],
      manufacturersLoading: isLoading,
      refetch,
      manufacturersError: error,
    }),
    [data, error, isLoading, refetch]
  );
  return memoizedValue;
}

export function useGetDealsCategories() {
  const URL = endpoints.deals.categories;
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: getFetcher(URL),
  });
  const memoizedValues = useMemo(
    () => ({
      categories: (data?.content as Category[]) ?? [],
      categoriesLoading: isLoading,
      error,
      categoriesValidating: isFetching,
      refetch,
    }),
    [data?.content, error, isFetching, isLoading, refetch]
  );
  return memoizedValues;
}
