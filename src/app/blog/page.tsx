import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';

export default function BlogPage() {
  const allPosts = getContentByCategory('blog');
  
  // Sort posts by featured status (featured first), then alphabetically
  const posts = allPosts.sort((a, b) => {
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
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex max-w-xl flex-col items-start justify-between relative white-card p-6 rounded-lg">
              {'featured' in post && post.featured === true && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="small-blue green-card px-2 py-1">Featured</span>
                </div>
              )}
              <div className="mt-6"></div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link href={`/blog/${post.slug}`}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{post.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}