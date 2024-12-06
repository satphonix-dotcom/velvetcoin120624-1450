import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { wishlistService } from '../services/wishlist';
import { ApiError } from '../utils/api-error';
import type { WishlistPreferences } from '../types/wishlist';

export function useWishlist() {
  const queryClient = useQueryClient();

  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['wishlist'],
    queryFn: wishlistService.getWishlist,
  });

  const addMutation = useMutation({
    mutationFn: ({ productId, preferences }: { 
      productId: string; 
      preferences?: WishlistPreferences 
    }) => wishlistService.addToWishlist(productId, preferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const removeMutation = useMutation({
    mutationFn: wishlistService.removeFromWishlist,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ productId, preferences }: {
      productId: string;
      preferences: WishlistPreferences;
    }) => wishlistService.updatePreferences(productId, preferences),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  return {
    wishlist,
    isLoading,
    addToWishlist: addMutation.mutateAsync,
    removeFromWishlist: removeMutation.mutateAsync,
    updatePreferences: updateMutation.mutateAsync,
  };
}