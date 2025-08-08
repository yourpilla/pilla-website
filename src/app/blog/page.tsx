import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';

const categories = [
  { key: 'job-description', title: 'Job Descriptions', description: 'Templates and guides for creating effective job descriptions' },
  { key: 'job-interviews', title: 'Job Interviews', description: 'Interview techniques and best practices for hiring' },
  { key: 'onboarding-new-starters', title: 'Onboarding New Starters', description: 'Complete guides for welcoming new team members' },
  { key: 'food-safety', title: 'Food Safety', description: 'HACCP guides and food safety management systems' },
  { key: 'health-and-safety', title: 'Health and Safety', description: 'Workplace safety protocols and risk assessments' },
  { key: 'operations', title: 'Operations', description: 'Operational excellence and management strategies' },
];

export default function BlogIndex() {
  const allPosts = getContentByCategory('blog');

  // Group posts by category (we'll need to add category field to posts)
  const getPostsByCategory = (categoryKey: string) => {
    return allPosts.filter(post => {
      // For now, we'll use simple keyword matching in title or meta
      const searchText = `${post.title} ${post.meta || ''}`.toLowerCase();
      const keywords = getCategoryKeywords(categoryKey);
      return keywords.some(keyword => searchText.includes(keyword));
    }).slice(0, 3); // Limit to 3 posts per category
  };

  const getCategoryKeywords = (categoryKey: string) => {
    const keywordMap = {
      'job-description': ['job description', 'hiring', 'recruitment'],
      'job-interviews': ['interview', 'hiring', 'recruitment'],
      'onboarding-new-starters': ['onboarding', 'new starter', 'training'],
      'food-safety': ['food safety', 'haccp', 'fsms'],
      'health-and-safety': ['health', 'safety', 'workplace'],
      'operations': ['operations', 'management', 'kpi', 'restaurant']
    };
    return keywordMap[categoryKey as keyof typeof keywordMap] || [];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section - matching glossary style */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Hospitality Blog
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Industry insights, safety guides, and management tips to help you run a successful hospitality business
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Category Sections */}
        {categories.map((category) => {
          const categoryPosts = getPostsByCategory(category.key);
          
          if (categoryPosts.length === 0) return null;
          
          return (
            <section key={category.key} className="mb-16">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h2>
                <p className="text-lg text-gray-600">
                  {category.description}
                </p>
              </div>
              
              <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
                {categoryPosts.map((post) => (
                  <article key={post.slug} className="flex max-w-xl flex-col items-start justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center gap-x-4 text-xs mb-4">
                      <span className="relative z-10 rounded-full bg-blue-50 px-3 py-1.5 font-medium text-blue-600">
                        {category.title}
                      </span>
                    </div>
                    <div className="group relative grow">
                      <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                        <Link href={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </Link>
                      </h3>
                      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                        {post.meta || post.content.slice(0, 160)}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                      <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
                        </svg>
                      </div>
                      <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                          <span className="absolute inset-0" />
                          Pilla Team
                        </p>
                        <p className="text-gray-600">Hospitality Experts</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {/* All Posts Section */}
        <section className="mt-20 pt-16 border-t border-gray-200">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              All Blog Posts
            </h2>
            <p className="text-lg text-gray-600">
              Browse our complete collection of hospitality resources
            </p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3 md:grid-cols-2">
            {allPosts.map((post) => (
              <article key={post.slug} className="flex max-w-xl flex-col items-start justify-between bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                <div className="group relative grow">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <Link href={`/blog/${post.slug}`}>
                      <span className="absolute inset-0" />
                      {post.title}
                    </Link>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.meta || post.content.slice(0, 160)}
                  </p>
                </div>
                <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                  <div className="size-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
                    </svg>
                  </div>
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      <span className="absolute inset-0" />
                      Pilla Team
                    </p>
                    <p className="text-gray-600">Hospitality Experts</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}