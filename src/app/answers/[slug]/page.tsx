import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';
import ReactMarkdown from 'react-markdown';

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

  // Get dynamic image from YAML or use default
  const sidebarImage = faq.frontmatter.sidebar_image && typeof faq.frontmatter.sidebar_image === 'string'
    ? faq.frontmatter.sidebar_image
    : "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format";
  
  const sidebarImageAlt = faq.frontmatter.sidebar_image_alt && typeof faq.frontmatter.sidebar_image_alt === 'string'
    ? faq.frontmatter.sidebar_image_alt
    : "Hospitality FAQ and support";

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
      
      <div className="relative isolate overflow-hidden bg-main px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-4xl">
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {faq.title}
              </h1>
              {subtitle && (
                <div className="mt-6 small-grey">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <>{children}</>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="underline hover:opacity-80 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      )
                    }}
                  >
                    {subtitle}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="lg:sticky lg:top-4 lg:col-start-3 lg:row-span-2 lg:row-start-1">
          <Image
            src={sidebarImage} 
            alt={sidebarImageAlt} 
            width={400}
            height={300}
            className="w-full max-w-sm object-cover rounded-lg"
          />
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-4xl text-base/7 text-gray-600">
              <MarkdownContent content={faq.content} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}