import { ViewAllBtn } from '@/components/buttons/ViewAllBtn';
import { getBlogsMetadata } from '@/utils/blogs';
import FilteredBlogs from '@/components/blogs/FilteredBlogs';

function BlogSection() {
  const blogs = getBlogsMetadata('blogs');

  return (
    <section className="backdrop-blur-lg bg-white/30 dark:bg-gray-900/30 rounded-xl pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Latest Blog Posts
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Insights and experiences from my journey in data engineering and software development.
          </p>
        </div>

        {/* All blogs */}
        <FilteredBlogs blogs={blogs} limit={6} />

        {/** <!-- "View All" Button --> */}
        <ViewAllBtn />
      </div>
    </section>
  );
}

export default BlogSection;
