import type { GetStaticProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';

import { getAllPosts, getPostData } from 'lib/post';
import Markdown from 'components/Markdown';
import PostHeader from 'components/PostHeader';
import { firestore } from 'firebase/server';

type Props = {
  previews: PostPreview[];
};

const Blog = ({ previews }: Props) => {
  return (
    <main className="pb-10">
      <Head>
        <title>Xuan&apos;s blog</title>
      </Head>

      {previews.map(preview => {
        const { metadata, excerpt, views } = preview;
        return (
          <div key={metadata.id} className="mx-auto max-w-xl py-10 xl:py-5">
            <article className="prose mb-5 max-w-none dark:prose-invert">
              <PostHeader title={metadata.title} views={views} />
              <Markdown>{excerpt}</Markdown>
            </article>

            <Link href={`/blog/${metadata.id}`} passHref>
              <a className="font-semibold underline transition-all hover:tracking-widest">Read More</a>
            </Link>
          </div>
        );
      })}
    </main>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps<Props> = async () => {
  const collectionRef = firestore.collection('posts');
  const posts = getAllPosts().reverse();
  const data = posts.map(post => getPostData(post));
  const previews = await Promise.all(
    data.map(async postData => {
      const { metadata, excerpt } = postData;
      const doc = await collectionRef.doc(metadata.id).get();
      const views = doc.exists ? doc.get('views') : 0;
      return {
        metadata,
        excerpt,
        views,
      };
    })
  );

  return {
    props: {
      previews,
    },
  };
};
