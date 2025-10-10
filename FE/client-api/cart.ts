import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { endpoints } from "./axios";
import { APIResponse, getFetcher } from "./api";
import { useMemo } from "react";
import { CartList, OrderSummary } from "@/types/cart";

export function useGetCartItems(fetch: boolean = true) {
  const URL = endpoints.cart.list;
  const { data, isLoading, isFetching, error, refetch } = useQuery({
    queryKey: ["cart"],
    queryFn: getFetcher<APIResponse<{ cart: CartList }>>(URL),
    enabled: fetch,
  });
  const memoizedValue = useMemo(
    () => ({
      cart: data?.content?.cart || [],
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
      offerId,
      qty,
    }: {
      productId: string | undefined;
      offerId: string | undefined;
      qty: number | undefined;
    }) => {
      const URL = endpoints.cart.list;
      return axios.post(URL, { productId, offerId, qty });
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
    onSuccess: (res) => {
      queryClient.setQueryData(["cart"], res?.data);
      queryClient.setQueryData(["cart-details"], (oldData: any) => {
        const modifiedData = JSON.parse(JSON.stringify(oldData));
        modifiedData.content.cart = res?.data?.content?.cart;
        return modifiedData;
      });
    },
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
  // -------------------------
  // Update Cart Item
  // -------------------------
  const updateCartItem = useMutation({
    mutationFn: async ({
      cartItemId,
      payload,
    }: {
      cartItemId: string;
      payload: any;
    }) => {
      const URL = endpoints.cart.single(cartItemId);
      return await axios.patch(URL, { cartItemId, ...payload });
    },
    onSuccess: (res) => queryClient.setQueryData(["cart"], res?.data),
  });
  return { addToCart, removeFromCart, clearCart, updateCartItem };
}

export function useGetCartDetails() {
  const URL = endpoints.cart.details;
  const { data, isFetching, isLoading, error, refetch } = useQuery({
    queryKey: ["cart-details"],
    queryFn:
      getFetcher<APIResponse<{ cart: CartList; orderSummary: OrderSummary }>>(
        URL
      ),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  const memoizedValue = useMemo(
    () => ({
      cart: data?.content?.cart || [],
      orderSummary: data?.content?.orderSummary,
      cartLoading: isLoading,
      cartValidating: isFetching,
      cartError: error,
      cartEmpty: data?.content?.cart?.length === 0,
      mutate: refetch,
    }),
    [data, error, isFetching, isLoading, refetch]
  );
  return memoizedValue;
}

export async function checkout() {
  const URL = endpoints.cart.checkout;
  const res = await axios.post(URL);
  window.location.href = res?.data?.url;
}
