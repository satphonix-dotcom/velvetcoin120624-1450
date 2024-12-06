import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { authService } from '../services/auth';
import type { SignUpData, SignInData } from '../types/auth';
import { ApiError } from '../utils/api-error';

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const signUpMutation = useMutation({
    mutationFn: (data: SignUpData) => authService.register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const signInMutation = useMutation({
    mutationFn: (data: SignInData) => authService.login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const updateProfileMutation = useMutation({
    mutationFn: authService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error: any) => {
      throw ApiError.fromResponse(error);
    },
  });

  const signOut = () => {
    authService.logout();
    queryClient.clear();
  };

  return {
    user,
    isLoading,
    signUp: signUpMutation.mutateAsync,
    signIn: signInMutation.mutateAsync,
    signOut,
    updateProfile: updateProfileMutation.mutateAsync,
    isAuthenticated: Boolean(user),
  };
}