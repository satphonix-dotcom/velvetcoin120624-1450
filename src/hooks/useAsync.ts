import { useState, useCallback } from 'react';
import { handleError } from '../utils/error-handler';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions<T> = {}
) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await asyncFunction(...args);
        setData(result);
        options.onSuccess?.(result);
        return result;
      } catch (err) {
        const errorMessage = handleError(err);
        setError(errorMessage);
        options.onError?.(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [asyncFunction, options]
  );

  return {
    isLoading,
    error,
    data,
    execute,
    reset: useCallback(() => {
      setData(null);
      setError(null);
      setIsLoading(false);
    }, []),
  };
}