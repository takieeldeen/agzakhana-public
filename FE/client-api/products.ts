import { AxiosRequestConfig } from "axios";
import axios, { endpoints } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponse, getFetcher } from "./api";
import { useMemo } from "react";
import { ManufacturerListItem, Medicine } from "@/types/medcines";

export async function getAllProducts(
  page: string | undefined,
  limit: string | undefined,
  category: string | undefined,
  manufacturer: string | undefined
) {
  try {
    const URL: [string, AxiosRequestConfig] = [
      endpoints.products.list,
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
      error: err,
    };
  }
}

export async function getProductDetails(productId: string | undefined) {
  try {
    if (!productId) return { product: null, status: "fail", error: null };
    const URL = endpoints.products.details(productId);
    const res = await axios.get(URL);
    const { content, status } = res?.data;
    return { product: content as Medicine, status, error: null };
  } catch (err) {
    return { product: null, status: "fail", error: err };
  }
}

export function useGetAllManufacturers() {
  const URL = endpoints.products.manufacturers;
  const { data, refetch, isLoading, error } = useQuery({
    queryKey: ["filters", "manufacturer"],
    queryFn: getFetcher<APIResponse<ManufacturerListItem[]>>(URL),
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

export async function getSimilarProducts(productId: string) {
  try {
    if (!productId)
      return { products: [], status: "fail", error: null, results: 0 };
    const URL = endpoints.products.similarProducts(productId);
    const res = await axios.get(URL);
    const { content, status, results } = res?.data;
    return { products: content as Medicine[], status, error: null, results };
  } catch (err) {
    return { products: [], status: "fail", error: err, results: 0 };
  }
}

export async function getPopularProducts() {
  try {
    const URL = endpoints.products.popularProducts;
    const res = await axios.get(URL);
    const { content, results, status } = res?.data;
    return { content, results, status, error: null };
  } catch (err: any) {
    return {
      content: [],
      results: 0,
      status: "fail",
      error: err,
    };
  }
}

export async function getProductHighlights() {
  try {
    const URL = endpoints.products.highlights;
    const res = await axios.get(URL);
    const { content, results, status } = res?.data;
    return { content, results, status, error: null };
  } catch (err: any) {
    return {
      content: [],
      results: 0,
      status: "fail",
      error: err,
    };
  }
}
