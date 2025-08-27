'use client';

import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';
import { useState } from 'react';

const blogCategories = [
  { name: 'All', url: '/blog' },
  { name: 'Job Descriptions', url: '/blog/hospitality-job-role' },
  { name: 'Job Interviews', url: '/blog/interviews' },
  { name: 'Onboarding', url: '/blog/restaurant-staff-onboarding' },
  { name: 'Food Hygiene', url: '/blog/food-safety-management-system' },
  { name: 'Health and Safety', url: '/blog/hospitality-risks' },
  { name: 'Operations', url: '/blog/operations' }
];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const allPosts = getContentByCategory('blog');
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? allPosts 
    : allPosts.filter(post => post.frontmatter['secondary tag'] === selectedCategory);
  
  // Sort posts by featured status (featured first), then alphabetically
  const posts = filteredPosts.sort((a, b) => {
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

        {/* Category Pills */}
        <div className="mx-auto mt-10 max-w-2xl lg:mx-0">
          <div className="flex flex-wrap gap-3">
            {blogCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
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