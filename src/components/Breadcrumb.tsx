'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  
  // Use provided items or generate from pathname
  const breadcrumbItems = items || generateBreadcrumbsFromPath(pathname)
  
  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return null
  }

  return (
    <div className={`px-8 py-3 border-b border-gray-200 bg-gray-50 ${className}`}>
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