# About Page Template

## Raw React Code Based on Glossary [term] Format
*About page code - adapted from glossary term structure*

```tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About Pilla - Hospitality Management Platform',
  description: 'Learn about Pilla, the comprehensive platform designed to streamline hospitality operations, improve staff training, and enhance guest experiences.',
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "name": "About Pilla",
      "description": "Learn about Pilla, the comprehensive platform designed to streamline hospitality operations, improve staff training, and enhance guest experiences.",
      "url": "https://yourpilla.com/about",
      "inLanguage": "en-GB",
      "mainEntity": {
        "@type": "Organization",
        "name": "Pilla",
        "url": "https://yourpilla.com",
        "description": "Comprehensive hospitality management platform for modern businesses"
      }
    })
  }
};

export default function AboutPage() {
  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Pilla",
    "description": "Learn about Pilla, the comprehensive platform designed to streamline hospitality operations, improve staff training, and enhance guest experiences.",
    "url": "https://yourpilla.com/about",
    "inLanguage": "en-GB",
    "mainEntity": {
      "@type": "Organization",
      "name": "Pilla",
      "url": "https://yourpilla.com",
      "description": "Comprehensive hospitality management platform for modern businesses"
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
                <li aria-current="page" className="text-gray-600">
                  About
                </li>
              </ol>
            </nav>
          </div>
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="mb-4 leading-tight">
              About Pilla
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
              Empowering hospitality professionals with comprehensive management tools, expert guidance, and innovative solutions.
            </p>
            
            {/* Key Values */}
            <div className="mt-8">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Innovation
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Excellence
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Community
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Growth
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-left max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2>Our Mission</h2>
                <p>
                  At Pilla, we believe that exceptional hospitality experiences start with empowered teams and streamlined operations. 
                  Our platform is designed to bridge the gap between traditional hospitality management and modern digital solutions, 
                  providing businesses with the tools they need to thrive in today&rsquo;s competitive landscape.
                </p>

                <h2>What We Offer</h2>
                <p>
                  From comprehensive staff training modules to operational efficiency tools, Pilla serves as your complete 
                  hospitality management partner. Our platform combines industry expertise with cutting-edge technology to 
                  deliver solutions that actually work in real-world environments.
                </p>

                <h3>Key Features</h3>
                <ul>
                  <li><strong>Staff Training & Development</strong> - Comprehensive training programs for all hospitality roles</li>
                  <li><strong>Operational Management</strong> - Tools to streamline daily operations and improve efficiency</li>
                  <li><strong>Expert Resources</strong> - Access to industry knowledge, best practices, and compliance guidance</li>
                  <li><strong>Community Support</strong> - Connect with other hospitality professionals and share experiences</li>
                </ul>

                <h2>Why Choose Pilla?</h2>
                <p>
                  Built by hospitality professionals for hospitality professionals, Pilla understands the unique challenges 
                  you face every day. Whether you&rsquo;re managing a boutique hotel, running a restaurant, or overseeing 
                  multiple venues, our platform scales with your needs and grows with your business.
                </p>

                <p>
                  We&rsquo;re committed to continuous improvement and innovation, regularly updating our platform based on 
                  user feedback and industry trends to ensure you always have access to the most current and effective tools.
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                  Ready to Transform Your Operations?
                </h3>
                <p className="text-muted mb-6">
                  Join thousands of hospitality professionals who trust Pilla to streamline their operations and enhance their guest experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get In Touch
                  </Link>
                  <Link
                    href="/blog"
                    className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Learn More
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

*Note: This page uses static content and custom CSS variables for styling. The forms below show the customizable elements of the layout and design system.*

### Background & Layout
- **main_background**: `var(--background)` *(Uses CSS custom property from design system)*
- **container_width**: `max-w-4xl` *[Options: max-w-3xl, max-w-4xl, max-w-5xl]*
- **card_background**: `bg-card` *(Uses design system card background)*
- **card_styling**: `border-default rounded-default shadow-sm` *(Design system utilities)*

### Breadcrumb Navigation
- **breadcrumb_links**: "Home > About" | **typography**: `text-sm`
- **breadcrumb_active_color**: `text-blue-600 hover:text-blue-800` *[Options: text-blue-600, text-indigo-600]*
- **breadcrumb_inactive_color**: `text-gray-600` *[Options: text-gray-600, text-gray-500]*
- **breadcrumb_separator**: "Chevron right icon" | **color**: `text-gray-400`

### Header Section
- **header_background**: `bg-header-group` *(Uses design system header background)*
- **main_title**: "About Pilla" | **typography**: `h1 + leading-tight` *(Auto-applied heading style)*
- **subtitle**: "Empowering hospitality professionals with comprehensive management tools, expert guidance, and innovative solutions." | **typography**: `text-subtitle`
- **subtitle_styling**: `max-w-2xl mx-auto leading-relaxed` | **font_size**: `var(--text-xl)`

### Key Values Section
- **values_badges**: ["Innovation", "Excellence", "Community", "Growth"]
- **badge_styling**: `bg-card border-default text-sm px-4 py-2 rounded-default font-medium`
- **values_layout**: `flex flex-wrap justify-center gap-2` *[Options: flex-wrap, grid, stack]*

### Content Area
- **content_structure**: "Static content with prose styling" *(No dynamic content system)*
- **content_width**: `max-w-3xl mx-auto` *[Options: max-w-2xl, max-w-3xl, max-w-4xl]*
- **content_alignment**: `text-left` *[Options: text-left, text-center, text-justify]*
- **prose_styling**: `prose prose-lg max-w-none` *(Tailwind Typography plugin)*

### Main Content Sections
#### Mission Section
- **mission_title**: "Our Mission" | **typography**: `h2` *(Auto-styled)*
- **mission_content**: "At Pilla, we believe that exceptional hospitality experiences start with empowered teams..." | **typography**: `prose p`

#### What We Offer Section
- **offer_title**: "What We Offer" | **typography**: `h2` *(Auto-styled)*
- **offer_content**: "From comprehensive staff training modules to operational efficiency tools..." | **typography**: `prose p`

#### Key Features Section
- **features_title**: "Key Features" | **typography**: `h3` *(Auto-styled)*
- **features_list**: ["Staff Training & Development", "Operational Management", "Expert Resources", "Community Support"]
- **features_styling**: `prose ul li` *(Auto-styled list items)*

#### Why Choose Section
- **why_title**: "Why Choose Pilla?" | **typography**: `h2` *(Auto-styled)*
- **why_content**: "Built by hospitality professionals for hospitality professionals..." | **typography**: `prose p`

### Call to Action Section
- **cta_background**: `bg-card border-default rounded-default` *(Design system styling)*
- **cta_title**: "Ready to Transform Your Operations?" | **typography**: `font-semibold` | **font_size**: `var(--text-xl)`
- **cta_description**: "Join thousands of hospitality professionals who trust Pilla to streamline their operations..." | **typography**: `text-muted`
- **cta_layout**: `flex flex-col sm:flex-row gap-4` *[Options: flex-col, flex-row, grid]*

### CTA Buttons
- **primary_button_text**: "Get In Touch" | **href**: "/contact"
- **primary_button_icon**: "Email icon" | **style**: `bg-blue-600 text-white hover:bg-blue-700`
- **secondary_button_text**: "Learn More" | **href**: "/blog"
- **secondary_button_icon**: "Book icon" | **style**: `bg-card text-blue-600 border-default hover:bg-blue-50`

### SEO & Structured Data
- **schema_type**: "AboutPage" *(Schema.org structured data)*
- **json_ld_context**: "https://schema.org" *(SEO optimization)*
- **main_entity**: "Organization - Pilla" *(Company information)*
- **language**: "en-GB" *(Content language)*
- **metadata_title**: "About Pilla - Hospitality Management Platform" *(SEO title)*

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
- **header_section**: "Centered with title, subtitle, values badges"
- **content_section**: "Left-aligned with prose styling and max-width constraint"
- **cta_section**: "Centered with two-button layout"

---

## Styling Options
- **color_scheme**: "Blue accent theme" *[Options: blue, indigo, gray]*
- **card_style**: "Modern with subtle shadow" *[Options: minimal, modern, elevated]*
- **content_density**: "Spacious with generous padding" *[Options: compact, comfortable, spacious]*

---

## Instructions:
1. This page uses static content (no dynamic content management system)
2. Content is written directly in JSX with prose styling
3. Structured data (JSON-LD) is included for SEO optimization
4. The design system uses CSS custom properties for theming
5. Layout follows the glossary term pattern but simplified for static content

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/about/page.tsx`

*This template file serves as documentation and customization reference for the about page*