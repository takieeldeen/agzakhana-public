import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { endpoints } from "./axios";
import { getFetcher } from "./api";
import { useMemo } from "react";
import { CartList } from "@/types/cart";

export function useGetCartItems(fetch: boolean = true) {
  const URL = endpoints.cart.list;
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getFetcher(URL),
    enabled: fetch,
  });
  const memoizedValue = useMemo(
    () => ({
      cart: (data?.content?.cart as CartList) || [],
      totalItems: data?.results,
      cartLoading: isLoading,
      cartValidating: isFetching,
      cartEmpty: data?.results === 0 && !isLoading,
      error,
      refetch,
    }),
    [data?.content?.cart, data?.results, error, isFetching, isLoading, refetch]
  );

  return memoizedValue;
}

export function useMutateCart() {
  const queryClient = useQueryClient();

  // -------------------------
  // Add to Cart
  // -------------------------
  const addToCart = useMutation({
    mutationFn: async ({
      productId,
      qty,
    }: {
      productId: string;
      qty: number | undefined;
    }) => {
      const URL = endpoints.cart.list;
      return axios.post(URL, { productId, qty });
    },
    onSuccess: (res) => queryClient.setQueryData(["cart"], res?.data),
  });

  // -------------------------
  // Remove From Cart
  // -------------------------
  const removeFromCart = useMutation({
    mutationFn: async (cartItemId: string) => {
      const URL = endpoints.cart.single(cartItemId);
      return await axios.delete(URL);
    },
    onSuccess: (res) => queryClient.setQueryData(["cart"], res?.data),
  });

  // -------------------------
  // Clear Cart
  // -------------------------
  const clearCart = useMutation({
    mutationFn: async () => {
      const URL = endpoints.cart.list;
      return await axios.delete(URL);
    },
    mutationKey: ["cart"],
    onSuccess: (res) => queryClient.setQueryData(["cart"], res?.data),
  });
  return { addToCart, removeFromCart, clearCart };
}
