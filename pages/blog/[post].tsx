import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';

import { getPostPaths, getPostData } from 'lib/post';
import Head from 'next/head';

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
    fallback: 'blocking',
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
  const { title } = metadata;
  return (
    <div className="prose mx-auto py-10 dark:prose-invert">
      <Head>
        <title>{title}</title>
      </Head>

      <ReactMarkdown rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;
