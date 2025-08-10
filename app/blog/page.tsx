import { getBlogsMetadata } from '@/utils/blogs';
import React from 'react';

// components
import FilteredBlogs from '@/components/blogs/FilteredBlogs';

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
  const blogs = getBlogsMetadata('blogs');

  return (
    <article className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center my-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span>My Blog</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Here you can find all my blog posts. Use the search and filter options to find what you are looking for.
        </p>
      </div>
      <FilteredBlogs blogs={blogs} />
    </article>
  );
}
