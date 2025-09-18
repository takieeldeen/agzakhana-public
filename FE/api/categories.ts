import { useQuery } from "@tanstack/react-query";
import axios, { endpoints } from "./axios";
import { APIResponse, getFetcher } from "./api";
import { useMemo } from "react";
import { Category } from "@/types/categories";

export function useGetCategories() {
  const URL = endpoints.categories.all;
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

export async function getAllCategories() {
  try {
    const URL = endpoints.categories.all;
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
