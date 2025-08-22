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
    </>
  );
}
```
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/20/solid'

export default function Example() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base/7 text-gray-700">
        <p className="text-base/7 font-semibold text-indigo-600">Introducing</p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
          JavaScript for beginners
        </h1>
        <p className="mt-6 text-xl/8">
          Aliquet nec orci mattis amet quisque ullamcorper neque, nibh sem. At arcu, sit dui mi, nibh dui, diam eget
          aliquam. Quisque id at vitae feugiat egestas ac. Diam nulla orci at in viverra scelerisque eget. Eleifend
          egestas fringilla sapien.
        </p>
        <div className="mt-10 max-w-2xl text-gray-600">
          <p>
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id.
          </p>
          <ul role="list" className="mt-8 max-w-xl space-y-8 text-gray-600">
            <li className="flex gap-x-3">
              <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Data types.</strong> Lorem ipsum, dolor sit amet
                consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate
                blanditiis ratione.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Loops.</strong> Anim aute id magna aliqua ad ad non
                deserunt sunt. Qui irure qui lorem cupidatat commodo.
              </span>
            </li>
            <li className="flex gap-x-3">
              <CheckCircleIcon aria-hidden="true" className="mt-1 size-5 flex-none text-indigo-600" />
              <span>
                <strong className="font-semibold text-gray-900">Events.</strong> Ac tincidunt sapien vehicula erat
                auctor pellentesque rhoncus. Et magna sit morbi lobortis.
              </span>
            </li>
          </ul>
          <p className="mt-8">
            Et vitae blandit facilisi magna lacus commodo. Vitae sapien duis odio id et. Id blandit molestie auctor
            fermentum dignissim. Lacus diam tincidunt ac cursus in vel. Mauris varius vulputate et ultrices hac
            adipiscing egestas. Iaculis convallis ac tempor et ut. Ac lorem vel integer orci.
          </p>
          <h2 className="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            From beginner to expert in 3 hours
          </h2>
          <p className="mt-6">
            Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. Convallis arcu ipsum urna nibh.
            Pharetra, euismod vitae interdum mauris enim, consequat vulputate nibh. Maecenas pellentesque id sed tellus
            mauris, ultrices mauris. Tincidunt enim cursus ridiculus mi. Pellentesque nam sed nullam sed diam turpis
            ipsum eu a sed convallis diam.
          </p>
          <figure className="mt-10 border-l border-indigo-600 pl-9">
            <blockquote className="font-semibold text-gray-900">
              <p>
                "Vel ultricies morbi odio facilisi ultrices accumsan donec lacus purus. Lectus nibh ullamcorper ac
                dictum justo in euismod. Risus aenean ut elit massa. In amet aliquet eget cras. Sem volutpat enim
                tristique."
              </p>
            </blockquote>
            <figcaption className="mt-6 flex gap-x-4">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="size-6 flex-none rounded-full bg-gray-50"
              />
              <div className="text-sm/6">
                <strong className="font-semibold text-gray-900">Maria Hill</strong> – Marketing Manager
              </div>
            </figcaption>
          </figure>
          <p className="mt-10">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p>
        </div>
        <figure className="mt-16">
          <img
            alt=""
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3"
            className="aspect-video rounded-xl bg-gray-50 object-cover"
          />
          <figcaption className="mt-4 flex gap-x-2 text-sm/6 text-gray-500">
            <InformationCircleIcon aria-hidden="true" className="mt-0.5 size-5 flex-none text-gray-300" />
            Faucibus commodo massa rhoncus, volutpat.
          </figcaption>
        </figure>
        <div className="mt-16 max-w-2xl text-gray-600">
          <h2 className="text-3xl font-semibold tracking-tight text-pretty text-gray-900">
            Everything you need to get up and running
          </h2>
          <p className="mt-6">
            Purus morbi dignissim senectus mattis adipiscing. Amet, massa quam varius orci dapibus volutpat cras. In
            amet eu ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut viverra ridiculus non molestie.
            Gravida quis fringilla amet eget dui tempor dignissim. Facilisis auctor venenatis varius nunc, congue erat
            ac. Cras fermentum convallis quam.
          </p>
          <p className="mt-8">
            Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae
            sed turpis id. Id dolor praesent donec est. Odio penatibus risus viverra tellus varius sit neque erat velit.
          </p>
        </div>
      </div>
    </div>
  )
}

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

### Current Typography Styles:
- **Title**: `.h1` class
- **Subtitle**: `.small-grey` (custom class)
- **Intro**: `.h6` (custom class)
- **TLDR Content**: `.small-blue` (custom class, no heading)

### Main Content Section Styles:
- **Main Content Container**: `bg-main px-6 py-32 lg:px-8`
- **Content Wrapper**: `mx-auto max-w-3xl text-base/7 text-gray-700`

---

## Layout Structure

### Top Section (3-Column Grid):
- **Left Column (2/3)**: Title, subtitle, intro, TLDR
- **Right Column (1/3)**: Sidebar image (sticky)
- **Background**: Clean `bg-main` (no patterns)
- **Container**: `relative isolate overflow-hidden bg-main px-6 py-24 sm:py-32 lg:overflow-visible lg:px-18`

### Bottom Section (Centered Content):
- **Content**: Main markdown content from `.md` file body
- **Layout**: Centered with `max-w-3xl` constraint
- **Background**: Clean `bg-main`
- **Container**: `bg-main px-6 py-32 lg:px-8`
- **Typography**: `text-base/7 text-gray-700`

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
```

### Layout Customization Variables:

#### Top Section (Header):
- **Background**: `bg-main` → change to any background class
- **Padding**: `px-6 py-24 sm:py-32 lg:px-18` → adjust spacing
- **Grid**: `grid-cols-3` → change column layout
- **Content Width**: `max-w-7xl` and `lg:max-w-4xl` → adjust max widths

#### Bottom Section (Main Content):
- **Background**: `bg-main` → change content background
- **Padding**: `px-6 py-32 lg:px-8` → adjust vertical/horizontal spacing
- **Content Width**: `max-w-3xl` → adjust reading width
- **Typography**: `text-base/7 text-gray-700` → adjust font size and color

#### Sidebar Image:
- **Sticky Position**: `lg:sticky lg:top-4` → adjust stickiness
- **Image Size**: `w-full max-w-sm` → change image constraints
- **Border Radius**: `rounded-lg` → adjust corner rounding

### Color Scheme:
- **Header Background**: `bg-main` (brand color)
- **Content Background**: `bg-main` (matches header)
- **Text**: Gray scale (`text-gray-700`, `text-gray-900`)  
- **Links**: Underline with opacity hover states

---

## Instructions:
1. This template reflects the current blog structure with intro/tldr fields
2. All 49 blog posts have been updated with the new YAML structure
3. Typography classes are available for easy styling management
4. The layout uses a two-section approach: intro section + full-width content section

**File Location:** `/src/app/blog/[slug]/page.tsx`