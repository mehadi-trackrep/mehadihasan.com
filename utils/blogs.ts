import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export const getBlogsMetadata = (basePath: string) => {
  const getPosts = (dir: string): string[] => {
    const files = fs.readdirSync(dir);
    let posts: string[] = [];

    files.forEach((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && file !== 'not_final') {
        posts = posts.concat(getPosts(fullPath));
      } else if (file.endsWith('.md')) {
        posts.push(fullPath);
      }
    });

    return posts;
  };

  const files = getPosts(basePath);

  const posts = files.map((filename) => {
    const fileContents = fs.readFileSync(filename, 'utf8');
    const matterResult = matter(fileContents);
    const slug = filename.replace('.md', '').replace(basePath + '/', '');

    return {
      tags: matterResult.data.categories,
      date: matterResult.data.date,
      description: matterResult.data.description,
      cover_image: matterResult.data.cover_image,
      slug: slug,
      title: matterResult.data.title,
      readingTime: getReadingTime(matterResult.content),
    };
  });

  return posts.sort((a, b) => {
    return new Date(a.date) > new Date(b.date) ? -1 : 1;
  });
};

export const getBlogContent = (slug: string) => {
  const file = `blogs/${slug}.md`;
  const content = fs.readFileSync(file, 'utf8');

  const matterResult = matter(content);
  return matterResult;
};

export function getReadingTime(content: string) {
  const WORDS_PER_MINUTE = 225;
  const CODE_WORD_WEIGHT = 0.8; // Code blocks are read slower
  const IMAGE_VIEWING_TIME = 12; // Seconds per image

  // Extract code blocks
  const codeBlocks = content.match(/```[\s\S]*?```/g) || [];
  const codeWords = codeBlocks.join(' ').split(/\s+/).length;

  // Remove code blocks from content
  const textContent = content.replace(/```[\s\S]*?```/g, '');

  // Count images
  const imageCount = (content.match(/!$.*?$.*?$/g) || []).length;

  // Count regular words
  const words = textContent.trim().split(/\s+/).length;

  // Calculate total reading time
  const readingTime = Math.ceil(
    words / WORDS_PER_MINUTE +
      (codeWords * CODE_WORD_WEIGHT) / WORDS_PER_MINUTE +
      (imageCount * IMAGE_VIEWING_TIME) / 60
  );

  return readingTime;
}


