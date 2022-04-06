import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

import { getPostPaths, getPostData } from 'lib/post';
import Markdown from 'components/Markdown';

type Props = {
  metadata: PostMetadata;
  content: string;
};

type Query = {
  post: string;
};

export default function Post({ metadata, content }: Props) {
  const { title, description } = metadata;
  return (
    <div className="prose mx-auto max-w-xl pt-10 pb-20 dark:prose-invert">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <Markdown>{content}</Markdown>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const paths = getPostPaths();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({ params }) => {
  if (!params) return { notFound: true };
  
  const filename = `${params.post}.md`;
  const filePath = path.resolve('posts', filename);
  if (!fs.existsSync(filePath)) return { notFound: true };

  const post = params.post;
  const { metadata, content } = getPostData(post);
  return {
    props: {
      metadata,
      content,
    },
  };
};
