import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { getPostPreviews } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';

type Props = {
  previews: ReturnType<typeof getPostPreviews>;
};

const Blog = ({ previews }: Props) => {
  return (
    <main className="pb-10">
      <Head>
        <title>Xuan&apos;s blog</title>
      </Head>

      {previews.map(preview => {
        const { metadata, excerpt, id } = preview;
        return (
          <div key={id} className="mx-auto max-w-xl py-10 xl:py-5">
            <article className="prose mb-5 max-w-none dark:prose-invert">
              <PostHeader title={metadata.title}></PostHeader>
              <Markdown>{excerpt}</Markdown>
            </article>

            <Link href={`/blog/${id}`} passHref>
              <a className="font-semibold underline transition-all hover:tracking-widest">Read More</a>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps<Props> = () => {
  const postPreviews = getPostPreviews();
  return {
    props: {
      previews: postPreviews,
    },
  };
};
