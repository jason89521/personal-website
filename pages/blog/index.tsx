import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { getAllPosts, getPostData } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';

type Props = {
  previews: PostPreview[];
};

const Blog = ({ previews }: Props) => {
  return (
    <main className="pb-10">
      <Head>
        <title>Xuan&apos;s blog</title>
      </Head>

      {previews.map(preview => {
        const { metadata, excerpt } = preview;
        return (
          <div key={metadata.id} className="mx-auto mb-5 max-w-xl py-10 last:mb-0 xl:py-5">
            <article className="prose mb-5 max-w-none dark:prose-invert">
              <PostHeader id={metadata.id} title={metadata.title} />
              <Markdown>{excerpt}</Markdown>
            </article>

            <Link href={`/blog/${metadata.id}`} passHref>
              <a className="font-semibold text-primary underline transition-all hover:tracking-widest">Read More</a>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const posts = getAllPosts().reverse();
  const previews = posts.map(post => getPostData(post));

  return {
    props: {
      previews,
    },
  };
};
