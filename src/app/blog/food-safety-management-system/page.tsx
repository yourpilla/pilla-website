import { getBlogsByCategory } from '@/lib/content';
import Link from 'next/link';

const categorySlug = 'food-safety-management-system';
const posts = getBlogsByCategory(categorySlug);

export default function FoodSafetyManagementSystemPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="h1">Food Safety Management System</h1>
          <p className="mt-2 big-blue">HACCP implementation, food safety protocols, and management systems to ensure compliance and protect your guests and business.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="flex max-w-xl flex-col items-start justify-between relative white-card p-6 group hover:shadow-sm transition-shadow">
              {post.featured && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="small-blue green-card px-2 py-1">Featured</span>
                </div>
              )}
              <div className="mt-6"></div>
              <div className="relative grow">
                <h3 className="mt-3 h4 group-hover:text-gray-600">
                  {post.title}
                </h3>
                <p className="mt-5 line-clamp-3 small-blue">{post.meta || post.content.slice(0, 160)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}