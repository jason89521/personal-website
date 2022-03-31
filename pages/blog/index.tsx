import type { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { getPostPreviews } from 'lib/post';

type Props = {
  previews: ReturnType<typeof getPostPreviews>;
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const postPreviews = getPostPreviews();
  return {
    props: {
      previews: postPreviews,
    },
  };
};

const Blog: NextPage<Props> = ({ previews }: Props) => {
  return (
    <ul className="pb-10">
      {previews.map(preview => {
        const { excerpt, id } = preview;
        return (
          <li key={id} className="prose mx-auto border-b py-10 dark:prose-invert">
            <ReactMarkdown
              components={{
                h1: ({ node, children, ...rest }) => {
                  return (
                    <Link href={`/blog/${id}`} passHref>
                      <a>
                        <h1 className="inline-block underline" {...rest}>
                          {children}
                        </h1>
                      </a>
                    </Link>
                  );
                },
              }}
              linkTarget="_blank"
            >
              {excerpt}
            </ReactMarkdown>
          </li>
        );
      })}
    </ul>
  );
};

export default Blog;
