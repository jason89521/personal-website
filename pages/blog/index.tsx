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
    <div className="mx-auto flex max-w-6xl gap-20 py-10 px-10 2xl:gap-10 xl:gap-5 xl:px-5 md:block">
      <nav className="sticky top-[6.5rem] shrink-0 basis-60 self-start xl:basis-40 md:hidden">
        {previews.map(preview => {
          const { id, title } = preview.metadata;
          return (
            <div key={id} className="mb-4 last:mb-0">
              <Link href={`/blog/${id}`}>
                <a className="font-semibold decoration-2 hover:text-primary hover:underline">{title}</a>
              </Link>
            </div>
          );
        })}
      </nav>

      <main className="pb-10 md:mx-auto">
        <Head>
          <title>Xuan&apos;s blog</title>
        </Head>

        {previews.map(preview => {
          const { metadata, excerpt } = preview;
          return (
            <div key={metadata.id} className="mb-20 last:mb-0">
              <article className="prose mb-8 dark:prose-invert">
                <PostHeader id={metadata.id} title={metadata.title} isHeadingLink />
                <Markdown>{excerpt}</Markdown>
              </article>

              <Link href={`/blog/${metadata.id}`} passHref>
                <a className="text-lg font-bold text-primary transition hover:underline">Read More</a>
              </Link>
            </div>
          );
        })}
      </main>
    </div>
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
