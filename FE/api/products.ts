import { AxiosRequestConfig } from "axios";
import axios, { endpoints } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { getFetcher } from "./api";
import { useMemo } from "react";
import { ManufacturerListItem } from "@/types/medcines";

export async function getAllProducts(
  page: string | undefined,
  limit: string | undefined,
  category: string | undefined
) {
  try {
    const URL: [string, AxiosRequestConfig] = [
      endpoints.products.list,
      {
        params: {
          page: page ?? "1",
          limit: limit ?? "20",
          category,
        },
      },
    ];
    const res = await axios.get(URL[0], URL[1]);
    const { content, results, status } = res?.data;
    return { content, results, status, error: null };
  } catch (err) {
    return { content: [], results: 0, status: "fail", error: err };
  }
}

export function useGetAllManufacturers() {
  const URL = endpoints.products.manufacturers;
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
