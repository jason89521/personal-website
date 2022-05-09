import React from 'react';
import Link from 'next/link';

type Props = {
  previews: PostPreview[];
  children: React.ReactNode;
};

const BlogLayout = ({ previews, children }: Props) => {
  return (
    <div className="mx-auto flex max-w-6xl gap-20 py-10 px-10 2xl:gap-10 xl:gap-5 xl:px-5 md:block">
      <nav className="sticky top-[6.5rem] shrink-0 basis-60 self-start xl:basis-40 md:hidden">
        <div className="mb-6 text-xl font-semibold">最近的貼文</div>
        <ul>
          {previews.map(preview => {
            const { id, title } = preview.metadata;
            return (
              <li key={id} className="mb-4 last:mb-0">
                <Link href={`/blog/${id}`}>
                  <a className="text-sm font-semibold decoration-2 hover:text-primary hover:underline">{title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <main className="pb-10 md:mx-auto">{children}</main>
    </div>
  );
};

export default BlogLayout;
