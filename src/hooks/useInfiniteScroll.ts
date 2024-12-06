import { useEffect, useCallback, RefObject } from 'react';

interface UseInfiniteScrollOptions {
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  threshold?: number;
}

export function useInfiniteScroll(
  ref: RefObject<HTMLElement>,
  options: UseInfiniteScrollOptions
) {
  const { loading, hasMore, onLoadMore, threshold = 100 } = options;

  const handleScroll = useCallback(() => {
    if (!ref.current || loading || !hasMore) return;

    const element = ref.current;
    const { scrollTop, scrollHeight, clientHeight } = element;
    
    if (scrollHeight - scrollTop - clientHeight < threshold) {
      onLoadMore();
    }
  }, [ref, loading, hasMore, onLoadMore, threshold]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, [ref, handleScroll]);
}