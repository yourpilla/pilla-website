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

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.title,
    "description": term.meta || term.content.slice(0, 160),
    "inDefinedTermSet": "https://yourpilla.com/glossary",
    "url": `https://yourpilla.com/glossary/${slug}`,
    "inLanguage": "en-GB"
  };

  return {
    title: `${term.title} - Hospitality Glossary`,
    description: term.meta || term.content.slice(0, 160),
    other: {
      'script:ld+json': JSON.stringify(jsonLd)
    }
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('glossary');
  return slugs.map((slug) => ({ slug }));
}

export default async function GlossaryPage({ params }: GlossaryPageProps) {
  const { slug } = await params;
  const term = getContentBySlug('glossary', slug);

  if (!term) {
    notFound();
  }

  const synonyms = Array.isArray(term.frontmatter.synonyms) ? term.frontmatter.synonyms as string[] : [];

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.title,
    "description": term.meta || term.content.slice(0, 160),
    "inDefinedTermSet": "https://yourpilla.com/glossary",
    "url": `https://yourpilla.com/glossary/${slug}`,
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Breadcrumb */}
          <div className="px-8 pt-6 pb-2">
            <nav aria-label="Breadcrumb">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">
                    Home
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li>
                  <Link href="/glossary" className="text-blue-600 hover:text-blue-800">
                    Glossary
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li aria-current="page" className="text-gray-600">
                  {term.title}
                </li>
              </ol>
            </nav>
          </div>
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
              </svg>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              {term.title} meaning in hospitality
            </h1>
            {term.meta && (
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                {term.meta}
              </p>
            )}
            
            {synonyms && synonyms.length > 0 && (
              <div className="mt-8">
                <p className="text-sm font-semibold text-gray-700 mb-3">Also known as:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {synonyms.map((synonym: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm px-4 py-2 rounded-full font-medium"
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8 max-w-2xl mx-auto">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Learn More About Hospitality
                </h3>
                <p className="text-gray-600 mb-6">
                  Explore our comprehensive glossary of hospitality terms and boost your industry knowledge.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/glossary"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Browse All Terms
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-medium rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors"
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