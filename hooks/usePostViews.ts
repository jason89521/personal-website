import { useEffect, useState } from 'react';
import useSWR from 'swr';
import createFetcher from 'lib/createFetcher';

const UPDATE_INTERVAL = 10;
const UPDATE_DURATION = 1500;
const UPDATE_RATIO = UPDATE_INTERVAL / UPDATE_DURATION;

const progressToTotal = (total: number) => {
  return (oldValue: number) => {
    const nextValue = oldValue + Math.ceil(total * UPDATE_RATIO);
    const newValue = nextValue > total ? total : nextValue;
    return newValue;
  };
};

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
      setViews(progressToTotal(data.views));
    }, UPDATE_INTERVAL);
  }, [views, data]);

  return views;
};

export default usePostViews;
