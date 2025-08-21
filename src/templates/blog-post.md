# Blog Post Page Template

## Current React Code (Updated with intro/tldr fields)
*Current blog [slug] page code - working as-is*

```tsx
import { getContentBySlug, getAllSlugs } from '@/lib/content';
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

  return (
    <>
      {/* Schema markup */}
      {post.frontmatter.schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(post.frontmatter.schema),
          }}
        />
      )}
      
      {post.frontmatter.breadcrumb_schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(post.frontmatter.breadcrumb_schema),
          }}
        />
      )}
      
      {/* Top Section - Title, Subtitle, Intro, TLDR + Image */}
      <div className="relative isolate overflow-hidden bg-main px-6 py-24 sm:py-32 lg:overflow-visible lg:px-18">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-4xl">
              {/* Blog Title */}
              <h1 className="blog-title mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {post.title}
              </h1>
              
              {/* Blog Subtitle */}
              {subtitle && (
                <div className="blog-subtitle mt-6 small-grey">
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
                <div className="blog-intro mt-8 text-xl text-gray-700 leading-relaxed font-light">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-4 last:mb-0">{children}</p>,
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          className="text-blue-600 underline hover:text-blue-800 transition-colors"
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
                <div className="blog-tldr mt-8 bg-blue-50 border-l-4 border-blue-400 p-6 rounded-r-lg">
                  <h3 className="tldr-heading text-lg font-semibold text-blue-900 mb-4">TLDR</h3>
                  <div className="tldr-content">
                    <ReactMarkdown
                      components={{
                        p: ({ children }) => <div className="mb-3 last:mb-0 text-blue-800 leading-relaxed">{children}</div>,
                        ul: ({ children }) => <ul className="list-disc list-inside space-y-2 text-blue-800">{children}</ul>,
                        li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            className="text-blue-600 underline hover:text-blue-800 transition-colors"
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
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar Image */}
        <div className="flex justify-center lg:sticky lg:top-4 lg:col-start-3 lg:row-span-2 lg:row-start-1 lg:justify-start">
          <Image
            src={sidebarImage} 
            alt={sidebarImageAlt} 
            width={400}
            height={300}
            className="w-full max-w-sm object-cover rounded-lg"
          />
        </div>
        
        {/* Main Content Section - Full Width */}
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-1 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-4xl text-base/7 text-gray-600">
              <MarkdownContent content={post.content} />
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
```

---

## YAML Frontmatter Structure

### Required Fields:
```yaml
title: "Main heading text"
subtitle: "Author/date info with markdown links"
intro: "Opening summary paragraph(s)"
tldr: "Key bullet points or summary"
sidebar_image: "https://ucarecdn.com/image-url/..."
sidebar_image_alt: "Image description"
meta: "SEO description"
```

### Optional Fields:
```yaml
schema: "JSON-LD structured data"
breadcrumb_schema: "Breadcrumb structured data"
featured: true/false
slug: "url-slug"
```

---

## Typography Classes for CSS Management

### Blog Content Sections:
- **`.blog-title`** - Main heading (H1)
- **`.blog-subtitle`** - Author/date info
- **`.blog-intro`** - Opening summary content  
- **`.blog-tldr`** - TLDR container box
- **`.tldr-heading`** - "TLDR" section header
- **`.tldr-content`** - TLDR content wrapper

### Current Typography Styles:
- **Title**: `.h1` and '<h1>
- **Subtitle**: `.small-grey` (custom class)
- **Intro**: `.h6`
- **TLDR Box**: `.small-blue'
- **TLDR Heading**: `.h6`
- **TLDR Content**: `.small-blue'

---

## Layout Structure

### Top Section (3-Column Grid):
- **Left Column (2/3)**: Title, subtitle, intro, TLDR
- **Right Column (1/3)**: Sidebar image (sticky)
- **Background**: Clean `bg-main` (no patterns)

### Bottom Section (Full Width):
- **Content**: Main markdown content
- **Width**: Full width with proper constraints
- **Typography**: Standard content styling

---

## Content Management Integration

### Dynamic Content Sources:
- **Title**: `{post.title}` from YAML frontmatter
- **Subtitle**: `{post.frontmatter.subtitle}` with ReactMarkdown
- **Intro**: `{post.frontmatter.intro}` with ReactMarkdown  
- **TLDR**: `{post.frontmatter.tldr}` with ReactMarkdown
- **Image**: `{post.frontmatter.sidebar_image}` dynamic from YAML
- **Main Content**: `{post.content}` processed markdown

### Content Processing:
- **ReactMarkdown**: Handles links and formatting in YAML fields
- **MarkdownContent**: Processes main body content
- **Image Optimization**: Next.js Image component with fallbacks
- **Schema**: Automatic JSON-LD injection from YAML

---

## Customization Options

### Typography Adjustments:
```css
.blog-title { /* Adjust main heading */ }
.blog-subtitle { /* Adjust author/date */ }
.blog-intro { /* Adjust intro paragraph */ }
.blog-tldr { /* Adjust TLDR box */ }
.tldr-heading { /* Adjust TLDR heading */ }
.tldr-content { /* Adjust TLDR content */ }
```

### Color Scheme:
- **Primary**: Blue tones (`text-blue-600`, `bg-blue-50`)
- **Text**: Gray scale (`text-gray-700`, `text-gray-900`)
- **Links**: Blue with hover states
- **Background**: Main brand color (`bg-main`)

---

## Instructions:
1. This template reflects the current blog structure with intro/tldr fields
2. All 49 blog posts have been updated with the new YAML structure
3. Typography classes are available for easy styling management
4. The layout uses a two-section approach: intro section + full-width content section

**File Location:** `/src/app/blog/[slug]/page.tsx`