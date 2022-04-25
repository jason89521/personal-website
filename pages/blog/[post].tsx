import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getPostData, getAllPosts } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';
import PageLink from 'components/PostPageLink';

type Props = {
  metadata: PostMetadata;
  content: string;
  olderPost: PostMetadata | false;
  newerPost: PostMetadata | false;
};

type Query = {
  post: string;
};

export default function Post({ metadata, content, olderPost, newerPost }: Props) {
  const { title, description, id } = metadata;

  return (
    <main className="mx-auto max-w-post px-5 pt-10 pb-20">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <article className="prose mb-16 max-w-none dark:prose-invert">
        <PostHeader id={id} title={title} shouldUpdateViews />
        <Markdown>{content}</Markdown>
      </article>

      <nav className="flex justify-between gap-10 xl:gap-5">
        <div className="flex-1">{newerPost && <PageLink metadata={newerPost} />}</div>
        <div className="flex-1 text-right">{olderPost && <PageLink metadata={olderPost} isOlder />}</div>
      </nav>
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
  const allPosts = getAllPosts();
  const index = allPosts.indexOf(post);
  const olderPost = index > 0 && getPostData(allPosts[index - 1]).metadata;
  const newerPost = index < allPosts.length - 1 && getPostData(allPosts[index + 1]).metadata;
  return {
    props: {
      metadata,
      content,
      olderPost,
      newerPost,
    },
  };
};
