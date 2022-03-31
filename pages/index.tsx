import type { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';

const Home: NextPage = () => {
  return (
    <div className="mx-auto h-screen max-w-7xl">
      <Head>
        <title>Xuan&apos;s website</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className="flex gap-4 py-4 text-2xl font-bold uppercase">
        <Link href="/">
          <a>xuan</a>
        </Link>

        <Link href="/blog">
          <a>blog</a>
        </Link>
      </nav>
    </div>
  );
};

export default Home;