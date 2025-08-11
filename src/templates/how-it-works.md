# How It Works Page Template

## Raw React Code Based on Glossary [term] Format
*How it works page code - adapted from glossary term structure*

```tsx
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How Pilla Works - Hospitality Management Platform',
  description: 'Discover how Pilla streamlines hospitality operations through intuitive tools, comprehensive training, and expert support designed for modern hospitality businesses.',
  other: {
    'script:ld+json': JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How Pilla Works",
      "description": "Discover how Pilla streamlines hospitality operations through intuitive tools, comprehensive training, and expert support designed for modern hospitality businesses.",
      "url": "https://yourpilla.com/how-it-works",
      "inLanguage": "en-GB",
      "step": [
        {
          "@type": "HowToStep",
          "name": "Sign Up & Setup",
          "text": "Create your account and customize your workspace to match your business needs."
        },
        {
          "@type": "HowToStep",
          "name": "Train Your Team",
          "text": "Access comprehensive training modules designed for all hospitality roles."
        },
        {
          "@type": "HowToStep",
          "name": "Streamline Operations",
          "text": "Use our management tools to optimize daily operations and improve efficiency."
        },
        {
          "@type": "HowToStep",
          "name": "Monitor & Improve",
          "text": "Track performance metrics and continuously enhance your service quality."
        }
      ]
    })
  }
};

export default function HowItWorksPage() {
  // Create JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Pilla Works",
    "description": "Discover how Pilla streamlines hospitality operations through intuitive tools, comprehensive training, and expert support designed for modern hospitality businesses.",
    "url": "https://yourpilla.com/how-it-works",
    "inLanguage": "en-GB",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Sign Up & Setup",
        "text": "Create your account and customize your workspace to match your business needs."
      },
      {
        "@type": "HowToStep",
        "name": "Train Your Team",
        "text": "Access comprehensive training modules designed for all hospitality roles."
      },
      {
        "@type": "HowToStep",
        "name": "Streamline Operations",
        "text": "Use our management tools to optimize daily operations and improve efficiency."
      },
      {
        "@type": "HowToStep",
        "name": "Monitor & Improve",
        "text": "Track performance metrics and continuously enhance your service quality."
      }
    ]
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
                  How It Works
                </li>
              </ol>
            </nav>
          </div>
          {/* Header */}
          <div className="bg-header-group px-8 py-12 text-center">
            <h1 className="mb-4 leading-tight">
              How Pilla Works
            </h1>
            <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
              Transform your hospitality operations in four simple steps with our comprehensive platform designed for modern businesses.
            </p>
            
            {/* Process Steps */}
            <div className="mt-8">
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Setup
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Train
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Operate
                </span>
                <span className="bg-card border-default text-sm px-4 py-2 rounded-default font-medium">
                  Improve
                </span>
              </div>
            </div>
          </div>
          
          {/* Content */}
          <div className="px-8 py-12">
            <div className="text-left max-w-3xl mx-auto">
              <div className="prose prose-lg max-w-none">
                <h2>Getting Started is Simple</h2>
                <p>
                  Pilla is designed to integrate seamlessly into your existing operations without disrupting your daily workflow. 
                  Our step-by-step approach ensures a smooth transition from traditional management methods to our comprehensive 
                  digital platform.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 mb-12">
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        1
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Sign Up & Setup</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Create your account in minutes and customize your workspace to match your specific business needs. 
                      Our onboarding process guides you through initial configuration.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        2
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Train Your Team</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Access our comprehensive library of training modules covering everything from customer service 
                      to food safety. Track progress and ensure consistent standards across your team.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        3
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Streamline Operations</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Implement our management tools to optimize scheduling, inventory, compliance tracking, 
                      and daily operational tasks. Reduce manual work and increase efficiency.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                        4
                      </div>
                      <h3 className="text-lg font-semibold mb-0">Monitor & Improve</h3>
                    </div>
                    <p className="text-gray-600 mb-0">
                      Use our analytics and reporting features to track key performance metrics, identify areas 
                      for improvement, and make data-driven decisions that enhance guest satisfaction.
                    </p>
                  </div>
                </div>

                <h2>Why This Approach Works</h2>
                <p>
                  Our methodology is based on years of experience working with hospitality businesses of all sizes. 
                  We&rsquo;ve identified the key pain points that operators face and designed our platform to address 
                  these challenges systematically.
                </p>

                <h3>Seamless Integration</h3>
                <p>
                  Pilla doesn&rsquo;t replace your existing systems overnight. Instead, we integrate gradually, 
                  allowing your team to adapt naturally while maintaining operational continuity. This reduces 
                  resistance to change and ensures higher adoption rates.
                </p>

                <h3>Continuous Support</h3>
                <p>
                  Throughout each step, our support team is available to help you maximize the platform&rsquo;s potential. 
                  From initial setup to advanced feature implementation, we&rsquo;re here to ensure your success.
                </p>

                <h2>Ready to Get Started?</h2>
                <p>
                  Join thousands of hospitality professionals who have already transformed their operations with Pilla. 
                  Our team is ready to help you begin your journey toward more efficient, profitable operations.
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="mt-12 text-center">
              <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                  Start Your Transformation Today
                </h3>
                <p className="text-muted mb-6">
                  Take the first step toward streamlined operations and enhanced guest experiences with Pilla&rsquo;s comprehensive platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Get Started Now
                  </Link>
                  <Link
                    href="/about"
                    className="inline-flex items-center px-6 py-3 bg-card text-blue-600 font-medium rounded-default border-default hover:bg-blue-50 transition-colors"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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
- **breadcrumb_links**: "Home > How It Works" | **typography**: `text-sm`
- **breadcrumb_active_color**: `text-blue-600 hover:text-blue-800` *[Options: text-blue-600, text-indigo-600]*
- **breadcrumb_inactive_color**: `text-gray-600` *[Options: text-gray-600, text-gray-500]*
- **breadcrumb_separator**: "Chevron right icon" | **color**: `text-gray-400`

### Header Section
- **header_background**: `bg-header-group` *(Uses design system header background)*
- **main_title**: "How Pilla Works" | **typography**: `h1 + leading-tight` *(Auto-applied heading style)*
- **subtitle**: "Transform your hospitality operations in four simple steps with our comprehensive platform designed for modern businesses." | **typography**: `text-subtitle`
- **subtitle_styling**: `max-w-2xl mx-auto leading-relaxed` | **font_size**: `var(--text-xl)`

### Process Steps Section
- **process_badges**: ["Setup", "Train", "Operate", "Improve"]
- **badge_styling**: `bg-card border-default text-sm px-4 py-2 rounded-default font-medium`
- **steps_layout**: `flex flex-wrap justify-center gap-2` *[Options: flex-wrap, grid, stack]*

### Content Area
- **content_structure**: "Static content with prose styling and step cards" *(No dynamic content system)*
- **content_width**: `max-w-3xl mx-auto` *[Options: max-w-2xl, max-w-3xl, max-w-4xl]*
- **content_alignment**: `text-left` *[Options: text-left, text-center, text-justify]*
- **prose_styling**: `prose prose-lg max-w-none` *(Tailwind Typography plugin)*

### Step Cards Section
- **step_cards_layout**: `grid grid-cols-1 md:grid-cols-2 gap-8` *[Options: 1 column, 2 columns, 4 columns]*
- **step_card_background**: `bg-gray-50` *[Options: bg-gray-50, bg-blue-50, bg-white]*
- **step_card_padding**: `p-6` *[Options: p-4, p-6, p-8]*
- **step_card_border**: `rounded-lg` *[Options: rounded, rounded-lg, rounded-xl]*

#### Step 1 Card
- **step_1_number**: "1" | **styling**: `bg-blue-600 text-white rounded-full w-8 h-8`
- **step_1_title**: "Sign Up & Setup" | **typography**: `text-lg font-semibold`
- **step_1_description**: "Create your account in minutes and customize your workspace..." | **typography**: `text-gray-600`

#### Step 2 Card
- **step_2_number**: "2" | **styling**: `bg-blue-600 text-white rounded-full w-8 h-8`
- **step_2_title**: "Train Your Team" | **typography**: `text-lg font-semibold`
- **step_2_description**: "Access our comprehensive library of training modules..." | **typography**: `text-gray-600`

#### Step 3 Card
- **step_3_number**: "3" | **styling**: `bg-blue-600 text-white rounded-full w-8 h-8`
- **step_3_title**: "Streamline Operations" | **typography**: `text-lg font-semibold`
- **step_3_description**: "Implement our management tools to optimize scheduling..." | **typography**: `text-gray-600`

#### Step 4 Card
- **step_4_number**: "4" | **styling**: `bg-blue-600 text-white rounded-full w-8 h-8`
- **step_4_title**: "Monitor & Improve" | **typography**: `text-lg font-semibold`
- **step_4_description**: "Use our analytics and reporting features to track..." | **typography**: `text-gray-600`

### Main Content Sections
#### Introduction Section
- **intro_title**: "Getting Started is Simple" | **typography**: `h2` *(Auto-styled)*
- **intro_content**: "Pilla is designed to integrate seamlessly into your existing operations..." | **typography**: `prose p`

#### Why This Works Section
- **why_title**: "Why This Approach Works" | **typography**: `h2` *(Auto-styled)*
- **why_content**: "Our methodology is based on years of experience working with hospitality businesses..." | **typography**: `prose p`

#### Integration Section
- **integration_title**: "Seamless Integration" | **typography**: `h3` *(Auto-styled)*
- **integration_content**: "Pilla doesn't replace your existing systems overnight..." | **typography**: `prose p`

#### Support Section
- **support_title**: "Continuous Support" | **typography**: `h3` *(Auto-styled)*
- **support_content**: "Throughout each step, our support team is available..." | **typography**: `prose p`

#### Ready Section
- **ready_title**: "Ready to Get Started?" | **typography**: `h2` *(Auto-styled)*
- **ready_content**: "Join thousands of hospitality professionals who have already transformed..." | **typography**: `prose p`

### Call to Action Section
- **cta_background**: `bg-card border-default rounded-default` *(Design system styling)*
- **cta_title**: "Start Your Transformation Today" | **typography**: `font-semibold` | **font_size**: `var(--text-xl)`
- **cta_description**: "Take the first step toward streamlined operations and enhanced guest experiences..." | **typography**: `text-muted`
- **cta_layout**: `flex flex-col sm:flex-row gap-4` *[Options: flex-col, flex-row, grid]*

### CTA Buttons
- **primary_button_text**: "Get Started Now" | **href**: "/contact"
- **primary_button_icon**: "Lightning bolt icon" | **style**: `bg-blue-600 text-white hover:bg-blue-700`
- **secondary_button_text**: "Learn More" | **href**: "/about"
- **secondary_button_icon**: "Info icon" | **style**: `bg-card text-blue-600 border-default hover:bg-blue-50`

### SEO & Structured Data
- **schema_type**: "HowTo" *(Schema.org structured data for step-by-step processes)*
- **json_ld_context**: "https://schema.org" *(SEO optimization)*
- **how_to_steps**: "4-step process with names and descriptions" *(Structured process data)*
- **language**: "en-GB" *(Content language)*
- **metadata_title**: "How Pilla Works - Hospitality Management Platform" *(SEO title)*

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
- **header_section**: "Centered with title, subtitle, process badges"
- **content_section**: "Left-aligned with prose styling, step cards grid, and max-width constraint"
- **cta_section**: "Centered with two-button layout"

---

## Styling Options
- **color_scheme**: "Blue accent theme" *[Options: blue, indigo, gray]*
- **card_style**: "Modern with subtle shadow" *[Options: minimal, modern, elevated]*
- **content_density**: "Spacious with generous padding" *[Options: compact, comfortable, spacious]*
- **step_card_style**: "Gray background with rounded corners" *[Options: gray, white, colored]*

---

## Instructions:
1. This page uses static content (no dynamic content management system)
2. Content includes step-by-step process cards with numbered badges
3. Structured data (JSON-LD) uses HowTo schema for step-based content
4. The design system uses CSS custom properties for theming
5. Layout follows the glossary term pattern with additional step cards grid
6. Step cards are responsive (1 column mobile, 2 columns tablet/desktop)

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/how-it-works/page.tsx`

*This template file serves as documentation and customization reference for the how it works page*