import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios, { endpoints } from "./axios";
import { APIResponse, getFetcher } from "./api";
import { useMemo } from "react";
import { Review } from "@/types/reviews";

export function useGetReviews(prooductId: string) {
  const URL = endpoints.reviews.list(prooductId);
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["reviews", prooductId],
    queryFn: getFetcher<
      APIResponse<{
        comments: Review[];
        overAllRating: number;
        reviewCount: number;
        reviewsFrequency: { [rate: string]: number };
        canReview: boolean;
      }>
    >(URL),
  });
  const memoizedValue = useMemo(
    () => ({
      reviews: data?.content?.comments ?? [],
      overAllRating: data?.content?.overAllRating,
      reviewCount: data?.content?.reviewCount ?? 0,
      reviewsFrequency: data?.content?.reviewsFrequency ?? {},
      canReview: data?.content?.canReview ?? false,
      reviewsLoading: isLoading,
      reviewsError: error,
      reviewsValidating: isFetching,
    }),
    [
      data?.content?.canReview,
      data?.content?.comments,
      data?.content?.overAllRating,
      data?.content?.reviewCount,
      data?.content?.reviewsFrequency,
      error,
      isFetching,
      isLoading,
    ]
  );
  return memoizedValue;
}

export function useMutateReview() {
  const queryClient = useQueryClient();

  // -------------------------
  // Add Review
  // -------------------------
  const createReview = useMutation({
    mutationFn: async ({
      payload,
      productId,
    }: {
      payload: any;
      productId: string;
    }) => {
      const URL = endpoints.reviews.list(productId);
      return await axios.post(URL, payload);
    },
    onSuccess: (res) => {
      queryClient.setQueryData(
        ["reviews", res?.data?.content?.productId],
        res.data
      );
      queryClient.invalidateQueries({
        queryKey: ["reviews", res?.data?.content?.productId],
      });
    },
  });
  // -------------------------
  // Delete Review
  // -------------------------
  const deleteReview = useMutation({
    mutationFn: async ({
      reviewId,
      productId,
    }: {
      reviewId: string;
      productId: string;
    }) => {
      const URL = endpoints.reviews.single(productId, reviewId);
      return await axios.delete(URL);
    },
    onSuccess: (res, { productId }) => {
      queryClient.setQueryData(["reviews", productId], res.data);
      queryClient.invalidateQueries({
        queryKey: ["reviews", productId],
      });
    },
  });
  // -------------------------
  // Edit Review
  // -------------------------
  const editReview = useMutation({
    mutationFn: async ({
      reviewId,
      productId,
      payload,
    }: {
      reviewId: string;
      productId: string;
      payload: any;
    }) => {
      const URL = endpoints.reviews.single(productId, reviewId);
      return await axios.patch(URL, payload);
    },
    onSuccess: (res, { productId }) => {
      queryClient.setQueryData(["reviews", productId], res.data);
      queryClient.invalidateQueries({
        queryKey: ["reviews", productId],
      });
    },
  });
  return { createReview, deleteReview, editReview };
}
