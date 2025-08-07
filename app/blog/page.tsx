import { getBlogsMetadata } from '@/utils/blogs';
import React from 'react';

// components
import BlogSection from '@/components/sections/BlogSection';

export const generateStaticParams = async () => {
  const blogs = getBlogsMetadata('blogs');
  return blogs.map((blog) => ({ slug: blog.slug }));
};

export async function generateMetadata({ params }: any) {
  return {
    title: `Mehadi's Blogs | Expert Thoughts on Data Eng., Elasticsearch & AI`,
  };
}

export default function BlogPage() {
  return (
    <article className="mx-auto max-w-7xl">
      <BlogSection />
    </article>
  );
}
