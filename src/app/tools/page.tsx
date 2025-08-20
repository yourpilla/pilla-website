import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';

export default function ToolsPage() {
  const tools = getContentByCategory('tools');

  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Hospitality Tools & Calculators</h2>
          <p className="mt-2 lead">Essential calculators and tools to help you manage costs, optimize operations, and make data-driven decisions for your hospitality business.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tools.map((tool) => (
            <article key={tool.slug} className="flex max-w-xl flex-col items-start justify-between relative white-card p-6 rounded-lg">
              {(tool as any).featured === true && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="small-blue green-card px-2 py-1">Featured</span>
                </div>
              )}
              <div className="flex items-center gap-x-4 text-xs mt-6">
                <time dateTime={tool.frontmatter.date as string} className="text-muted">
                  {new Date(tool.frontmatter.date as string).toLocaleDateString('en-GB', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}
                </time>
                <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                  {tool.frontmatter.category as string}
                </span>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <Link href={`/tools/${tool.slug}`}>
                    <span className="absolute inset-0" />
                    {tool.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{tool.meta}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}