import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { getPostPaths, getPostData } from 'lib/post';
import Markdown from 'components/Markdown';

type Props = {
  metadata: PostMetadata;
  content: string;
};

type Query = {
  post: string;
};

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const paths = getPostPaths();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  if (!params) return { notFound: true };

  const post = params.post;
  const { metadata, content } = getPostData(post);
  return {
    props: {
      metadata,
      content,
    },
  };
};

const Post: NextPage<Props> = ({ metadata, content }) => {
  const { title, description } = metadata;
  return (
    <div className="prose mx-auto pt-10 pb-20 dark:prose-invert">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Markdown>{content}</Markdown>
    </div>
  );
};

export default Post;
