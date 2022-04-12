import React from 'react';

type Props = {
  title: string;
};

const PostHeader = ({ title }: Props) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  );
};

export default PostHeader;
