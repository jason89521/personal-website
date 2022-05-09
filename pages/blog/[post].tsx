import type { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';

import { getPostData, getAllPosts } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';
import PageLink from 'components/PostPageLink';
import BlogLayout from 'components/Layouts/BlogLayout';

type Props = {
  metadata: PostMetadata;
  content: string;
  olderPost: PostMetadata | false;
  newerPost: PostMetadata | false;
  previews: PostPreview[];
};

type Query = {
  post: string;
};

export default function Post({ metadata, content, olderPost, newerPost, previews }: Props) {
  const { title, description, id } = metadata;

  return (
    <BlogLayout previews={previews}>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <article className="prose mb-16 dark:prose-invert">
        <PostHeader id={id} title={title} shouldUpdateViews />
        <Markdown>{content}</Markdown>
      </article>

      <nav className="flex justify-between gap-10 xl:gap-5">
        <div className="flex-1">{newerPost && <PageLink metadata={newerPost} />}</div>
        <div className="flex-1 text-right">{olderPost && <PageLink metadata={olderPost} isOlder />}</div>
      </nav>
    </BlogLayout>
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
  const postNames = getAllPosts().reverse();
  const posts = postNames.map(post => getPostData(post));

  const post = params!.post;
  const idx = posts.findIndex(data => data.metadata.id === post);
  const { metadata, content } = posts[idx];
  const olderPost = idx < postNames.length - 1 && posts[idx + 1].metadata;
  const newerPost = idx > 0 && posts[idx - 1].metadata;
  return {
    props: {
      metadata,
      content,
      olderPost,
      newerPost,
      previews: posts,
    },
  };
};
