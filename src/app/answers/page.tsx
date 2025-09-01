import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';

const faqs = getContentByCategory('answers');

// ISR: Revalidate FAQ pages every 6 hours
export const revalidate = 21600;

export default function AnswersPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="h1">Hospitality Questions & Answers</h1>
          <p className="mt-2 big-blue">Expert answers to common hospitality questions, practical solutions, and industry best practices to help you succeed.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {faqs.map((faq) => (
            <Link key={faq.slug} href={`/answers/${faq.slug}`} className="flex max-w-xl flex-col items-start justify-between relative white-card p-6 group hover:shadow-sm transition-shadow">
              {faq.featured && (
                <div className="absolute top-2 right-2 z-10">
                  <span className="small-blue green-card px-2 py-1">Featured</span>
                </div>
              )}
              <div className="mt-6"></div>
              <div className="relative grow">
                <h3 className="mt-3 h4 group-hover:text-gray-600">
                  {faq.title}
                </h3>
                <p className="mt-5 line-clamp-3 small-blue">{faq.meta || faq.content.slice(0, 160)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}