import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

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

export default async function GlossaryPage({ params }: GlossaryPageProps) {
  const { slug } = await params;
  const term = getContentBySlug('glossary', slug);

  if (!term) {
    notFound();
  }

  const synonyms = term.frontmatter.synonyms;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{term.title}</h1>
        {synonyms && synonyms.length > 0 && (
          <div className="mb-4">
            <h2 className="text-sm font-semibold text-gray-700 mb-2">Also known as:</h2>
            <div className="flex flex-wrap gap-2">
              {synonyms.map((synonym: string, index: number) => (
                <span 
                  key={index}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  {synonym}
                </span>
              ))}
            </div>
          </div>
        )}
      </header>
      
      <article className="prose prose-lg max-w-none">
        <div dangerouslySetInnerHTML={{ __html: term.content }} />
      </article>
    </div>
  );
}