import { AxiosRequestConfig } from "axios";
import axios, { endpoints } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponse, getFetcher } from "./api";
import { useMemo } from "react";
import { ManufacturerListItem } from "@/types/medcines";
import { Category } from "@/types/categories";
import { APIListResponse } from "@/types/common";
import { Offer } from "@/types/offers";

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

export async function getDealDetails(dealId: string | undefined) {
  try {
    if (!dealId) return { deal: null, status: "fail", error: null };
    const URL = endpoints.deals.details(dealId);
    const res = await axios.get(URL);
    const { content, status } = res?.data;
    return { deal: content as Offer, status, error: null };
  } catch (err) {
    return { deal: null, status: "fail", error: err };
  }
}

export function useGetAllDealsManufacturers() {
  const URL = endpoints.deals.manufacturers;
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["filters", "manufacturer"],
    queryFn: getFetcher<APIListResponse<ManufacturerListItem>>(URL),
  });
  const memoizedValue = useMemo(
    () => ({
      manufacturers: data?.content ?? [],
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
    queryFn: getFetcher<APIResponse<ManufacturerListItem[]>>(URL),
  });
  const memoizedValue = useMemo(
    () => ({
      manufacturers: data?.content ?? [],
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
    queryFn: getFetcher<APIResponse<Category[]>>(URL),
  });
  const memoizedValues = useMemo(
    () => ({
      categories: data?.content ?? [],
      categoriesLoading: isLoading,
      error,
      categoriesValidating: isFetching,
      refetch,
    }),
    [data?.content, error, isFetching, isLoading, refetch]
  );
  return memoizedValues;
}

export async function getLatestDeals() {
  try {
    const URL = endpoints.deals.today;
    const res = await axios.get(URL);
    const { content, results, status } = res?.data;
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
