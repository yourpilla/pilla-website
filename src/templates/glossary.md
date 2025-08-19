# Glossary Pillar Page Template

## YAML Frontmatter Forms

### SEO & Meta Data
- **title**: "Hospitality Glossary - Terms & Definitions | Pilla" | *Page title for SEO and browser tab*
- **slug**: "glossary" | *URL slug for the page*
- **meta**: "Comprehensive glossary of hospitality industry terms and definitions. From chef roles to restaurant operations - learn the language of hospitality with Pilla." | *Meta description for search engines (150-160 characters)*
- **seo_title**: "Complete Hospitality Glossary - Industry Terms & Definitions" | *SEO optimized title tag*
- **unique_id**: "glossary-pillar-2025" | *Unique identifier for this page*
- **featured**: true | *Whether this page should be featured*
- **category**: "Glossary" | *Page category*

### Navigation & Breadcrumbs
- **breadcrumb_short**: "Glossary" | *Short text for breadcrumb navigation*
- **pillar_text**: "Resources" | *Parent section name*
- **pillar_link**: "https://yourpilla.com" | *Link to parent section*

### Structured Data (JSON-LD Schema)
- **glossary_schema**: | *Schema.org DefinedTermSet markup*
```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTermSet",
  "name": "Hospitality Industry Glossary",
  "description": "Comprehensive collection of hospitality industry terms and definitions",
  "url": "https://yourpilla.com/glossary",
  "inLanguage": "en-GB",
  "publisher": {
    "@type": "Organization",
    "name": "Pilla",
    "url": "https://yourpilla.com"
  }
}
```

- **breadcrumb_schema**: | *Schema.org BreadcrumbList markup*
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourpilla.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Glossary",
      "item": "https://yourpilla.com/glossary"
    }
  ]
}
```

---

## Raw React Code from Existing Page
*Current glossary page code - working as-is*

```tsx
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
            <h1 className="display-1 tracking-tight text-gray-900">
              Hospitality Glossary
            </h1>
            <p className="mt-6 max-w-3xl mx-auto lead text-muted">
              Your comprehensive guide to hospitality industry terminology. From front-of-house operations 
              to back-office management, find clear definitions for every role and concept.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex items-center px-4 py-2 border border-transparent small-medium rounded-md text-blue-600 bg-blue-100">
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
            <h3 className="large-medium text-gray-900 mb-2">No glossary terms found</h3>
            <p className="text-muted">Terms will appear here once they are added to the content directory.</p>
          </div>
        ) : (
          letters.map((letter) => (
            <section key={letter} id={letter} className="mb-16">
              <div className="flex items-center mb-8">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white text-2xl font-bold rounded-lg mr-4">
                  {letter}
                </div>
                <div>
                  <h2 className="subtitle text-gray-900">
                    {letter}
                  </h2>
                  <p className="text-muted">
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
                    <h3 className="large-medium text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      <Link 
                        href={`/glossary/${term.slug}`}
                        className="block"
                      >
                        {term.title}
                      </Link>
                    </h3>
                    {term.meta && (
                      <p className="text-muted text-sm leading-relaxed line-clamp-3">
                        {term.meta}
                      </p>
                    )}
                    <div className="mt-4 flex items-center text-blue-600 small-medium opacity-0 group-hover:opacity-100 transition-opacity">
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

*Note: This page uses dynamic content from the glossary content management system. The forms below show the customizable elements of the layout and styling.*

### Header Section
- **background_gradient**: `bg-gradient-to-br from-blue-50 via-white to-indigo-50` *[Options: from-blue-50 via-white to-indigo-50, bg-main, bg-gray-50]*
- **icon_container**: `bg-blue-100` *[Options: bg-blue-100, bg-indigo-100, bg-gray-100]*
- **icon_color**: `text-blue-600` *[Options: text-blue-600, text-indigo-600, text-gray-600]*
- **page_title**: "Hospitality Glossary" | **typography**: `h1 + display-1` *[Options: h1 + display-1, h1 + display-2, h1]*
- **page_subtitle**: "Your comprehensive guide to hospitality industry terminology. From front-of-house operations to back-office management, find clear definitions for every role and concept." | **typography**: `lead text-muted` *[Options: lead, subtitle, subtitle-lg]*
- **terms_counter_bg**: `bg-blue-100` *[Options: bg-blue-100, bg-indigo-100, bg-gray-100]*
- **terms_counter_text**: `text-blue-600` *[Options: text-blue-600, text-indigo-600, text-gray-600]*
- **terms_counter_label**: "Terms Available" | **typography**: `small-medium`

### Alphabetical Navigation
- **navigation_position**: `sticky top-0` *[Options: sticky top-0, relative, fixed top-0]*
- **navigation_background**: `bg-white border-b border-gray-200 shadow-sm` *[Options: bg-white, bg-gray-50, bg-blue-50]*
- **active_letter_style**: `bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800` *[Options: bg-blue-50 text-blue-700, bg-indigo-50 text-indigo-700]*
- **inactive_letter_style**: `bg-gray-50 text-gray-300` *[Options: bg-gray-50 text-gray-300, bg-gray-100 text-gray-400]*
- **letter_size**: `w-10 h-10` *[Options: w-8 h-8, w-10 h-10, w-12 h-12]*

### Content Grid
- **grid_layout**: `md:grid-cols-2 lg:grid-cols-3` *[Options: md:grid-cols-2 lg:grid-cols-3, md:grid-cols-1 lg:grid-cols-2, grid-cols-1]*
- **card_background**: `bg-white` *[Options: bg-white, bg-gray-50]*
- **card_border**: `border-gray-200 hover:border-blue-300` *[Options: border-gray-200 hover:border-blue-300, border-gray-300 hover:border-indigo-300]*
- **card_hover_shadow**: `hover:shadow-lg` *[Options: hover:shadow-lg, hover:shadow-md, hover:shadow-xl]*

### Letter Section Headers
- **letter_badge_bg**: `bg-blue-600` *[Options: bg-blue-600, bg-indigo-600, bg-gray-600]*
- **letter_badge_text**: `text-white` *[Options: text-white]*
- **section_title**: **typography**: `h2 + subtitle` *[Options: subtitle, h2, display-2]*
- **term_count**: **typography**: `text-muted` *[Options: text-muted, caption]*

### Term Cards
- **term_title**: **typography**: `large-medium text-gray-900` *[Options: large-medium, subtitle, h3]*
- **term_title_hover**: `group-hover:text-blue-600` *[Options: group-hover:text-blue-600, group-hover:text-indigo-600]*
- **term_description**: **typography**: `text-muted text-sm` *[Options: text-sm, caption]*
- **learn_more_color**: `text-blue-600` *[Options: text-blue-600, text-indigo-600]*

### Empty State
- **empty_icon_color**: `text-gray-400` *[Options: text-gray-400, text-gray-300]*
- **empty_title**: "No glossary terms found" | **typography**: `large-medium text-gray-900`
- **empty_description**: "Terms will appear here once they are added to the content directory." | **typography**: `text-muted`

### Technical Configuration
- **content_function**: `getContentByCategory('glossary')` *(Content management integration)*
- **sorting**: `sort((a, b) => a.title.localeCompare(b.title))` *(Alphabetical sorting)*
- **grouping**: "Group terms by first letter" *(Automatic alphabetical grouping)*
- **navigation_generation**: "Generate A-Z letters automatically" *(26 letter navigation)*

### Layout Structure
- **container_width**: `max-w-7xl` *[Options: max-w-6xl, max-w-7xl, max-w-full]*
- **section_spacing**: `mb-16` *[Options: mb-12, mb-16, mb-20]*
- **card_spacing**: `gap-6` *[Options: gap-4, gap-6, gap-8]*

---

## Styling Options
- **main_background**: `bg-white` *[Options: bg-white, bg-main, bg-gray-50]*
- **accent_color**: `blue` *[Options: blue, indigo, gray]*
- **card_style**: "Rounded with border and hover effects" *[Options: rounded, square, minimal]*

---

## Instructions:
1. The page uses dynamic content from the glossary content management system
2. Terms are automatically sorted alphabetically and grouped by first letter
3. Navigation is generated automatically for all 26 letters
4. Customize the styling and layout options using the forms above
5. The content comes from markdown files via `getContentByCategory('glossary')`

---

## Final React Component Location
**The processed code is already deployed to:** `/src/app/glossary/page.tsx`

*This template file serves as documentation and customization reference for the existing glossary page*