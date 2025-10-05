import { Order } from "@/types/orders";
import axios, { endpoints } from "./axios";
import { useQuery } from "@tanstack/react-query";
import { APIResponse, getDummyFetcher } from "./api";
import { useMemo } from "react";
import { ORDERS_MOCK_DATA } from "@/_mock/_orders";

export async function getOrderDetails(orderId: string | undefined) {
  try {
    if (!orderId) return { order: null, status: "fail", error: null };
    const URL = endpoints.orders.details(orderId);
    const res = await axios.get(URL);
    const { content, status } = res?.data;
    return { order: content as Order, status, error: null };
  } catch (err) {
    console.log(err);
    return { order: null, status: "fail", error: err };
  }
}

export function useGetMyOrders() {
  const URL = endpoints.orders.myOrders;
  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["orders"],
    queryFn: getDummyFetcher<APIResponse<Partial<Order>[]>>(ORDERS_MOCK_DATA),
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
