import type { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';

import { getPostData, getAllPosts } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';
import { firestore } from 'firebase/server';

type Props = {
  metadata: PostMetadata;
  content: string;
  views: number;
};

type Query = {
  post: string;
};

export default function Post({ metadata, content, views }: Props) {
  const { title, description, id } = metadata;

  useEffect(() => {
    const fetcher = async () => {
      const data = await (await fetch(`/api/post/${id}`, { method: 'POST' })).json();
    };
    fetcher();
  }, [id]);

  return (
    <article className="prose mx-auto max-w-xl pt-10 pb-20 dark:prose-invert">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <PostHeader title={title} views={views} />
      <Markdown>{content}</Markdown>
    </article>
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
  if (!params) return { notFound: true };

  const filename = `${params.post}.md`;
  const filePath = path.resolve('posts', filename);
  if (!fs.existsSync(filePath)) return { notFound: true };

  const post = params.post;
  const { metadata, content } = getPostData(post);
  const docRef = firestore.collection('posts').doc(post);
  const doc = await docRef.get();
  if (!doc.exists) docRef.create({ views: 0 });
  const views = doc.exists ? doc.get('views') : 0;
  return {
    props: {
      metadata,
      content,
      views,
    },
  };
};
