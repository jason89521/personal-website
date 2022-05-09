import type { AppProps } from 'next/app';

import '../styles/globals.css';
import AppLayout from 'components/Layouts/AppLayout';

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppLayout>
      <Component {...pageProps} />
    </AppLayout>
  );
}
