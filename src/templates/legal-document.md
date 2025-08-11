# Legal Document Page Template

## Raw React Code Based on Glossary [term] Format
*Legal individual document page code - adapted from glossary term structure*

```tsx
import { getContentBySlug, getAllSlugs } from '@/lib/content';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import MarkdownContent from '@/components/MarkdownContent';

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const legal = getContentBySlug('legal', slug);
  
  if (!legal) {
    return {};
  }

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": legal.title,
    "description": legal.meta || legal.content.slice(0, 160),
    "url": `https://yourpilla.com/legal/${slug}`,
    "inLanguage": "en-GB",
    "publisher": {
      "@type": "Organization",
      "name": "Pilla",
      "url": "https://yourpilla.com"
    }
  };

  return {
    title: `${legal.title} - Pilla Legal`,
    description: legal.meta || legal.content.slice(0, 160),
    other: {
      'script:ld+json': JSON.stringify(jsonLd)
    }
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs('legal');
  return slugs.map((slug) => ({ slug }));
}

export default async function LegalPage({ params }: LegalPageProps) {
  const { slug } = await params;
  const legal = getContentBySlug('legal', slug);

  if (!legal) {
    notFound();
  }

  const lastUpdated = legal.frontmatter.lastUpdated || legal.frontmatter.date;
  const effectiveDate = legal.frontmatter.effectiveDate;

  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": legal.title,
    "description": legal.meta || legal.content.slice(0, 160),
    "url": `https://yourpilla.com/legal/${slug}`,
    "inLanguage": "en-GB",
    "publisher": {
      "@type": "Organization",
      "name": "Pilla",
      "url": "https://yourpilla.com"
    }
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
                  <Link href="/legal" className="text-blue-600 hover:text-blue-800">
                    Legal
                  </Link>
                </li>
                <li>
                  <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </li>
                <li aria-current="page" className="text-gray-600">
                  {legal.title}
                </li>
              </ol>
            </nav>
          </div>
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="mb-4 leading-tight">
              {legal.title}
            </h1>
            {legal.meta && (
              <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
                {legal.meta}
              </p>
            )}
            
            {(lastUpdated || effectiveDate) && (
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted">
                {effectiveDate && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Effective:</strong> {effectiveDate}</span>
                  </div>
                )}
                {lastUpdated && (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                    </svg>
                    <span><strong>Last Updated:</strong> {lastUpdated}</span>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-left max-w-3xl mx-auto">
              <MarkdownContent content={legal.content} />
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                  Questions About Our Policies?
                </h3>
                <p className="text-muted mb-6">
                  If you have any questions about this document or our legal policies, please don't hesitate to contact us.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/legal"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    All Legal Documents
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
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

*Note: This page uses dynamic content from the legal content management system and custom CSS variables for styling. The forms below show the customizable elements of the layout and design system.*

### Background & Layout
- **main_background**: `var(--background)` *(Uses CSS custom property from design system)*
- **container_width**: `max-w-4xl` *[Options: max-w-3xl, max-w-4xl, max-w-5xl]*
- **card_background**: `bg-card` *(Uses design system card background)*
- **card_styling**: `border-default rounded-default shadow-sm` *(Design system utilities)*

### Breadcrumb Navigation
- **breadcrumb_links**: "Home > Legal > {legal.title}" | **typography**: `text-sm`
- **breadcrumb_active_color**: `text-blue-600 hover:text-blue-800` *[Options: text-blue-600, text-indigo-600]*
- **breadcrumb_inactive_color**: `text-gray-600` *[Options: text-gray-600, text-gray-500]*
- **breadcrumb_separator**: "Chevron right icon" | **color**: `text-gray-400`

### Header Section
- **header_background**: `bg-header-group` *(Uses design system header background)*
- **title_source**: `{legal.title}` | **typography**: `h1 + leading-tight` *(Dynamic from content)*
- **subtitle_source**: `{legal.meta}` | **typography**: `text-subtitle` *(Dynamic from content)*
- **subtitle_styling**: `max-w-2xl mx-auto leading-relaxed` | **font_size**: `var(--text-xl)`

### Document Dates Section
- **dates_source**: `{legal.frontmatter}` *(From markdown frontmatter)*
- **effective_date_label**: "Effective:" | **typography**: `text-sm text-muted font-semibold`
- **last_updated_label**: "Last Updated:" | **typography**: `text-sm text-muted font-semibold`
- **date_icons**: "Calendar and refresh icons" | **color**: `text-muted`
- **dates_layout**: `flex flex-col sm:flex-row gap-4` *[Options: flex-col, flex-row, stack]*

### Content Area
- **content_source**: `<MarkdownContent content={legal.content} />` *(Dynamic from markdown files)*
- **content_width**: `max-w-3xl mx-auto` *[Options: max-w-2xl, max-w-3xl, max-w-4xl]*
- **content_alignment**: `text-left` *[Options: text-left, text-center, text-justify]*

### Call to Action Section
- **cta_background**: `bg-card border-default rounded-default` *(Design system styling)*
- **cta_title**: "Questions About Our Policies?" | **typography**: `font-semibold` | **font_size**: `var(--text-xl)`
- **cta_description**: "If you have any questions about this document or our legal policies, please don't hesitate to contact us." | **typography**: `text-muted`
- **cta_layout**: `flex flex-col sm:flex-row gap-4` *[Options: flex-col, flex-row, grid]*

### CTA Buttons
- **primary_button_text**: "All Legal Documents" | **href**: "/legal"
- **primary_button_style**: `bg-blue-600 text-white hover:bg-blue-700` *[Options: bg-blue-600, bg-indigo-600]*
- **secondary_button_text**: "Contact Us" | **href**: "/contact"
- **secondary_button_style**: `bg-card text-blue-600 border-default hover:bg-blue-50` *[Options: text-blue-600, text-indigo-600]*

### SEO & Structured Data
- **schema_type**: "WebPage" *(Schema.org structured data)*
- **json_ld_context**: "https://schema.org" *(SEO optimization)*
- **publisher_info**: "Pilla organization details" *(Company information)*
- **language**: "en-GB" *(Content language)*
- **metadata_title**: "{legal.title} - Pilla Legal" *(SEO title format)*

### Technical Configuration
- **content_function**: `getContentBySlug('legal', slug)` *(Content management integration)*
- **metadata_generation**: `generateMetadata()` *(SEO optimization with JSON-LD)*
- **static_generation**: `generateStaticParams()` *(Performance optimization)*
- **error_handling**: `notFound()` *(404 handling for invalid slugs)*
- **frontmatter_parsing**: `legal.frontmatter.effectiveDate` *(YAML frontmatter support)*

### Design System Integration
- **css_variables**: Uses design system CSS custom properties
  - `var(--background)` - Main background color
  - `var(--text-xl)` - Text size variable
- **utility_classes**: Uses design system utilities
  - `bg-card` - Card background
  - `border-default` - Default border
  - `rounded-default` - Default border radius
  - `text-muted` - Muted text color
  - `text-subtitle` - Subtitle styling
  - `bg-header-group` - Header background

### Layout Structure
- **card_container**: "Single card with sections" | **padding**: `px-8 py-12`
- **header_section**: "Centered with title, subtitle, dates"
- **content_section**: "Left-aligned with max-width constraint"
- **cta_section**: "Centered with two-button layout"

---

## Styling Options
- **color_scheme**: "Blue accent theme" *[Options: blue, indigo, gray]*
- **card_style**: "Modern with subtle shadow" *[Options: minimal, modern, elevated]*
- **content_density**: "Spacious with generous padding" *[Options: compact, comfortable, spacious]*

---

## Instructions:
1. The page uses dynamic content from the legal content management system
2. Legal document data comes from markdown files with YAML frontmatter for dates
3. Structured data (JSON-LD) is automatically generated for SEO
4. The design system uses CSS custom properties for theming
5. Content is rendered using the MarkdownContent component

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/legal/[slug]/page.tsx`

*This template file serves as documentation and customization reference for the existing legal document pages*