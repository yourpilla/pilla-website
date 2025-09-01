import { getContentByCategory } from '@/lib/content';
import Link from 'next/link';

export default function GlossaryIndex() {
  const terms = getContentByCategory('glossary').sort((a, b) => 
    a.title.localeCompare(b.title)
  );

  // Group terms by first letter (numbers grouped under '#')
  const groupedTerms = terms.reduce((acc, term) => {
    const firstChar = term.title.charAt(0);
    const key = /\d/.test(firstChar) ? '#' : firstChar.toUpperCase();
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(term);
    return acc;
  }, {} as Record<string, typeof terms>);

  const letters = Object.keys(groupedTerms).sort((a, b) => {
    // '#' comes first, then alphabetical
    if (a === '#') return -1;
    if (b === '#') return 1;
    return a.localeCompare(b);
  });
  
  // Generate all letters A-Z plus # for complete pagination
  const allLetters = ['#', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))];

  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="h1">Hospitality Glossary</h1>
          <p className="mt-2 big-blue">Your comprehensive guide to hospitality industry terminology. From front-of-house operations to back-office management, find clear definitions for every role and concept.</p>
        </div>
      </div>

      {/* Alphabetical Navigation */}
      <div className="sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <nav className="flex justify-center">
              <div className="flex flex-wrap justify-center gap-1 max-w-4xl">
                {allLetters.map((letter) => {
                  const hasTerms = letters.includes(letter);
                  return (
                    <a
                      key={letter}
                      href={hasTerms ? `#${letter}` : undefined}
                      className={`
                        flex items-center justify-center w-10 h-10 text-sm font-medium transition-all duration-200
                        ${hasTerms 
                          ? 'orange-pill cursor-pointer' 
                          : 'bg-gray-50 text-gray-300 cursor-not-allowed'
                        }
                      `}
                      title={hasTerms ? `Jump to ${letter}` : `No terms starting with ${letter}`}
                    >
                      {letter}
                    </a>
                  );
                })}
              </div>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {letters.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No glossary terms found</h3>
            <p className="text-gray-600">Terms will appear here once they are added to the content directory.</p>
          </div>
        ) : (
          letters.map((letter) => (
            <section key={letter} id={letter} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 orange-pill text-2xl font-bold mr-4">
                  {letter}
                </div>
                <div>
                  <p className="text-gray-600">
                    {groupedTerms[letter].length} term{groupedTerms[letter].length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedTerms[letter].map((term) => (
                  <div 
                    key={term.slug} 
                    className="group white-card p-6"
                  >
                    <h3 className="font-semibold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      <Link 
                        href={`/glossary/${term.slug}`}
                        className="block"
                      >
                        {term.title}
                      </Link>
                    </h3>
                    {term.meta && (
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {term.meta}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  );
}