'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ContentItem } from '@/lib/content';

const blogCategories = [
  { name: 'All', url: '/blog' },
  { name: 'Job Descriptions', url: '/blog/hospitality-job-role' },
  { name: 'Job Interviews', url: '/blog/interviews' },
  { name: 'Onboarding', url: '/blog/restaurant-staff-onboarding' },
  { name: 'Food Hygiene', url: '/blog/food-safety-management-system' },
  { name: 'Health and Safety', url: '/blog/hospitality-risks' },
  { name: 'Operations', url: '/blog/operations' }
];

interface BlogFilterProps {
  posts: ContentItem[];
}

export default function BlogFilter({ posts }: BlogFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.frontmatter['secondary tag'] === selectedCategory);

  return (
    <>
      {/* Category Pills */}
      <div className="mx-auto mt-10 max-w-2xl lg:mx-0">
        <div className="flex flex-wrap gap-3">
          {blogCategories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category.name
                  ? 'border border-orange-600 text-gray-900'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
              }`}
              style={selectedCategory === category.name ? {
                backgroundColor: '#FFDCB4',
                borderColor: '#FF7B00'
              } : {}}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Blog Posts Grid */}
      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="flex max-w-xl flex-col items-start justify-between relative white-card p-6">
            {'featured' in post && post.featured === true && (
              <div className="absolute top-2 right-2 z-10">
                <span className="small-blue green-card px-2 py-1">Featured</span>
              </div>
            )}
            <div className="mt-6"></div>
            <div className="group relative grow">
              <h3 className="mt-3 h6 group-hover:text-gray-600">
                <Link href={`/blog/${post.slug}`}>
                  <span className="absolute inset-0" />
                  {post.title}
                </Link>
              </h3>
              <p className="mt-5 line-clamp-3 small-blue">{post.meta || ''}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}