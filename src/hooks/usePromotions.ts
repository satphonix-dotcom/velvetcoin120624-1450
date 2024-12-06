import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { promotionService } from '../services/promotions';
import { ApiError } from '../utils/api-error';
import type { Cart } from '../types/cart';

export function usePromotions() {
  const queryClient = useQueryClient();

  const { data: promotions, isLoading } = useQuery({
    queryKey: ['promotions'],
    queryFn: promotionService.getActivePromotions,
  });

  const validateMutation = useMutation({
    mutationFn: ({ code, cart }: { code: string; cart: Cart }) =>
      promotionService.validatePromotion(code, cart),
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const createMutation = useMutation({
    mutationFn: promotionService.createPromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      promotionService.updatePromotion(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: promotionService.deletePromotion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['promotions'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  return {
    promotions,
    isLoading,
    validatePromotion: validateMutation.mutateAsync,
    createPromotion: createMutation.mutateAsync,
    updatePromotion: updateMutation.mutateAsync,
    deletePromotion: deleteMutation.mutateAsync,
  };
}