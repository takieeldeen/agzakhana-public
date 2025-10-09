import { Order } from "@/types/orders";
import axios, { endpoints } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponse, getFetcher } from "./api";
import { useMemo } from "react";

export async function getOrderDetails(orderId: string | undefined) {
  try {
    if (!orderId) return { order: null, status: "fail", error: null };
    const URL = endpoints.orders.details(orderId);
    const res = await axios.get(URL);
    const { content, status } = res?.data;
    return { order: content as Order, status, error: null };
  } catch (err) {
    return { order: null, status: "fail", error: err };
  }
}

export function useGetMyOrders() {
  const URL = endpoints.orders.myOrders;
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getFetcher<APIResponse<Partial<Order>[]>>(URL),
  });
  const memoizedValues = useMemo(
    () => ({
      orders: data?.content ?? [],
      ordersLoading: isLoading,
      ordersResults: data?.results ?? 0,
      ordersError: error,
      ordersValidating: isFetching,
      mutate: refetch,
    }),
    [data?.content, data?.results, error, isFetching, isLoading, refetch]
  );
  return memoizedValues;
}
