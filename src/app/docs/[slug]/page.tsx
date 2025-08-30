import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getContentBySlug, getDocs } from '@/lib/content';
import { DocItem } from '@/lib/content';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';
import DocNavigation from '@/components/DocNavigation';
import TableOfContents from '@/components/TableOfContents';

interface DocsPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: DocsPageProps): Promise<Metadata> {
  const doc = getContentBySlug('docs', params.slug) as DocItem | null;
  
  if (!doc) {
    return {
      title: 'Page Not Found',
    };
  }

  return {
    title: `${doc.title} - Pilla Documentation`,
    description: doc.meta || `Learn about ${doc.title} in the Pilla platform documentation.`,
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "headline": doc.title,
        "description": doc.meta || `Learn about ${doc.title} in the Pilla platform documentation.`,
        "author": {
          "@type": "Organization",
          "name": "Pilla"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Pilla",
          "url": "https://yourpilla.com"
        },
        "url": `https://yourpilla.com/docs/${params.slug}`,
        "inLanguage": "en-GB"
      })
    }
  };
}

export async function generateStaticParams() {
  const docs = getDocs();
  return docs.map((doc) => ({
    slug: doc.slug,
  }));
}

export default function DocPage({ params }: DocsPageProps) {
  const doc = getContentBySlug('docs', params.slug) as DocItem | null;
  
  if (!doc) {
    notFound();
  }

  const allDocs = getDocs();
  const currentIndex = allDocs.findIndex(d => d.slug === doc.slug);
  const previousDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  // Get sidebar image with fallback
  const sidebarImage = doc.sidebarImage || 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format';
  const sidebarImageAlt = doc.sidebarImageAlt || `${doc.title} - Documentation`;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TechArticle",
            "headline": doc.title,
            "description": doc.meta || `Learn about ${doc.title} in the Pilla platform documentation.`,
            "author": {
              "@type": "Organization",
              "name": "Pilla"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Pilla",
              "url": "https://yourpilla.com"
            },
            "url": `https://yourpilla.com/docs/${params.slug}`,
            "inLanguage": "en-GB"
          })
        }}
      />
      
      <div className="py-8 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content */}
          <div className="lg:col-span-3">
            <article className="prose prose-lg max-w-none">
              <MarkdownContent content={doc.content} />
            </article>
            
            {/* Navigation */}
            <DocNavigation 
              previousDoc={previousDoc}
              nextDoc={nextDoc}
            />
          </div>
          
          {/* Sidebar with image and TOC */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-8">
              {/* Doc image */}
              <div className="flex justify-center">
                <Image
                  src={sidebarImage}
                  alt={sidebarImageAlt}
                  width={400}
                  height={300}
                  className="w-full max-w-sm object-cover rounded-lg shadow-sm"
                />
              </div>
              
              {/* Table of Contents */}
              <TableOfContents content={doc.content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}