import { getContentBySlug, getAllSlugs, getFAQsByUIDs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';
import ReactMarkdown from 'react-markdown';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getContentBySlug('blog', slug);
  
  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.meta || post.content.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('blog');
  return slugs.map((slug) => ({ slug }));
}

// ISR: Revalidate blog posts every 1 hour
export const revalidate = 3600;

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const post = getContentBySlug('blog', slug);

  if (!post) {
    notFound();
  }

  const subtitle = post.frontmatter.subtitle && typeof post.frontmatter.subtitle === 'string' 
    ? post.frontmatter.subtitle 
    : null;

  const intro = post.frontmatter.intro && typeof post.frontmatter.intro === 'string' 
    ? post.frontmatter.intro 
    : null;

  const tldr = post.frontmatter.tldr && typeof post.frontmatter.tldr === 'string' 
    ? post.frontmatter.tldr 
    : null;

  // Get dynamic image from YAML or use default
  const sidebarImage = post.frontmatter.sidebar_image && typeof post.frontmatter.sidebar_image === 'string'
    ? post.frontmatter.sidebar_image
    : "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format";
  
  const sidebarImageAlt = post.frontmatter.sidebar_image_alt && typeof post.frontmatter.sidebar_image_alt === 'string'
    ? post.frontmatter.sidebar_image_alt
    : "Hospitality blog and insights";

  // Get FAQs by UIDs from the questions field
  const questionUIDs = post.frontmatter.questions && typeof post.frontmatter.questions === 'string' 
    ? post.frontmatter.questions.split(',').map((uid: string) => uid.trim()).filter((uid: string) => uid.length > 0)
    : [];
  
  const faqs = getFAQsByUIDs(questionUIDs);

  return (
    <>
      {/* Render exact schema from YAML frontmatter */}
      {post.frontmatter.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(post.frontmatter.schema),
          }}
        />
      )}
      
      {/* Render exact breadcrumb schema from YAML frontmatter */}
      {post.frontmatter.breadcrumb_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(post.frontmatter.breadcrumb_schema),
          }}
        />
      )}
      
      <div className="relative isolate overflow-hidden bg-main px-6 py-24 sm:py-32 lg:overflow-visible lg:px-18">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-4xl">
              {/* Blog Title */}
              <h1 className="blog-title h1">
                {post.title}
              </h1>
              
              {/* Blog Subtitle */}
              {subtitle && (
                <div className="blog-subtitle small-grey">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <>{children}</>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="underline hover:opacity-80 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      )
                    }}
                  >
                    {subtitle}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* Blog Intro */}
              {intro && (
                <div className="blog-intro h6">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="underline hover:opacity-80 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      )
                    }}
                  >
                    {intro}
                  </ReactMarkdown>
                </div>
              )}
              
              {/* Blog TLDR */}
              {tldr && (
                <div className="blog-tldr small-blue" style={{ marginTop: '40px' }}>
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <div className="mb-3 last:mb-0">{children}</div>,
                      ul: ({ children }) => <ul className="list-disc list-inside space-y-2">{children}</ul>,
                      li: ({ children }) => <li>{children}</li>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="underline hover:opacity-80 transition-opacity"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      )
                    }}
                  >
                    {tldr}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-center lg:sticky lg:top-4 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:justify-start">
          <Image
            src={sidebarImage} 
            alt={sidebarImageAlt} 
            width={400}
            height={300}
            className="w-full max-w-sm object-cover rounded-lg"
          />
        </div>
      </div>
      </div>
      
      {/* Main Content Section - Centered Layout */}
      <div className="bg-main px-6 py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
          <MarkdownContent content={post.content} />
        </div>
      </div>

      {/* FAQ Section */}
      {faqs && faqs.length > 0 && (
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
            <h2 className="h2">Frequently asked questions</h2>
            <p className="mt-6 max-w-2xl small-grey">
              Have a different question and can&apos;t find the answer you&apos;re looking for? Reach out to our support team by{' '}
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                sending us an email
              </a>{' '}
              and we&apos;ll get back to you as soon as we can.
            </p>
            <div className="mt-20">
              <dl className="space-y-16 sm:grid sm:grid-cols-2 sm:space-y-0 sm:gap-x-6 sm:gap-y-16 lg:grid-cols-3 lg:gap-x-10">
                {faqs.map((faq, index) => (
                  <div key={faq.uniqueId || index}>
                    <dt className="h6">{faq.title}</dt>
                    <dd className="mt-2 small-blue">
                      {faq.frontmatter.summary && typeof faq.frontmatter.summary === 'string'
                        ? faq.frontmatter.summary
                        : 'No summary available'}
                    </dd>
                    <dd className="mt-3">
                      <a 
                        href={`/answers/${faq.slug}`}
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Read more →
                      </a>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      )}
    </>
  );
}