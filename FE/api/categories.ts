import { useQuery } from "@tanstack/react-query";
import { endpoints } from "./axios";
import { getFetcher } from "./api";
import { useMemo } from "react";
import { Category } from "@/types/categories";

export function useGetCategories() {
  const URL = endpoints.categories.all;
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
