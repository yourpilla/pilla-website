import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';

// Function to extract description from content
function extractDescription(content: string): string {
  // Look for the first paragraph after the title and date info
  const lines = content.split('\n').filter(line => line.trim());
  
  // Skip title lines, date lines, and find first substantial paragraph
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip markdown headers, date lines, and short lines
    if (line.startsWith('#') || 
        line.includes('Last Updated') || 
        line.includes('Version') || 
        line.length < 50 ||
        line.startsWith('**')) {
      continue;
    }
    
    // Return first substantial paragraph, truncated
    return line.length > 150 ? line.substring(0, 150) + '...' : line;
  }
  
  return 'Important legal information and policies.';
}

// Function to get category from filename
function getCategory(slug: string): string {
  if (slug.includes('privacy')) return 'Privacy';
  if (slug.includes('terms')) return 'Terms';
  if (slug.includes('cookie')) return 'Privacy';
  if (slug.includes('erasure')) return 'Privacy';
  return 'Legal';
}

export default function LegalPage() {
  const legalPages = getContentByCategory('legal');

  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Legal Information</h2>
          <p className="mt-2 lead">Important legal documents and policies that govern your use of our hospitality platform and services.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {legalPages.map((page) => (
            <article key={page.slug} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time className="text-muted">
                  Recent
                </time>
                <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  {getCategory(page.slug)}
                </span>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link href={`/legal/${page.slug}`}>
                    <span className="absolute inset-0" />
                    {page.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">
                  {page.meta || extractDescription(page.content)}
                </p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <span className="absolute inset-0" />
                    Legal Team
                  </p>
                  <p className="text-muted">Pilla Legal Department</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}