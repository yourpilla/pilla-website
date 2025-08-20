import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
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
      <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-card border-default rounded-default shadow-sm overflow-hidden">
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="mb-4 leading-tight">
              {term.title} meaning in hospitality
            </h1>
            {term.meta && (
              <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
                {term.meta}
              </p>
            )}
            
            {synonyms && synonyms.length > 0 && (
              <div className="mt-8">
                <p className="text-muted mb-3 font-semibold" style={{fontSize: 'var(--text-sm)'}}>Also known as:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {synonyms.map((synonym: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium"
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-left max-w-3xl mx-auto">
              <MarkdownContent content={term.content} />
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                  Learn More About Hospitality
                </h3>
                <p className="text-muted mb-6">
                  Explore our comprehensive glossary of hospitality terms and boost your industry knowledge.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/glossary"
                    className="btn"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Browse All Terms
                  </Link>
                  <Link
                    href="/blog"
                    className="btn"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Read Our Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}