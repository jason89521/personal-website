type PostMetadata = {
  id: string;
  title: string;
  description: string;
};

type PostPreview = {
  metadata: PostMetadata;
  excerpt: string;
};
