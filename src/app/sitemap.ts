import { MetadataRoute } from 'next'
import { getContentByCategory } from '@/lib/content'

const BASE_URL = 'https://yourpilla.com'

export const revalidate = 3600 // Revalidate every hour

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/how-it-works`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Category pages
    {
      url: `${BASE_URL}/answers`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/glossary`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/tools`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/legal`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Blog category pages
    {
      url: `${BASE_URL}/blog/food-safety-management-system`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/hospitality-job-roles`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/hospitality-risks`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/interviews`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/operations`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/blog/restaurant-staff-onboarding`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ]

  // Generate dynamic routes from markdown content
  const contentCategories = ['answers', 'blog', 'glossary', 'legal', 'tools'] as const
  
  const dynamicRoutes: MetadataRoute.Sitemap = contentCategories.flatMap(category => {
    const items = getContentByCategory(category)
    
    return items.map(item => ({
      url: `${BASE_URL}/${category}/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: getChangeFrequency(category),
      priority: getPriority(category, item.frontmatter?.featured === true),
    }))
  })

  return [...staticRoutes, ...dynamicRoutes]
}

function getChangeFrequency(category: string): "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" {
  switch (category) {
    case 'answers':
    case 'blog':
      return 'weekly'
    case 'glossary':
      return 'monthly'
    case 'tools':
      return 'monthly'
    case 'legal':
      return 'yearly'
    default:
      return 'monthly'
  }
}

function getPriority(category: string, featured?: boolean): number {
  const basePriority = {
    answers: 0.8,
    blog: 0.7,
    glossary: 0.6,
    tools: 0.7,
    legal: 0.3,
  }[category] || 0.5

  return featured ? Math.min(basePriority + 0.1, 1.0) : basePriority
}