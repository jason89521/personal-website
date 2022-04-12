type PostMetadata = {
  title: string;
  description: string;
};

type PostPreview = {
  metadata: PostMetadata;
  excerpt: string;
  id: string;
  views: number;
};
