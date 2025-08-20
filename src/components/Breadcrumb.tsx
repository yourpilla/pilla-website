'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface BreadcrumbItem {
  name: string
  href?: string
  current?: boolean
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
}

function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' }
  ]

  // Build breadcrumbs from path segments
  segments.forEach((segment, index) => {
    const href = `/${segments.slice(0, index + 1).join('/')}`
    const isLast = index === segments.length - 1
    
    // Convert segment to readable name
    let name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
    
    // Special cases for known routes
    if (segment === 'glossary') {
      name = 'Glossary'
    } else if (segment === 'pricing') {
      name = 'Pricing'
    } else if (segment === 'about') {
      name = 'About'
    } else if (segment === 'blog') {
      name = 'Blog'
    } else if (segment === 'tools') {
      name = 'Tools'
    } else if (segment === 'answers') {
      name = 'FAQs'
    }
    
    breadcrumbs.push({
      name,
      href: isLast ? undefined : href,
      current: isLast
    })
  })

  return breadcrumbs
}

export default function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const pathname = usePathname()
  const [enhancedBreadcrumbs, setEnhancedBreadcrumbs] = useState<BreadcrumbItem[] | null>(null)
  const [loading, setLoading] = useState(false)
  
  // Check if this is a blog or FAQ page that might have enhanced breadcrumbs
  const isEnhancedPage = pathname.startsWith('/blog/') || pathname.startsWith('/answers/')
  
  useEffect(() => {
    if (isEnhancedPage && !items) {
      setLoading(true)
      fetch(`/api/breadcrumbs?pathname=${encodeURIComponent(pathname)}`)
        .then(res => res.json())
        .then(data => {
          if (data.breadcrumbs && data.breadcrumbs.length > 2) {
            // Only use enhanced breadcrumbs if they have more than basic path-based ones
            setEnhancedBreadcrumbs(data.breadcrumbs)
          }
        })
        .catch(error => {
          console.error('Error fetching enhanced breadcrumbs:', error)
        })
        .finally(() => {
          setLoading(false)
        })
    }
  }, [pathname, isEnhancedPage, items])
  
  // Use provided items, enhanced breadcrumbs, or generate from pathname
  const breadcrumbItems = items || enhancedBreadcrumbs || generateBreadcrumbsFromPath(pathname)
  
  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null
  }
  
  // Show loading state briefly
  if (loading && isEnhancedPage && !items) {
    return (
      <div className={`px-8 py-3 border-b border-gray-200 bg-white ${className}`}>
        <div className="mx-auto max-w-7xl">
          <div className="h-5 bg-gray-200 animate-pulse rounded w-64"></div>
        </div>
      </div>
    )
  }
  return (
    <div className={`px-8 py-3 border-b border-gray-200 bg-white ${className}`}>
      <div className="mx-auto max-w-7xl">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <li key={index} className="flex items-center">
                {index > 0 && (
                  <svg 
                    className="w-4 h-4 text-gray-400 mr-2" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                )}
                {item.current ? (
                  <span 
                    aria-current="page" 
                    className="text-gray-600 font-medium"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link 
                    href={item.href!} 
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  )
}