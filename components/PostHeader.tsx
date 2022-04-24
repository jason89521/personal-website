import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import avatar from 'public/avatar.jpg';
import SvgSprite from './SvgSprite';
import usePostViews from 'hooks/usePostViews';

type Props = {
  id: string;
  title: string;
  shouldUpdateViews?: boolean;
  isHeadingLink?: boolean;
};

const PostHeader = ({ id, title, shouldUpdateViews, isHeadingLink }: Props) => {
  const views = usePostViews(id, shouldUpdateViews);

  const headingContent = isHeadingLink ? (
    <Link href={`/blog/${id}`}>
      <a className="text-primary hover:underline">{title}</a>
    </Link>
  ) : (
    title
  );

  return (
    <header>
      <h1 className="not-prose">{headingContent}</h1>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 font-semibold text-primary">
          <Image src={avatar} alt="avatar" className="rounded-full" width={32} height={32} />
          Xuan
        </span>
        <span className="flex items-center gap-2">
          <SvgSprite category="icon" symbolId="eye" className="h-4 w-4 dark:fill-slate-300" />
          {views}
        </span>
      </div>
    </header>
  );
};

export default PostHeader;
