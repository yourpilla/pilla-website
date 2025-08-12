import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const tool = await getContentBySlug('tools', slug);
    
    if (!tool) {
      return {};
    }
    
    return {
      title: `${tool.frontmatter.title} - Free Hospitality Calculator`,
      description: tool.frontmatter.meta as string,
      other: {
        'script:ld+json': JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": tool.frontmatter.title as string,
          "description": tool.frontmatter.meta as string,
          "url": `https://yourpilla.com/tools/${slug}`,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "inLanguage": "en-GB"
        })
      }
    };
  } catch {
    return {};
  }
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs('tools');
  return slugs.map((slug) => ({ slug }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  
  try {
    const tool = await getContentBySlug('tools', slug);

    if (!tool) {
      notFound();
    }

    const jsonLd = {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      "name": tool.frontmatter.title as string,
      "description": tool.frontmatter.meta as string,
      "url": `https://yourpilla.com/tools/${slug}`,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "inLanguage": "en-GB"
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            .tool-container {
              font-family: Arial, sans-serif;
              text-align: center;
              max-width: 600px;
              margin: 0 auto;
            }
            .tool-container h2 {
              font-size: 24px;
              margin-bottom: 20px;
              text-align: left;
            }
            .tool-container p, .tool-container label, .tool-container button, .tool-container li {
              font-size: 18px;
              text-align: left;
            }
            .tool-container input, .tool-container select {
              border-radius: 10px;
              border: 2px solid black;
              box-shadow: 4px 4px 0 0 black;
              padding: 5px;
              margin: 5px 0;
              height: 40px;
              font-size: 18px;
              width: 100%;
              text-align: left;
              box-sizing: border-box;
            }
            .tool-container input:focus, .tool-container select:focus {
              outline: none;
              border: 2px solid black;
            }
            .tool-container button {
              border-radius: 10px;
              border: none;
              background-color: black;
              color: white;
              padding: 5px 10px;
              margin: 5px 0;
              font-size: 18px;
              font-weight: bold;
              cursor: pointer;
              height: 40px;
              width: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .tool-container button:focus {
              outline: none;
              box-shadow: none;
            }
            .tool-container .section {
              margin-bottom: 60px;
            }
            .tool-container .form-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 20px;
              gap: 20px;
            }
            .tool-container .form-column {
              display: flex;
              flex-direction: column;
              width: 100%;
            }
            .tool-container .form-column input, .tool-container .form-column select {
              margin-bottom: 10px;
            }
            .tool-container ul {
              list-style-type: none;
              padding: 0;
              text-align: left;
            }
            .tool-container li {
              margin-bottom: 10px;
            }
            .tool-container .result {
              margin-top: 20px;
              font-size: 18px;
            }
            .tool-container .category {
              margin-top: 10px;
              padding: 10px;
              background-color: #f4f4f4;
              border-left: 5px solid black;
            }
            .tool-container .item-row {
              margin-bottom: 20px;
              border-bottom: 1px solid #ccc;
              padding-bottom: 20px;
            }
            @media (max-width: 768px) {
              .tool-container .form-row {
                flex-direction: column;
                gap: 10px;
              }
            }
          `
        }} />
        <div className="min-h-screen" style={{backgroundColor: 'var(--background)'}}>
          {/* Main Content */}
          <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="bg-card border-default rounded-default shadow-sm overflow-hidden">
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
                      <Link href="/tools" className="text-blue-600 hover:text-blue-800">
                        Tools
                      </Link>
                    </li>
                    <li>
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                      </svg>
                    </li>
                    <li aria-current="page" className="text-gray-600">
                      {tool.frontmatter.title as string}
                    </li>
                  </ol>
                </nav>
              </div>
              
              {/* Header */}
              <div className="bg-header-group px-8 py-12 text-center">
                <h1 className="mb-4 leading-tight">
                  {tool.frontmatter.title as string}
                </h1>
                <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
                  {tool.frontmatter.meta as string}
                </p>
              </div>
              
              {/* Tool HTML Content */}
              <div className="px-8 py-12">
                <div 
                  className="tool-container"
                  dangerouslySetInnerHTML={{ __html: tool.content }}
                />
              </div>

              {/* Who Is This For Section */}
              <div className="px-8 py-12 border-t border-gray-200 bg-gray-50">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-6">Who Is This Tool For?</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {tool.frontmatter.whoFor as string}
                  </p>
                </div>
              </div>

              {/* Why Use This Tool Section */}
              <div className="px-8 py-12 border-t border-gray-200">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-semibold mb-6">Why Use This Tool?</h2>
                  <p className="text-lg leading-relaxed text-gray-700">
                    {tool.frontmatter.whyUse as string}
                  </p>
                </div>
              </div>
              
              {/* Call to Action */}
              <div className="px-8 py-12 border-t border-gray-200">
                <div className="text-center">
                  <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                    <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                      Need More Hospitality Tools?
                    </h3>
                    <p className="text-muted mb-6">
                      Explore our collection of free calculators and tools designed specifically for hospitality professionals.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link
                        href="/tools"
                        className="btn"
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        View All Tools
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

              {/* Footer Attribution */}
              <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
                <div className="text-center text-sm text-gray-600">
                  <p>
                    This free tool has been written by Pilla Founder,{' '}
                    <a href="https://www.linkedin.com/in/liam-jones-2a047783/" className="text-blue-600 hover:text-blue-500">
                      Liam Jones
                    </a>
                    . You can{' '}
                    <a href="mailto:liam@yourpilla.com" className="text-blue-600 hover:text-blue-500">
                      email Liam directly
                    </a>
                    {' '}if you want to suggest an improvement.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } catch {
    notFound();
  }
}