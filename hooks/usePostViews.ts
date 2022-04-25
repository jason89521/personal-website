import { useEffect, useState } from 'react';
import useSWR from 'swr';
import createFetcher from 'lib/createFetcher';

const UPDATE_INTERVAL = 10;
const UPDATE_DURATION = 1500;
const UPDATE_RATIO = UPDATE_INTERVAL / UPDATE_DURATION;

const usePostViews = (id: string, shouldUpdate?: boolean) => {
  const [views, setViews] = useState(0);
  const { data } = useSWR<{ views: number }>(`/api/post/${id}`, createFetcher());

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' || !shouldUpdate) return;
    createFetcher({ method: 'POST' })(`/api/post/${id}`);
  }, [id, shouldUpdate]);

  useEffect(() => {
    if (!data || views === data.views) return;

    setTimeout(() => {
      setViews((oldViews: number) => {
        const nextViews = oldViews + Math.ceil(data.views * UPDATE_RATIO);
        const newViews = nextViews > data.views ? data.views : nextViews;
        return newViews;
      });
    }, UPDATE_INTERVAL);
  }, [views, data]);

  return views;
};

export default usePostViews;
