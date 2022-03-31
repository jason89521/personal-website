import type { GetStaticProps, NextPage } from 'next';
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
    <div>
      <ul>
        {previews.map(preview => {
          const { metadata, excerpt, id } = preview;
          return (
            <li key={id} className="prose mx-auto mt-16 dark:prose-invert">
              <ReactMarkdown linkTarget="_blank">{excerpt}</ReactMarkdown>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Blog;
