import { useEffect } from 'react';
import useSWR from 'swr';
import createFetcher from 'lib/createFetcher';

export default function usePostViews(id: string, shouldUpdate?: boolean) {
  const config = shouldUpdate ? { method: 'POST' } : undefined;
  const { data, error } = useSWR<{ views: number }>(`/api/post/${id}`, createFetcher(config));

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' || !shouldUpdate) return;
    // createFetcher({ method: 'POST' })(`/api/post/${id}`);
  }, [id, shouldUpdate]);

  return data?.views || 0;
}
