import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsPath = path.resolve('posts');

/**
 * Return all posts filename without extension
 */
const getAllPosts = () => {
  const files = fs.readdirSync(postsPath);
  const posts = files.map(file => file.slice(0, -3));
  return posts;
};

/**
 * Get the data of `{post}.md`
 */
function getPostData(post: string) {
  const filePath = path.join(postsPath, `${post}.md`);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, excerpt, content } = matter(fileContent, { excerpt_separator: '<!-- more -->' });
  return { metadata: data as PostMetadata, excerpt: excerpt!, content };
}

export { getAllPosts, getPostData };
