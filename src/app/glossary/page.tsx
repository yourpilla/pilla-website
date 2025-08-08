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
  
  // Generate all letters A-Z for complete pagination
  const allLetters = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

  return (
    <div className="bg-white">
      {/* Header Section */}
      <div className="bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-100 rounded-full">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
                </svg>
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Hospitality Glossary
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl leading-8 text-gray-600">
              Your comprehensive guide to hospitality industry terminology. From front-of-house operations 
              to back-office management, find clear definitions for every role and concept.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-600 bg-blue-100">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M9 3a1 1 0 012 0v5.5a.5.5 0 001 0V4a1 1 0 112 0v4.5a.5.5 0 001 0V6a1 1 0 112 0v6a6 6 0 01-6 6H9a6 6 0 01-6-6V9a1 1 0 012 0v2.5a.5.5 0 001 0V4a1 1 0 012 0v4.5a.5.5 0 001 0V3z" clipRule="evenodd" />
                </svg>
                {terms.length} Terms Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alphabetical Navigation */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
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
                        flex items-center justify-center w-10 h-10 text-sm font-medium rounded-lg transition-all duration-200
                        ${hasTerms 
                          ? 'bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 cursor-pointer shadow-sm hover:shadow-md' 
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
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white text-2xl font-bold rounded-lg mr-4">
                  {letter}
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">
                    {letter}
                  </h2>
                  <p className="text-gray-600">
                    {groupedTerms[letter].length} term{groupedTerms[letter].length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {groupedTerms[letter].map((term) => (
                  <div 
                    key={term.slug} 
                    className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-blue-300 hover:shadow-lg transition-all duration-200"
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
                    <div className="mt-4 flex items-center text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
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