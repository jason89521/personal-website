import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPostData, getAllPosts } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';
import usePostViews from 'hooks/usePostViews';

type Props = {
  metadata: PostMetadata;
  content: string;
};

type Query = {
  post: string;
};

export default function Post({ metadata, content }: Props) {
  const { title, description, id } = metadata;

  return (
    <main className="px-5">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <article className="prose mx-auto max-w-post pt-10 pb-20 dark:prose-invert">
        <PostHeader id={id} title={title} shouldUpdateViews />
        <Markdown>{content}</Markdown>
      </article>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const posts = getAllPosts();
  const paths = posts.map(post => ({ params: { post } }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  const post = params!.post;
  const { metadata, content } = getPostData(post);
  return {
    props: {
      metadata,
      content,
    },
  };
};
