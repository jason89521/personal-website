import fs from 'fs';
import path from 'path';
import process from 'process';
import matter from 'gray-matter';

const postsPath = path.join(process.cwd(), 'posts');

/**
 * Return query parameters, should be used with `getStaticPaths`
 */
const getPostPaths = () => {
  const posts = fs.readdirSync(postsPath);
  const paths = posts.map(post => {
    return {
      params: {
        post: post.slice(0, -3),
      },
    };
  });

  return paths;
};

/**
 * Get the data of `{post}.md`
 */
const getPostData = (post: string): { metadata: PostMetadata; excerpt: string; content: string } => {
  const filePath = path.join(postsPath, `${post}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, excerpt, content } = matter(fileContent, { excerpt_separator: '<!-- more -->' });
  return { metadata: data as PostMetadata, excerpt: excerpt as string, content };
};

/**
 * Get all posts' metadata and excerpt. Use post's filename (eliminate .md) to be an id.
 */
const getPostPreviews = () => {
  const files = fs.readdirSync(postsPath).reverse();
  const previews = files.map(file => {
    const post = file.slice(0, -3);
    const { metadata, excerpt } = getPostData(post);
    return { metadata, excerpt, id: post };
  });

  return previews;
};

export { getPostPaths, getPostData, getPostPreviews };
