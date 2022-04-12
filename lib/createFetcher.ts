export default function createFetcher<T>(config?: RequestInit) {
  return async function fetcher(url: string): Promise<T> {
    const req = await fetch(url, config);
    const data = await req.json();
    return data;
  };
}
