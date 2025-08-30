import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getContentBySlug, getDocs, getDocsBySection } from '@/lib/content';
import { DocItem } from '@/lib/content';
import MarkdownContent from '@/components/MarkdownContent';

interface DocsPageProps {
  params: Promise<{
    section: string;
    slug: string;
  }>;
}

// Section titles mapping
const SECTION_TITLES: Record<string, string> = {
  'getting-started': 'Getting Started',
  'user-management': 'User Management', 
  'training': 'Training & Development',
  'operations': 'Operations',
  'integrations': 'Integrations & API'
};

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

  const sidebarImage = doc.sidebarImage || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format';
  const sidebarImageAlt = doc.sidebarImageAlt || `${doc.title} - Pilla Documentation`;

  return (
    <>
      <div className="bg-main">
        <div className="mx-auto max-w-4xl px-6 py-8 pb-24 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
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

            {/* Sidebar Image & Support */}
            <div className="lg:col-span-1">
              <div className="sticky top-4 space-y-6">
                <Image
                  src={sidebarImage}
                  alt={sidebarImageAlt}
                  width={400}
                  height={300}
                  className="w-full rounded-lg shadow-sm"
                />
                
                {/* Quick Support */}
                <div className="rounded-lg bg-white p-4 shadow-sm ring-1 ring-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900">Need help?</h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Can&apos;t find what you&apos;re looking for?
                  </p>
                  <div className="mt-3 space-y-2">
                    <Link
                      href="mailto:support@yourpilla.com"
                      className="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      Email Support
                    </Link>
                    <Link
                      href="/contact"
                      className="block text-sm text-blue-600 hover:text-blue-800"
                    >
                      Contact Us
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