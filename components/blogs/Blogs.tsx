import BlogCard from '@/components/blogs/BlogCard';
import { getBlogsMetadata } from '@/utils/blogs';

function Blogs({ limit }: { limit?: number }) {
  const blogs = getBlogsMetadata('blogs');

  const limitedBlogs = limit ? blogs.slice(0, limit) : blogs;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {limitedBlogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
}

export default Blogs;
