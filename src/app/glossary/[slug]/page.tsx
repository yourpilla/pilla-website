import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';

interface GlossaryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GlossaryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getContentBySlug('glossary', slug);
  
  if (!term) {
    return {};
  }

  return {
    title: `${term.title} - Hospitality Glossary`,
    description: term.meta || term.content.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('glossary');
  return slugs.map((slug) => ({ slug }));
}

// ISR: Revalidate glossary terms every 12 hours
export const revalidate = 43200;

export default async function GlossaryPage({ params }: GlossaryPageProps) {
  const { slug } = await params;
  const term = getContentBySlug('glossary', slug);

  if (!term) {
    notFound();
  }

  const synonyms = Array.isArray(term.frontmatter.synonyms) ? term.frontmatter.synonyms as string[] : [];

  // Get dynamic image from YAML or use default
  const sidebarImage = term.frontmatter.sidebar_image && typeof term.frontmatter.sidebar_image === 'string'
    ? term.frontmatter.sidebar_image
    : "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format";
  
  const sidebarImageAlt = term.frontmatter.sidebar_image_alt && typeof term.frontmatter.sidebar_image_alt === 'string'
    ? term.frontmatter.sidebar_image_alt
    : "Hospitality glossary term";

  return (
    <>
      {/* Render exact schema from YAML frontmatter */}
      {term.frontmatter.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(term.frontmatter.schema),
          }}
        />
      )}
      
      {/* Render exact breadcrumb schema from YAML frontmatter */}
      {term.frontmatter.breadcrumb_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(term.frontmatter.breadcrumb_schema),
          }}
        />
      )}
      
      <div className="relative isolate overflow-hidden bg-main px-6 py-24 sm:py-32 lg:overflow-visible lg:px-18">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-4xl">
              <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {term.title} meaning in hospitality
              </h1>
              
              {synonyms && synonyms.length > 0 && (
                <div className="mt-8">
                  <p className="text-gray-600 mb-3 font-semibold text-sm">Also known as:</p>
                  <div className="flex flex-wrap gap-2">
                    {synonyms.map((synonym: string, index: number) => (
                      <span 
                        key={index}
                        className="bg-white border border-gray-200 text-sm px-4 py-2 rounded-lg font-medium text-gray-900"
                      >
                        {synonym}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:sticky lg:top-4 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:justify-start">
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
              <MarkdownContent content={term.content} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}