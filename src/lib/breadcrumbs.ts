import { getContentBySlug } from '@/lib/content'
import { BreadcrumbItem } from '@/components/Breadcrumb'

export function generateBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', href: '/' }
  ]

  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return []
  }

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

export function generateEnhancedBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  
  // Don't show breadcrumb on home page
  if (pathname === '/') {
    return []
  }
  
  // Check if this is a blog or FAQ page with a slug
  if (segments.length >= 2 && (segments[0] === 'blog' || segments[0] === 'answers')) {
    try {
      const category = segments[0] === 'answers' ? 'answers' : 'blog'
      const slug = segments[segments.length - 1]
      const content = getContentBySlug(category, slug)
      
      if (content && content.frontmatter) {
        const frontmatter = content.frontmatter as Record<string, unknown>
        const breadcrumbs: BreadcrumbItem[] = [
          { name: 'Home', href: '/' }
        ]
        
        // Add Blog as second level for both blog and FAQ pages
        breadcrumbs.push({
          name: 'Blog',
          href: '/blog'
        })
        
        // Add pillar if it exists
        if (frontmatter['pillar text'] && frontmatter['pillar link']) {
          let pillarLink = String(frontmatter['pillar link'] || '')
          if (pillarLink) {
            pillarLink = pillarLink.replace('https://yourpilla.com', '').trim()
            breadcrumbs.push({
              name: String(frontmatter['pillar text']),
              href: pillarLink
            })
          }
        }
        
        // Add subpage if it exists
        if (frontmatter['subpage text'] && frontmatter['subpage link']) {
          let subpageLink = String(frontmatter['subpage link'] || '')
          if (subpageLink) {
            subpageLink = subpageLink.replace('https://yourpilla.com', '').trim()
            breadcrumbs.push({
              name: String(frontmatter['subpage text']),
              href: subpageLink
            })
          }
        }
        
        // Add current page (use breadcrumb short if available, otherwise title)
        const currentPageName = String(frontmatter['breadcrumb short'] || content.title || 'Page')
        breadcrumbs.push({
          name: currentPageName,
          current: true
        })
        
        return breadcrumbs
      }
    } catch (error) {
      // If content loading fails, fall back to path-based breadcrumbs
      console.warn('Failed to load enhanced breadcrumbs, falling back to path-based:', error)
    }
  }
  
  // Fall back to path-based breadcrumbs
  return generateBreadcrumbsFromPath(pathname)
}