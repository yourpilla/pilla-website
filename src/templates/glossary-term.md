# Glossary Term Page Template

## Raw React Code from Existing Page
*Current glossary [slug] page code - working as-is*

```tsx
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import MarkdownContent from '@/components/MarkdownContent';

interface GlossaryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: GlossaryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const term = getContentBySlug('glossary', slug);
  
  if (!term) {
    return {};
  }

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.title,
    "description": term.meta || term.content.slice(0, 160),
    "inDefinedTermSet": "https://yourpilla.com/glossary",
    "url": `https://yourpilla.com/glossary/${slug}`,
    "inLanguage": "en-GB"
  };

  return {
    title: `${term.title} - Hospitality Glossary`,
    description: term.meta || term.content.slice(0, 160),
    other: {
      'script:ld+json': JSON.stringify(jsonLd)
    }
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

  const synonyms = Array.isArray(term.frontmatter.synonyms) ? term.frontmatter.synonyms as string[] : [];

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    "name": term.title,
    "description": term.meta || term.content.slice(0, 160),
    "inDefinedTermSet": "https://yourpilla.com/glossary",
    "url": `https://yourpilla.com/glossary/${slug}`,
    "inLanguage": "en-GB"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
                  <Link href="/glossary" className="text-blue-600 hover:text-blue-800">
                    Glossary
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li aria-current="page" className="text-gray-600">
                  {term.title}
                </li>
              </ol>
            </nav>
          </div>
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="h1 mb-4 leading-tight">
              {term.title} meaning in hospitality
            </h1>
            {term.meta && (
              <p className="subtitle-lg max-w-2xl mx-auto leading-relaxed">
                {term.meta}
              </p>
            )}
            
            {synonyms && synonyms.length > 0 && (
              <div className="mt-8">
                <p className="text-muted mb-3 font-semibold text-sm">Also known as:</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {synonyms.map((synonym: string, index: number) => (
                    <span 
                      key={index}
                      className="bg-card border-default caption px-4 py-2 rounded-default font-medium"
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-left max-w-3xl mx-auto">
              <MarkdownContent content={term.content} />
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                <h3 className="h3 mb-3 font-semibold">
                  Learn More About Hospitality
                </h3>
                <p className="text-muted mb-6">
                  Explore our comprehensive glossary of hospitality terms and boost your industry knowledge.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/glossary"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    Browse All Terms
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
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
        </div>
      </div>
      </div>
    </>
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

*Note: This page uses dynamic content from the glossary content management system and custom CSS variables for styling. The forms below show the customizable elements of the layout and design system.*

### Background & Layout
- **main_background**: `var(--background)` *(Uses CSS custom property from design system)*
- **container_width**: `max-w-4xl` *[Options: max-w-3xl, max-w-4xl, max-w-5xl]*
- **card_background**: `bg-card` *(Uses design system card background)*
- **card_styling**: `border-default rounded-default shadow-sm` *(Design system utilities)*

### Breadcrumb Navigation
- **breadcrumb_links**: "Home > Glossary > {term.title}" | **typography**: `text-sm`
- **breadcrumb_active_color**: `text-blue-600 hover:text-blue-800` *[Options: text-blue-600, text-indigo-600]*
- **breadcrumb_inactive_color**: `text-gray-600` *[Options: text-gray-600, text-gray-500]*
- **breadcrumb_separator**: "Chevron right icon" | **color**: `text-gray-400`

### Header Section
- **header_background**: `bg-header-group` *(Uses design system header background)*
- **title_format**: "{term.title} meaning in hospitality" | **typography**: `h1 + leading-tight` *(Dynamic from content)*
- **subtitle_source**: `{term.meta}` | **typography**: `text-subtitle` *(Dynamic from content)*
- **subtitle_styling**: `max-w-2xl mx-auto leading-relaxed` | **font_size**: `var(--text-xl)`

### Synonyms Section
- **synonyms_source**: `{term.frontmatter.synonyms}` *(Array from markdown frontmatter)*
- **synonyms_label**: "Also known as:" | **typography**: `text-muted font-semibold` | **font_size**: `var(--text-sm)`
- **synonym_badge_style**: `bg-card border-default rounded-default` | **typography**: `text-sm font-medium`
- **synonyms_layout**: `flex flex-wrap justify-center gap-2` *[Options: flex-wrap, grid]*

### Content Area
- **content_source**: `<MarkdownContent content={term.content} />` *(Dynamic from markdown files)*
- **content_width**: `max-w-3xl mx-auto` *[Options: max-w-2xl, max-w-3xl, max-w-4xl]*
- **content_alignment**: `text-left` *[Options: text-left, text-center, text-justify]*

### Call to Action Section
- **cta_background**: `bg-card border-default rounded-default` *(Design system styling)*
- **cta_title**: "Learn More About Hospitality" | **typography**: `font-semibold` | **font_size**: `var(--text-xl)`
- **cta_description**: "Explore our comprehensive glossary of hospitality terms and boost your industry knowledge." | **typography**: `text-muted`
- **cta_layout**: `flex flex-col sm:flex-row gap-4` *[Options: flex-col, flex-row, grid]*

### CTA Buttons
- **primary_button_text**: "Browse All Terms" | **href**: "/glossary"
- **primary_button_style**: `bg-blue-600 text-white hover:bg-blue-700` *[Options: bg-blue-600, bg-indigo-600]*
- **secondary_button_text**: "Read Our Blog" | **href**: "/blog"
- **secondary_button_style**: `bg-card text-blue-600 border-default hover:bg-blue-50` *[Options: text-blue-600, text-indigo-600]*

### SEO & Structured Data
- **schema_type**: "DefinedTerm" *(Schema.org structured data)*
- **json_ld_context**: "https://schema.org" *(SEO optimization)*
- **term_set_url**: "https://yourpilla.com/glossary" *(Glossary collection)*
- **language**: "en-GB" *(Content language)*
- **metadata_title**: "{term.title} - Hospitality Glossary" *(SEO title format)*

### Technical Configuration
- **content_function**: `getContentBySlug('glossary', slug)` *(Content management integration)*
- **metadata_generation**: `generateMetadata()` *(SEO optimization with JSON-LD)*
- **static_generation**: `generateStaticParams()` *(Performance optimization)*
- **error_handling**: `notFound()` *(404 handling for invalid slugs)*
- **frontmatter_parsing**: `term.frontmatter.synonyms` *(YAML frontmatter support)*

### Design System Integration
- **css_variables**: Uses design system CSS custom properties
  - `var(--background)` - Main background color
  - `var(--text-xl)` - Text size variable
  - `var(--text-sm)` - Small text size
- **utility_classes**: Uses design system utilities
  - `bg-card` - Card background
  - `border-default` - Default border
  - `rounded-default` - Default border radius
  - `text-muted` - Muted text color
  - `text-subtitle` - Subtitle styling
  - `bg-header-group` - Header background

### Layout Structure
- **card_container**: "Single card with sections" | **padding**: `px-8 py-12`
- **header_section**: "Centered with title, subtitle, synonyms"
- **content_section**: "Left-aligned with max-width constraint"
- **cta_section**: "Centered with two-button layout"

---

## Styling Options
- **color_scheme**: "Blue accent theme" *[Options: blue, indigo, gray]*
- **card_style**: "Modern with subtle shadow" *[Options: minimal, modern, elevated]*
- **content_density**: "Spacious with generous padding" *[Options: compact, comfortable, spacious]*

---

## Instructions:
1. The page uses dynamic content from the glossary content management system
2. Term data comes from markdown files with YAML frontmatter for synonyms
3. Structured data (JSON-LD) is automatically generated for SEO
4. The design system uses CSS custom properties for theming
5. Content is rendered using the MarkdownContent component

---

## Final React Component Location
**The processed code is already deployed to:** `/src/app/glossary/[slug]/page.tsx`

*This template file serves as documentation and customization reference for the existing glossary term pages*