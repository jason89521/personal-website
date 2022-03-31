import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import ReactMarkdown from 'react-markdown';

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
    <div className="prose mx-auto dark:prose-invert py-10">
      <Head>
        <title>{title}</title>
      </Head>

      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default Post;
