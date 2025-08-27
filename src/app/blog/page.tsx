import { getContentByCategory } from '@/lib/content';
import BlogFilter from '@/components/BlogFilter';

export default function BlogPage() {
  const allPosts = getContentByCategory('blog');
  
  // Sort posts by featured status (featured first), then alphabetically
  const sortedPosts = allPosts.sort((a, b) => {
    // Featured posts come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // If both are featured or both are not featured, sort alphabetically
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Hospitality Resources & Insights</h2>
          <p className="mt-2 lead">Expert guides, practical tips, and industry knowledge to help you excel in hospitality management and operations.</p>
        </div>

        <BlogFilter posts={sortedPosts} />
      </div>
    </div>
  )
}