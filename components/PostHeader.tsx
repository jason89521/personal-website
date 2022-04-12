import React from 'react';
import Image from 'next/image';

import avatar from 'public/avatar.jpg';
import SvgSprite from './SvgSprite';
import usePostViews from 'hooks/usePostViews';

type Props = {
  id: string;
  title: string;
  shouldUpdateViews?: boolean;
};

const PostHeader = ({ id, title, shouldUpdateViews }: Props) => {
  const views = usePostViews(id, shouldUpdateViews);

  return (
    <header>
      <h1>{title}</h1>
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-2 font-semibold">
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
