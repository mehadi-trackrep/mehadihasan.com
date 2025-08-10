'use client';

import { useState, useMemo } from 'react';
import BlogCard from '@/components/blogs/BlogCard';

export default function FilteredBlogs({ blogs }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const allTags = useMemo(() => {
    const tags = new Set();
    blogs.forEach(blog => {
      blog.tags.forEach(tag => tags.add(tag));
    });
    return ['', ...Array.from(tags)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs
      .filter(blog => {
        return (
          blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          blog.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
      })
      .filter(blog => {
        return selectedTag ? blog.tags.includes(selectedTag) : true;
      });
  }, [blogs, searchTerm, selectedTag]);

  return (
    <div>
      <div className="flex justify-center my-8">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400"
        />
        <select
          value={selectedTag}
          onChange={e => setSelectedTag(e.target.value)}
          className="ml-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
        >
          <option value="">All Tags</option>
          {allTags.map(tag => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        {selectedTag && (
          <button
            onClick={() => setSelectedTag('')}
            className="ml-4 px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 transition-colors duration-300"
          >
            Clear
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map(blog => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </div>
  );
}
