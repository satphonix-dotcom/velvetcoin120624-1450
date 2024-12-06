import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { designerService } from '../services/designers';
import { ApiError } from '../utils/api-error';
import type { Designer } from '../types/designer';

export function useDesigners() {
  const queryClient = useQueryClient();

  const { data: designers, isLoading } = useQuery({
    queryKey: ['designers'],
    queryFn: designerService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: designerService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designers'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Designer> }) =>
      designerService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designers'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: designerService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['designers'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  return {
    designers,
    isLoading,
    createDesigner: createMutation.mutateAsync,
    updateDesigner: updateMutation.mutateAsync,
    deleteDesigner: deleteMutation.mutateAsync,
  };
}

export function useDesigner(id: string) {
  return useQuery({
    queryKey: ['designers', id],
    queryFn: () => designerService.getById(id),
    enabled: Boolean(id),
  });
}