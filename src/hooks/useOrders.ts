import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '../services/orders';
import { ApiError } from '../utils/api-error';
import type { Order } from '../types/order';

export function useOrders() {
  const queryClient = useQueryClient();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: orderService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: orderService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: Order['status'] }) =>
      orderService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  return {
    orders,
    isLoading,
    createOrder: createMutation.mutateAsync,
    updateOrderStatus: updateStatusMutation.mutateAsync,
  };
}

export function useOrder(id: string) {
  return useQuery({
    queryKey: ['orders', id],
    queryFn: () => orderService.getById(id),
    enabled: Boolean(id),
  });
}

export function useMyOrders() {
  return useQuery({
    queryKey: ['myOrders'],
    queryFn: orderService.getMyOrders,
  });
}