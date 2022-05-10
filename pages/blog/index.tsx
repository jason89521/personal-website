import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { getAllPosts, getPostData } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';
import BlogLayout from 'components/Layouts/BlogLayout';

type Props = {
  previews: PostPreview[];
};

const Blog = ({ previews }: Props) => {
  return (
    <BlogLayout previews={previews}>
      <Head>
        <title>Xuan&apos;s blog</title>
        <meta name="description" content="Xuan 的部落格文章，不定期更新" />
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
    </BlogLayout>
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
