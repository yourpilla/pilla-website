# FAQ Answer Page Template

## Raw React Code Based on Blog [slug] Format
*FAQ individual answer page code - adapted from blog post structure*

```tsx
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';

interface FAQPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: FAQPageProps): Promise<Metadata> {
  const { slug } = await params;
  const faq = getContentBySlug('answers', slug);
  
  if (!faq) {
    return {};
  }

  return {
    title: faq.title,
    description: faq.meta || faq.content.slice(0, 160),
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('answers');
  return slugs.map((slug) => ({ slug }));
}

export default async function FAQPage({ params }: FAQPageProps) {
  const { slug } = await params;
  const faq = getContentBySlug('answers', slug);

  if (!faq) {
    notFound();
  }

  return (
    <div className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute top-0 left-[max(50%,25rem)] h-256 w-512 -translate-x-1/2 mask-[radial-gradient(64rem_64rem_at_top,white,transparent)] stroke-gray-200"
        >
          <defs>
            <pattern
              x="50%"
              y={-1}
              id="e813992c-7d03-4cc4-a2bd-151760b470a0"
              width={200}
              height={200}
              patternUnits="userSpaceOnUse"
            >
              <path d="M100 200V.5M.5 .5H200" fill="none" />
            </pattern>
          </defs>
          <svg x="50%" y={-1} className="overflow-visible fill-gray-50">
            <path
              d="M-100.5 0h201v201h-201Z M699.5 0h201v201h-201Z M499.5 400h201v201h-201Z M-300.5 600h201v201h-201Z"
              strokeWidth={0}
            />
          </svg>
          <rect fill="url(#e813992c-7d03-4cc4-a2bd-151760b470a0)" width="100%" height="100%" strokeWidth={0} />
        </svg>
      </div>
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <h1 className="mt-2 h1">
                {faq.title}
              </h1>
              {faq.frontmatter.subtitle && (
                <p className="mt-6 small-grey">
                  {faq.frontmatter.subtitle}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center text-white">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9Z"/>
              </svg>
              <h3 className="h4 font-semibold mb-1">More Questions?</h3>
              <p className="text-blue-100 text-sm">Browse our complete FAQ collection</p>
            </div>
            <div className="p-4">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format" 
                alt="Hospitality FAQ and support" 
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  View All FAQs
                </button>
                <p className="text-gray-500 text-xs mt-2">Expert hospitality answers</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-gray-600 lg:max-w-lg">
              <MarkdownContent content={faq.content} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## Typography Class Options

### Available Typography Classes:
- **display-1** (64px, 800 weight) - Largest hero text
- **display-2** (56px, 800 weight) - Large hero text  
- **h1-h6** - Standard heading sizes (auto-applied)
- **subtitle** (20px, muted) - Standard subtitle
- **subtitle-lg** (24px, muted) - Large subtitle  
- **subtitle-sm** (18px, muted) - Small subtitle
- **lead** (20px, normal weight) - Introduction paragraphs
- **eyebrow** (14px, uppercase, muted) - Small labels above headings
- **text-muted** - Muted gray color
- **text-sm** - Small text (14px)
- **text-xs** - Extra small text (12px)
- **caption** - Small descriptive text
- **overline** - Tiny uppercase text

---

## Content & Typography Forms

*Note: This page uses dynamic content from the answers content management system. The forms below show the customizable elements of the layout and sidebar.*

### Header Section (Fixed Layout)
- **title_source**: `{faq.title}` | **typography**: `h1 + text-4xl font-semibold` *(Dynamic from content system)*
- **subtitle_source**: `{faq.frontmatter.subtitle}` | **typography**: `small-grey` *(Dynamic from YAML frontmatter)*

### Background Pattern (SVG)
- **background_style**: "Grid pattern with radial gradient mask" | **color**: `stroke-gray-200 fill-gray-50`
- **pattern_id**: "e813992c-7d03-4cc4-a2bd-151760b470a0" *(Keep unique)*
- **enable_background**: `true` *[Options: true, false]*

### Sidebar Card (FAQ Collection)
- **card_title**: "More Questions?" | **typography**: `text-lg font-semibold text-white`
- **card_subtitle**: "Browse our complete FAQ collection" | **typography**: `text-blue-100 text-sm`
- **card_background**: `bg-gradient-to-br from-blue-500 to-blue-700` *[Options: from-blue-500 to-blue-700, from-indigo-500 to-indigo-700]*
- **faq_image**: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format"
- **faq_image_alt**: "Hospitality FAQ and support"
- **cta_button_text**: "View All FAQs" | **typography**: `text-sm font-medium`
- **cta_button_style**: `bg-blue-600 hover:bg-blue-700` *[Options: bg-blue-600, bg-indigo-600]*
- **disclaimer_text**: "Expert hospitality answers" | **typography**: `text-gray-500 text-xs`

### Main Content Area
- **content_source**: `<MarkdownContent content={faq.content} />` *(Dynamic from markdown files)*
- **content_width**: `max-w-xl lg:max-w-lg` *[Options: max-w-lg, max-w-xl, max-w-2xl]*
- **text_color**: `text-base text-gray-600` *[Options: text-gray-600, text-gray-700, text-gray-800]*


### Technical Configuration
- **content_function**: `getContentBySlug('answers', slug)` *(Content management integration)*
- **metadata_generation**: `generateMetadata()` *(SEO optimization)*
- **static_generation**: `generateStaticParams()` *(Performance optimization)*
- **error_handling**: `notFound()` *(404 handling for invalid slugs)*

### Layout Structure
- **grid_system**: "2-column responsive grid with sidebar" | **breakpoint**: `lg:grid-cols-2`
- **sidebar_position**: "Sticky on large screens" | **behavior**: `lg:sticky lg:top-4`
- **content_flow**: "Header spans full width, sidebar and content in columns"

### Styling Options
- **background**: `bg-white` *[Options: bg-white, bg-main, bg-gray-50]*
- **content_width**: `max-w-7xl` *[Options: max-w-6xl, max-w-7xl, max-w-full]*
- **text_color**: `text-gray-600` *[Options: text-gray-600, text-gray-700, text-gray-800]*
- **accent_color**: `text-blue-600` *[Options: text-blue-600, text-indigo-600]*

---

## Instructions:
1. The page uses dynamic content from the answers content management system
2. FAQ content comes from markdown files via `getContentBySlug('answers', slug)`
3. The layout mirrors the blog [slug] page but with FAQ-specific messaging
4. Sidebar promotes the FAQ collection instead of app demo
5. Features highlight answer quality and expertise

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/answers/[slug]/page.tsx`

*This template file remains as a working document with original code and forms for reference*