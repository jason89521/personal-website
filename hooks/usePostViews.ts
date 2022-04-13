import useSWR from 'swr';
import createFetcher from 'lib/createFetcher';

export default function usePostViews(id: string, shouldUpdate?: boolean) {
  const config = process.env.NODE_ENV === 'production' && shouldUpdate ? { method: 'POST' } : undefined;
  const { data, error } = useSWR<{ views: number }>(`/api/post/${id}`, createFetcher(config));

  return data?.views || 0;
}
