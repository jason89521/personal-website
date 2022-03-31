import fs from 'fs';
import path from 'path';
import process from 'process';
import matter from 'gray-matter';

const postsPath = path.join(process.cwd(), 'posts');

const getPostPaths = () => {
  const posts = fs.readdirSync(postsPath);
  const paths = posts.map(post => {
    return {
      params: {
        post,
      },
    };
  });

  return paths;
};

const getPostData = (post: string): { metadata: PostMetadata; content: string } => {
  const filePath = path.join(postsPath, `${post}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  return { metadata: data as PostMetadata, content };
};

export { getPostPaths, getPostData };
