import { useInfiniteQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { reviewService } from '../services/reviews';
import { ApiError } from '../utils/api-error';
import type { CreateReviewData } from '../types/review';

export function useReviews(productId: string) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: ['reviews', productId],
    queryFn: ({ pageParam = 1 }) => 
      reviewService.getProductReviews(productId, { page: pageParam }),
    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.pages) {
        return lastPage.pagination.page + 1;
      }
      return undefined;
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateReviewData) => 
      reviewService.createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const helpfulMutation = useMutation({
    mutationFn: reviewService.markHelpful,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const reportMutation = useMutation({
    mutationFn: reviewService.reportReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reviews', productId] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const reviews = data?.pages.flatMap(page => page.reviews) ?? [];

  return {
    reviews,
    isLoading,
    error: error ? (error as Error).message : undefined,
    createReview: createMutation.mutateAsync,
    markHelpful: helpfulMutation.mutateAsync,
    reportReview: reportMutation.mutateAsync,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}