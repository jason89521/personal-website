import Link from 'next/link';

type Props = {
  metadata: PostMetadata;
  isOlder?: boolean;
};

const PostPageLink = ({ metadata, isOlder }: Props) => {
  return (
    <Link href={`/blog/${metadata.id}`}>
      <a className="block h-full rounded-md border px-4 py-2 hover:border-primary">
        <div className="mb-2 text-sm font-medium capitalize">{isOlder ? 'older' : 'newer'} post</div>
        <div className="font-bold text-primary">{metadata.title}</div>
      </a>
    </Link>
  );
};

export default PostPageLink;
