import { useQuery } from "@tanstack/react-query";
import { endpoints } from "./axios";
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
      }>
    >(URL),
  });
  const memoizedValue = useMemo(
    () => ({
      reviews: data?.content?.comments ?? [],
      overAllRating: data?.content?.overAllRating,
      reviewCount: data?.content?.reviewCount ?? 0,
      reviewsFrequency: data?.content?.reviewsFrequency ?? {},
      reviewsLoading: isLoading,
      reviewsError: error,
      reviewsValidating: isFetching,
    }),
    [
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
