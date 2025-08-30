import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getContentBySlug, getDocs, getDocsBySection } from '@/lib/content';
import { DocItem } from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent';
import TableOfContents from '@/components/TableOfContents';

interface DocsPageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}


export async function generateStaticParams() {
  const docs = getDocs();
  
  return docs.map((doc) => ({
    section: doc.section,
    slug: doc.slug,
  }));
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const { section, slug } = await params;
  const doc = getContentBySlug('docs', `${section}/${slug}`);

  if (!doc) {
    return {
      title: 'Page Not Found - Pilla Documentation',
      description: 'The requested documentation page could not be found.'
    };
  }

  return {
    title: `${doc.title} - Pilla Documentation`,
    description: doc.meta || `Learn about ${doc.title} in the Pilla hospitality management platform.`,
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": doc.title,
        "description": doc.meta || `Learn about ${doc.title} in the Pilla platform`,
        "url": `https://yourpilla.com/docs/${section}/${slug}`,
        "inLanguage": "en-GB",
        "author": {
          "@type": "Organization",
          "name": "Pilla"
        }
      })
    }
  };
}

export default async function DocPage({ params }: DocsPageProps) {
  const { section, slug } = await params;
  const doc = getContentBySlug('docs', `${section}/${slug}`) as DocItem | null;

  if (!doc) {
    notFound();
  }

  // Get all docs in this section for navigation
  const sectionDocs = getDocsBySection(section);
  
  // Find current doc index for prev/next navigation
  const currentIndex = sectionDocs.findIndex(d => d.slug === slug);
  const prevDoc = currentIndex > 0 ? sectionDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < sectionDocs.length - 1 ? sectionDocs[currentIndex + 1] : null;

  return (
    <>
      <div className="bg-main">
        <div className="mx-auto max-w-7xl px-6 py-8 pb-24 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <article className="prose prose-lg max-w-none">
                <MarkdownContent content={doc.content} />
              </article>

              {/* Navigation */}
              <div className="mt-12 flex justify-between border-t border-gray-200 pt-8">
                <div className="flex-1">
                  {prevDoc && (
                    <Link
                      href={`/docs/${section}/${prevDoc.slug}`}
                      className="group flex flex-col items-start"
                    >
                      <span className="text-sm text-gray-500 group-hover:text-gray-700">Previous</span>
                      <span className="text-base font-medium text-gray-900 group-hover:text-blue-600">
                        {prevDoc.title}
                      </span>
                    </Link>
                  )}
                </div>
                <div className="flex-1 text-right">
                  {nextDoc && (
                    <Link
                      href={`/docs/${section}/${nextDoc.slug}`}
                      className="group flex flex-col items-end"
                    >
                      <span className="text-sm text-gray-500 group-hover:text-gray-700">Next</span>
                      <span className="text-base font-medium text-gray-900 group-hover:text-blue-600">
                        {nextDoc.title}
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* What's on this page - Table of Contents */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="white-card rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-gray-900 mb-3">What&apos;s on this page</h4>
                  <TableOfContents content={doc.content} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}