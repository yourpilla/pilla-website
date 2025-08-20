import { getContentByCategory } from '@/lib/content';
import BreadcrumbSection from '@/components/BreadcrumbSection';
import { generateBreadcrumbsFromPath } from '@/lib/breadcrumbs';

const faqs = getContentByCategory('answers');

// ISR: Revalidate FAQ pages every 6 hours
export const revalidate = 21600;

export default function AnswersPage() {
  // Generate breadcrumbs for the answers listing page
  const breadcrumbs = generateBreadcrumbsFromPath('/answers')
  
  return (
    <>
      <BreadcrumbSection items={breadcrumbs} />
      <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Hospitality Questions & Answers</h2>
          <p className="mt-2 lead">Expert answers to common hospitality questions, practical solutions, and industry best practices to help you succeed.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {faqs.map((faq) => (
            <article key={faq.slug} className="flex max-w-xl flex-col items-start justify-between relative white-card p-6 rounded-lg">
              {faq.featured && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="small-blue green-card px-2 py-1">Featured</span>
                </div>
              )}
              <div className="mt-6"></div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={`/answers/${faq.slug}`}>
                    <span className="absolute inset-0" />
                    {faq.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{faq.meta || faq.content.slice(0, 160)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
      </div>
    </>
  )
}