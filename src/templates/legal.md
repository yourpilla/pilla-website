# Legal Pillar Page Template

## YAML Frontmatter Forms

### SEO & Meta Data
- **title**: "Legal Documents & Policies | Pilla" | *Page title for SEO and browser tab*
- **slug**: "legal" | *URL slug for the page*
- **meta**: "Pilla's legal documents including privacy policy, terms of service, and data protection policies. Transparent legal information for our users." | *Meta description for search engines (150-160 characters)*
- **seo_title**: "Legal Documents & Privacy Policies - Pilla" | *SEO optimized title tag*
- **unique_id**: "legal-pillar-2025" | *Unique identifier for this page*
- **featured**: false | *Whether this page should be featured*
- **category**: "Legal" | *Page category*

### Navigation & Breadcrumbs
- **breadcrumb_short**: "Legal" | *Short text for breadcrumb navigation*
- **pillar_text**: "Company" | *Parent section name*
- **pillar_link**: "https://yourpilla.com" | *Link to parent section*

### Structured Data (JSON-LD Schema)
- **legal_schema**: | *Schema.org WebPage markup*
```json
{
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Legal Documents",
  "description": "Legal documents and policies for Pilla hospitality management software",
  "url": "https://yourpilla.com/legal",
  "inLanguage": "en-GB",
  "isPartOf": {
    "@type": "WebSite",
    "name": "Pilla",
    "url": "https://yourpilla.com"
  },
  "about": {
    "@type": "Thing",
    "name": "Legal Information"
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
      "name": "Legal",
      "item": "https://yourpilla.com/legal"
    }
  ]
}
```

---

## Raw React Code from Tailwind
*Paste your Tailwind Plus legal sections here*

const legalPages = [
  {
    id: 1,
    title: 'Privacy Policy',
    href: '/legal/privacy-policy',
    description:
      'Learn how we collect, use, and protect your personal information when you use our hospitality resources and services.',
    date: 'Nov 15, 2024',
    datetime: '2024-11-15',
    category: { title: 'Privacy', href: '/legal?category=privacy' },
    author: {
      name: 'Legal Team',
      role: 'Pilla Legal Department',
      href: '/legal?author=legal-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Terms of Service',
    href: '/legal/terms-of-service',
    description: 'Understand the terms and conditions that govern your use of our hospitality platform, resources, and community features.',
    date: 'Nov 12, 2024',
    datetime: '2024-11-12',
    category: { title: 'Terms', href: '/legal?category=terms' },
    author: {
      name: 'Legal Team',
      role: 'Pilla Legal Department',
      href: '/legal?author=legal-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Cookie Policy',
    href: '/legal/cookie-policy',
    description:
      'Information about how we use cookies and similar technologies to improve your experience on our hospitality platform.',
    date: 'Nov 10, 2024',
    datetime: '2024-11-10',
    category: { title: 'Privacy', href: '/legal?category=privacy' },
    author: {
      name: 'Legal Team',
      role: 'Pilla Legal Department',
      href: '/legal?author=legal-team',
      imageUrl:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
]

export default function LegalPage() {
  return (
    <div className="bg-main py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="h2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">Legal Information</h2>
          <p className="mt-2 lead">Important legal documents and policies that govern your use of our hospitality platform and services.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {legalPages.map((page) => (
            <article key={page.id} className="flex max-w-xl flex-col items-start justify-between">
              <div className="flex items-center gap-x-4 text-xs">
                <time dateTime={page.datetime} className="text-muted">
                  {page.date}
                </time>
                <a
                  href={page.category.href}
                  className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                >
                  {page.category.title}
                </a>
              </div>
              <div className="group relative grow">
                <h3 className="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600">
                  <a href={page.href}>
                    <span className="absolute inset-0" />
                    {page.title}
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-muted">{page.description}</p>
              </div>
              <div className="relative mt-8 flex items-center gap-x-4 justify-self-end">
                <img alt="" src={page.author.imageUrl} className="size-10 rounded-full bg-gray-50" />
                <div className="text-sm/6">
                  <p className="font-semibold text-gray-900">
                    <a href={page.author.href}>
                      <span className="absolute inset-0" />
                      {page.author.name}
                    </a>
                  </p>
                  <p className="text-muted">{page.author.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}

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

### Header Section
- **main_title**: "Legal Information" | **typography**: `h2 + text-4xl font-semibold` *[Options: h2 + text-4xl, h2 + display-2, text-5xl]*
- **subtitle**: "Important legal documents and policies that govern your use of our hospitality platform and services." | **typography**: `lead` *[Options: lead, text-lg, subtitle-lg]*

### Legal Pages Array (3 documents for now)
#### Page 1
- **page_1_title**: "Privacy Policy" | **typography**: `font-semibold`
- **page_1_href**: "/legal/privacy-policy"
- **page_1_description**: "Learn how we collect, use, and protect your personal information when you use our hospitality resources and services." | **typography**: `text-sm text-muted`
- **page_1_date**: "Nov 15, 2024" | **page_1_datetime**: "2024-11-15"
- **page_1_category_title**: "Privacy" | **typography**: `font-medium`
- **page_1_category_href**: "/legal?category=privacy"
- **page_1_author_name**: "Legal Team" | **typography**: `font-semibold`
- **page_1_author_role**: "Pilla Legal Department" | **typography**: `text-muted`
- **page_1_author_href**: "/legal?author=legal-team"
- **page_1_author_image**: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

#### Page 2
- **page_2_title**: "Terms of Service" | **typography**: `font-semibold`
- **page_2_href**: "/legal/terms-of-service"
- **page_2_description**: "Understand the terms and conditions that govern your use of our hospitality platform, resources, and community features." | **typography**: `text-sm text-muted`
- **page_2_date**: "Nov 12, 2024" | **page_2_datetime**: "2024-11-12"
- **page_2_category_title**: "Terms" | **typography**: `font-medium`
- **page_2_category_href**: "/legal?category=terms"
- **page_2_author_name**: "Legal Team" | **typography**: `font-semibold`
- **page_2_author_role**: "Pilla Legal Department" | **typography**: `text-muted`
- **page_2_author_href**: "/legal?author=legal-team"
- **page_2_author_image**: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

#### Page 3
- **page_3_title**: "Cookie Policy" | **typography**: `font-semibold`
- **page_3_href**: "/legal/cookie-policy"
- **page_3_description**: "Information about how we use cookies and similar technologies to improve your experience on our hospitality platform." | **typography**: `text-sm text-muted`
- **page_3_date**: "Nov 10, 2024" | **page_3_datetime**: "2024-11-10"
- **page_3_category_title**: "Privacy" | **typography**: `font-medium`
- **page_3_category_href**: "/legal?category=privacy"
- **page_3_author_name**: "Legal Team" | **typography**: `font-semibold`
- **page_3_author_role**: "Pilla Legal Department" | **typography**: `text-muted`
- **page_3_author_href**: "/legal?author=legal-team"
- **page_3_author_image**: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"

### Additional Legal Documents (Optional)
#### Page 4
- **page_4_title**: "Data Processing Agreement" | **typography**: `font-semibold`
- **page_4_href**: "/legal/data-processing-agreement"
- **page_4_description**: "GDPR-compliant data processing terms for hospitality businesses using our platform and services." | **typography**: `text-sm text-muted`
- **page_4_category**: "Privacy"

#### Page 5
- **page_5_title**: "Acceptable Use Policy" | **typography**: `font-semibold`
- **page_5_href**: "/legal/acceptable-use-policy"
- **page_5_description**: "Guidelines for appropriate and responsible use of our hospitality community and resources." | **typography**: `text-sm text-muted`
- **page_5_category**: "Terms"

#### Page 6
- **page_6_title**: "Content License" | **typography**: `font-semibold`
- **page_6_href**: "/legal/content-license"
- **page_6_description**: "Licensing terms for using our hospitality content, templates, and educational materials in your business." | **typography**: `text-sm text-muted`
- **page_6_category**: "Licensing"

### Styling Options
- **background**: `bg-main` *[Options: bg-main, bg-white, bg-gray-50]*
- **card_background**: `bg-white` *[Options: bg-white, bg-gray-50]*
- **category_badge_style**: `bg-gray-50 text-gray-600` *[Options: bg-gray-50 text-gray-600, bg-blue-50 text-blue-600]*
- **layout**: `3-column grid` *[Options: 3-column grid, 2-column grid, list view]*

---

## Instructions:
1. Paste your raw Tailwind Plus legal page code above
2. I'll analyze it and create content + typography forms
3. You'll fill out the forms with your legal document information
4. I'll generate the final legal pillar page component

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/legal/page.tsx`

*This template file remains as a working document with original code and forms for reference*