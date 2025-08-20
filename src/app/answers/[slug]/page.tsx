import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';

interface FAQPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = getContentBySlug('answers', slug);
  
  if (!faq) {
    return {};
  }

  return {
    title: faq.title,
    description: faq.meta || faq.content.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('answers');
  return slugs.map((slug) => ({ slug }));
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { slug } = await params;
  const faq = getContentBySlug('answers', slug);

  if (!faq) {
    notFound();
  }

  const subtitle = faq.frontmatter.subtitle && typeof faq.frontmatter.subtitle === 'string' 
    ? faq.frontmatter.subtitle 
    : null;

  return (
    <>
      {/* Render exact schema from YAML frontmatter */}
      {faq.frontmatter.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faq.frontmatter.schema),
          }}
        />
      )}
      
      {/* Render exact breadcrumb schema from YAML frontmatter */}
      {faq.frontmatter.breadcrumb_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faq.frontmatter.breadcrumb_schema),
          }}
        />
      )}
      
      <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {faq.title}
              </h1>
              {subtitle && (
                <p className="mt-6 small-grey">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center text-white">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
              </svg>
              <h3 className="text-lg font-semibold mb-1">More Questions?</h3>
              <p className="text-blue-100 text-sm">Browse our complete FAQ collection</p>
            </div>
            <div className="p-4">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format" 
                alt="Hospitality FAQ and support" 
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <button className="btn">
                  View All FAQs
                </button>
                <p className="text-gray-500 text-xs mt-2">Expert hospitality answers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base/7 text-gray-600 lg:max-w-lg">
              <MarkdownContent content={faq.content} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}