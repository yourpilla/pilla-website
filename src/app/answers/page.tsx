import { getContentByCategory } from '@/lib/content';

const faqs = getContentByCategory('answers');

// ISR: Revalidate FAQ pages every 6 hours
export const revalidate = 21600;

export default function AnswersPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Hospitality Questions & Answers</h2>
          <p className="mt-2 lead">Expert answers to common hospitality questions, practical solutions, and industry best practices to help you succeed.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {faqs.map((faq) => (
            <article key={faq.slug} className="flex max-w-xl flex-col items-start justify-between relative">
              {faq.featured && (
                <div className="absolute top-0 right-0 z-10">
                  <span className="small-blue green-card px-2 py-1">Featured</span>
                </div>
              )}
              <div className="flex items-center gap-x-4 text-xs mt-6">
                <span className="text-muted">
                  FAQ Answer
                </span>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={`/answers/${faq.slug}`}>
                    <span className="absolute inset-0" />
                    {faq.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{faq.meta || faq.content.slice(0, 160)}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <div className="size-10 rounded-full bg-blue-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
                  </svg>
                </div>
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    Pilla Team
                  </p>
                  <p className="text-muted">Hospitality Expert</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}