# Blog Post Page Template

## Raw React Code from Existing Page
*Current blog [slug] page code - working as-is*

```tsx
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';
import MarkdownContent from '@/components/MarkdownContent';

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
              <p className="eyebrow brand">Hospitality Guide</p>
              <h1 className="mt-2 display-2 tracking-tight text-pretty text-gray-900">
                {post.title}
              </h1>
              {post.meta && (
                <p className="mt-6 subtitle text-muted">
                  {post.meta}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="-mt-12 -ml-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          <div className="w-full max-w-md rounded-xl bg-white shadow-xl ring-1 ring-gray-200 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 text-center text-white">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-90" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                <polyline points="14,2 14,8 20,8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10,9 9,9 8,9"/>
              </svg>
              <h3 className="large-medium mb-1">Pilla App Demo</h3>
              <p className="text-blue-100 text-sm">See our hospitality management platform in action</p>
            </div>
            <div className="p-4">
              <Image
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format" 
                alt="Restaurant management dashboard demo" 
                width={400}
                height={192}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-center">
                <button className="btn bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Try Free Demo
                </button>
                <p className="text-muted caption mt-2">No credit card required</p>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="max-w-xl text-base text-muted lg:max-w-lg">
              <MarkdownContent content={post.content} />
              
              <ul role="list" className="mt-8 space-y-8 text-muted">
                <li className="flex gap-x-3">
                  <svg className="w-5 h-5 mt-1 flex-none text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                  </svg>
                  <span>
                    <strong className="font-semibold text-gray-900">Data-driven insights.</strong> Our content is backed by industry research and real-world hospitality experience.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="w-5 h-5 mt-1 flex-none text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                  <span>
                    <strong className="font-semibold text-gray-900">Team focused.</strong> Practical advice for managing hospitality teams and operations effectively.
                  </span>
                </li>
                <li className="flex gap-x-3">
                  <svg className="w-5 h-5 mt-1 flex-none text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/>
                    <polyline points="14,2 14,8 20,8"/>
                  </svg>
                  <span>
                    <strong className="font-semibold text-gray-900">Ready-to-use templates.</strong> Download and customize our templates for immediate implementation.
                  </span>
                </li>
              </ul>
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

*Note: This page uses dynamic content from markdown files via the content management system. The forms below show the customizable elements of the layout and sidebar.*

### Header Section (Fixed Layout)
- **category_label**: "Hospitality Guide" | **typography**: `eyebrow brand` *[Options: text-blue-600, text-indigo-600, text-gray-600]*
- **title_source**: `{post.title}` | **typography**: `h1 + display-2` *(Dynamic from content system)*
- **subtitle_source**: `{post.meta}` | **typography**: `subtitle text-muted` *(Dynamic from content system)*

### Background Pattern (SVG)
- **background_style**: "Grid pattern with radial gradient mask" | **color**: `stroke-gray-200 fill-gray-50`
- **pattern_id**: "e813992c-7d03-4cc4-a2bd-151760b470a0" *(Keep unique)*
- **enable_background**: `true` *[Options: true, false]*

### Sidebar Card (Pilla App Demo)
- **card_title**: "Pilla App Demo" | **typography**: `large-medium text-white`
- **card_subtitle**: "See our hospitality management platform in action" | **typography**: `text-blue-100 text-sm`
- **card_background**: `bg-gradient-to-br from-blue-500 to-blue-700` *[Options: from-blue-500 to-blue-700, from-indigo-500 to-indigo-700]*
- **demo_image**: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format"
- **demo_image_alt**: "Restaurant management dashboard demo"
- **cta_button_text**: "Try Free Demo" | **typography**: `btn`
- **cta_button_style**: `bg-blue-600 hover:bg-blue-700` *[Options: bg-blue-600, bg-indigo-600]*
- **disclaimer_text**: "No credit card required" | **typography**: `text-muted caption`

### Main Content Area
- **content_source**: `<MarkdownContent content={post.content} />` *(Dynamic from markdown files)*
- **content_width**: `max-w-xl lg:max-w-lg` *[Options: max-w-lg, max-w-xl, max-w-2xl]*
- **text_color**: `text-base text-muted` *[Options: text-gray-600, text-gray-700, text-gray-800]*

### Key Features List (Fixed Content)
- **list_title**: "Why Choose Our Content" *(Implied by context)*
- **feature_1_icon**: "Dashboard/Analytics Icon" | **color**: `text-blue-600`
- **feature_1_title**: "Data-driven insights." | **typography**: `font-semibold text-gray-900`
- **feature_1_description**: "Our content is backed by industry research and real-world hospitality experience." | **typography**: `span`

- **feature_2_icon**: "User/Team Icon" | **color**: `text-blue-600`
- **feature_2_title**: "Team focused." | **typography**: `font-semibold text-gray-900`
- **feature_2_description**: "Practical advice for managing hospitality teams and operations effectively." | **typography**: `span`

- **feature_3_icon**: "Document/Template Icon" | **color**: `text-blue-600`
- **feature_3_title**: "Ready-to-use templates." | **typography**: `font-semibold text-gray-900`
- **feature_3_description**: "Download and customize our templates for immediate implementation." | **typography**: `span`

### Technical Configuration
- **content_function**: `getContentBySlug('blog', slug)` *(Content management integration)*
- **metadata_generation**: `generateMetadata()` *(SEO optimization)*
- **static_generation**: `generateStaticParams()` *(Performance optimization)*
- **error_handling**: `notFound()` *(404 handling for invalid slugs)*

### Layout Structure
- **grid_system**: "2-column responsive grid with sidebar" | **breakpoint**: `lg:grid-cols-2`
- **sidebar_position**: "Sticky on large screens" | **behavior**: `lg:sticky lg:top-4`
- **content_flow**: "Header spans full width, sidebar and content in columns"

### Styling Options
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **content_width**: `max-w-3xl` *[Options: max-w-2xl, max-w-3xl, max-w-4xl]*
- **text_color**: `text-gray-700` *[Options: text-gray-700, text-gray-800, text-gray-900]*
- **accent_color**: `text-indigo-600` *[Options: text-indigo-600, text-blue-600, text-gray-600]*

---

## Instructions:
1. Paste your raw Tailwind Plus blog post/article code above
2. I'll analyze it and create content + typography forms
3. You'll fill out the forms with your hospitality content
4. I'll generate the final blog post component for the [slug] route

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/blog/[slug]/page.tsx`

*This template file remains as a working document with original code and forms for reference*