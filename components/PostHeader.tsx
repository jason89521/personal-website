import React from 'react';
import Image from 'next/image';

import avatar from 'public/avatar.jpg';

type Props = {
  title: string;
};

const PostHeader = ({ title }: Props) => {
  return (
    <header>
      <h1>{title}</h1>
      <div>
        <span className="flex items-center gap-2 font-semibold">
          <Image src={avatar} alt="avatar" className="rounded-full" width={32} height={32} />
          Xuan
        </span>
      </div>
    </header>
  );
};

export default PostHeader;
