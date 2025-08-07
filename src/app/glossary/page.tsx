import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';

export default function GlossaryIndex() {
  const terms = getContentByCategory('glossary').sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  // Group terms by first letter
  const groupedTerms = terms.reduce((acc, term) => {
    const firstLetter = term.title.charAt(0).toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(term);
    return acc;
  }, {} as Record<string, typeof terms>);

  const letters = Object.keys(groupedTerms).sort();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Hospitality Glossary</h1>
        <p className="text-lg text-gray-600">
          Essential terms and definitions for the hospitality industry
        </p>
      </header>

      {/* Letter navigation */}
      <div className="mb-8 flex flex-wrap gap-2">
        {letters.map((letter) => (
          <a
            key={letter}
            href={`#${letter}`}
            className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium transition-colors"
          >
            {letter}
          </a>
        ))}
      </div>

      {/* Terms by letter */}
      {letters.map((letter) => (
        <section key={letter} id={letter} className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b-2 border-gray-200 pb-2">
            {letter}
          </h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupedTerms[letter].map((term) => (
              <div 
                key={term.slug} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-2">
                  <Link 
                    href={`/glossary/${term.slug}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {term.title}
                  </Link>
                </h3>
                {term.meta && (
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {term.meta}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}