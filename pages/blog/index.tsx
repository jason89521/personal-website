import type { GetStaticProps } from 'next';
import Link from 'next/link';

import { getPostPreviews } from 'lib/post';
import Markdown from 'components/Markdown';
import Head from 'next/head';

type Props = {
  previews: ReturnType<typeof getPostPreviews>;
};

export default function Blog({ previews }: Props) {
  return (
    <ul className="pb-10">
      <Head>
        <title>Xuan&apos;s blog</title>
      </Head>

      {previews.map(preview => {
        const { excerpt, id } = preview;
        return (
          <li key={id} className="mx-auto mb-10 max-w-xl">
            <Markdown
              className="prose max-w-none py-10 dark:prose-invert xl:py-5"
              components={{
                h1: ({ node, children, ...rest }) => {
                  return (
                    <h1 {...rest}>
                      <Link href={`/blog/${id}`} passHref>
                        <a className="font-extrabold no-underline hover:underline">{children}</a>
                      </Link>
                    </h1>
                  );
                },
              }}
            >
              {excerpt}
            </Markdown>

            <Link href={`/blog/${id}`} passHref>
              <a className="text-xl font-semibold underline transition-all hover:tracking-widest xl:text-lg">
                Read More
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export const getStaticProps: GetStaticProps<Props> = () => {
  const postPreviews = getPostPreviews();
  return {
    props: {
      previews: postPreviews,
    },
  };
};
