# Tool Single Page Template

## Raw React Code for Individual Tools
*Tool page with embedded HTML calculator functionality*

```tsx
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Tool data from CSV export
const tools = [
  {
    slug: 'tronc-calculator',
    name: 'Tronc Calculator',
    description: 'Easily calculate and distribute tips among your staff by assigning Tronc points to job roles and hours worked, ensuring a fair tip-sharing process.',
    whoFor: 'This tool is essential for hospitality managers, head waiters, and bar supervisors who are responsible for fairly distributing tips among their staff. It\'s particularly useful during shifts when multiple roles are involved, ensuring that everyone is compensated proportionally to their contribution and hours worked.',
    whyUse: 'Using this Tronc Calculator simplifies the complex and often time-consuming process of manually calculating and distributing tips. It reduces the chance of human error, ensures transparency, and helps maintain staff satisfaction by fairly compensating each role based on predefined criteria. It\'s a quick, reliable way to ensure everyone is paid fairly for their work.',
    howTo: `1️⃣ Input Job Roles and Tronc Points\n\nEnter the job title (e.g., waiter, bartender).\n\nAssign Tronc points based on the role's importance.\n\nClick Add Role to save the role.\n\n2️⃣ Input Employees and Assign Roles\n\nEnter the employee's name.\n\nSelect their role from the list of added roles.\n\nInput the total hours they worked.\n\nClick Add Employee to save the employee.\n\n3️⃣ Input Total Tips\n\nEnter the total amount of tips collected.\n\nClick Distribute Tips to calculate each employee's share.\n\n4️⃣ View Results\n\nThe tool will show each employee's name and their share of the tips.`,
    htmlTool: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tronc Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
        }
        .container {
            text-align: center;
            max-width: 600px;
            margin: 50px auto;
        }
        /* ... rest of CSS ... */
    </style>
</head>
<body>
    <!-- HTML content -->
    <script>
        // JavaScript functionality
    </script>
</body>
</html>`
  }
  // ... add all other tools from CSV
];

interface ToolPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ToolPageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);
  
  if (!tool) {
    return {};
  }

  return {
    title: `${tool.name} - Free Hospitality Calculator`,
    description: tool.description,
    other: {
      'script:ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        "name": tool.name,
        "description": tool.description,
        "url": `https://yourpilla.com/tools/${slug}`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Any",
        "inLanguage": "en-GB"
      })
    }
  };
}

export async function generateStaticParams() {
  return tools.map((tool) => ({
    slug: tool.slug,
  }));
}

export default async function ToolPage({ params }: ToolPageProps) {
  const { slug } = await params;
  const tool = tools.find(t => t.slug === slug);

  if (!tool) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": tool.name,
    "description": tool.description,
    "url": `https://yourpilla.com/tools/${slug}`,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Any",
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
                    <Link href="/tools" className="text-blue-600 hover:text-blue-800">
                      Tools
                    </Link>
                  </li>
                  <li>
                    <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </li>
                  <li aria-current="page" className="text-gray-600">
                    {tool.name}
                  </li>
                </ol>
              </nav>
            </div>
            
            {/* Header */}
            <div className="bg-header-group px-8 py-12 text-center">
              <h1 className="mb-4 leading-tight">
                {tool.name}
              </h1>
              <p className="text-subtitle max-w-2xl mx-auto leading-relaxed" style={{fontSize: 'var(--text-xl)'}}>
                {tool.description}
              </p>
            </div>
            
            {/* Tool HTML Content */}
            <div className="px-8 py-12">
              <div 
                className="tool-container"
                dangerouslySetInnerHTML={{ __html: tool.htmlTool }}
              />
            </div>

            {/* How to Use Section */}
            <div className="px-8 py-12 border-t border-gray-200">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">How to Use This Tool</h2>
                <div className="prose prose-lg max-w-none">
                  {tool.howTo.split('\n').map((line, index) => (
                    <p key={index} className="mb-4">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Who Is This For Section */}
            <div className="px-8 py-12 border-t border-gray-200 bg-gray-50">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Who Is This Tool For?</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  {tool.whoFor}
                </p>
              </div>
            </div>

            {/* Why Use This Tool Section */}
            <div className="px-8 py-12 border-t border-gray-200">
              <div className="max-w-3xl mx-auto">
                <h2 className="text-2xl font-semibold mb-6">Why Use This Tool?</h2>
                <p className="text-lg leading-relaxed text-gray-700">
                  {tool.whyUse}
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="px-8 py-12 border-t border-gray-200">
              <div className="text-center">
                <div className="bg-card border-default rounded-default p-8 max-w-2xl mx-auto">
                  <h3 className="mb-3 font-semibold" style={{fontSize: 'var(--text-xl)'}}>
                    Need More Hospitality Tools?
                  </h3>
                  <p className="text-muted mb-6">
                    Explore our collection of free calculators and tools designed specifically for hospitality professionals.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/tools"
                      className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-default hover:bg-blue-700 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      View All Tools
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

            {/* Footer Attribution */}
            <div className="px-8 py-6 border-t border-gray-200 bg-gray-50">
              <div className="text-center text-sm text-gray-600">
                <p>
                  This free tool has been written by Pilla Founder,{' '}
                  <a href="https://www.linkedin.com/in/liam-jones-2a047783/" className="text-blue-600 hover:text-blue-500">
                    Liam Jones
                  </a>
                  . You can{' '}
                  <a href="mailto:liam@yourpilla.com" className="text-blue-600 hover:text-blue-500">
                    email Liam directly
                  </a>
                  {' '}if you want to suggest an improvement.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Custom CSS for tool styling
const toolStyles = `
<style>
  .tool-container body {
    font-family: inherit !important;
    margin: 0 !important;
    background-color: transparent !important;
  }
  
  .tool-container .container {
    text-align: center;
    max-width: 600px;
    margin: 0 auto !important;
  }
  
  .tool-container h2 {
    font-size: 24px;
    margin-bottom: 20px;
    text-align: left;
  }
  
  .tool-container p, .tool-container label, .tool-container button, .tool-container li {
    font-size: 18px;
    text-align: left;
  }
  
  .tool-container input, .tool-container select {
    border-radius: 10px;
    border: 2px solid black;
    box-shadow: 4px 4px 0 0 black;
    padding: 5px;
    margin: 5px 0;
    height: 40px;
    font-size: 18px;
    width: 100%;
    text-align: left;
  }
  
  .tool-container input:focus, .tool-container select:focus {
    outline: none;
    border: 2px solid black;
  }
  
  .tool-container button {
    border-radius: 10px;
    border: none;
    background-color: black;
    color: white;
    padding: 5px 10px;
    margin: 5px 0;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .tool-container button:focus {
    outline: none;
    box-shadow: none;
  }
  
  .tool-container .section {
    margin-bottom: 60px;
  }
  
  .tool-container .form-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .tool-container .form-column {
    display: flex;
    flex-direction: column;
    margin-right: 20px;
    width: 100%;
  }
  
  .tool-container .form-column input, .tool-container .form-column select {
    margin-bottom: 10px;
  }
  
  .tool-container .form-row button {
    align-self: center;
  }
  
  .tool-container ul {
    list-style-type: none;
    padding: 0;
    text-align: left;
  }
  
  .tool-container li {
    margin-bottom: 10px;
  }
</style>
`;
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

## Tool Data Structure

### CSV Tool Fields
- **slug**: URL slug for the tool (e.g., "tronc-calculator")
- **name**: Display name of the tool (e.g., "Tronc Calculator")
- **description**: Short description for meta and header
- **htmlTool**: Complete HTML code including CSS and JavaScript
- **whoFor**: Target audience description
- **whyUse**: Benefits and reasons to use the tool
- **howTo**: Step-by-step usage instructions

### Tools from CSV (10 total)
1. **tronc-calculator** - Tronc Calculator
2. **wine-gp-calculator** - Wine GP Calculator  
3. **draught-beer-gp-calculator** - Draught Beer GP Calculator
4. **restaurant-name-generator** - Restaurant Name Generator
5. **food-cost-percentage-calculator** - Food Cost Percentage Calculator
6. **menu-price-calculator** - Menu Price Calculator
7. **gross-profit-calculator** - Gross Profit Calculator
8. **catering-pricing-calculator** - Catering Pricing Calculator
9. **menu-engineering-worksheet** - Menu Engineering Worksheet

### Content Sections
#### Tool Container
- **html_content**: Raw HTML tool embedded with `dangerouslySetInnerHTML`
- **custom_styling**: CSS overrides to integrate with design system

#### How to Use Section
- **title**: "How to Use This Tool" | **typography**: `text-2xl font-semibold`
- **content**: Step-by-step instructions from CSV | **styling**: `prose prose-lg`

#### Who Is This For Section
- **title**: "Who Is This Tool For?" | **typography**: `text-2xl font-semibold`
- **background**: `bg-gray-50` *(Alternating section background)*
- **content**: Target audience description | **styling**: `text-lg leading-relaxed`

#### Why Use This Tool Section
- **title**: "Why Use This Tool?" | **typography**: `text-2xl font-semibold`
- **content**: Benefits and value proposition | **styling**: `text-lg leading-relaxed`

### Layout Structure
- **breadcrumb**: Home > Tools > {tool.name}
- **header**: Tool name and description with design system styling
- **tool_embed**: HTML calculator with custom CSS integration
- **info_sections**: How to use, who for, why use with prose styling
- **cta_section**: Links to all tools and blog
- **attribution**: Liam Jones credit and contact info

### SEO & Structured Data
- **schema_type**: "WebApplication" *(Schema.org for web tools)*
- **application_category**: "BusinessApplication"
- **operating_system**: "Any" *(Web-based tools)*
- **language**: "en-GB"
- **metadata_title**: "{tool.name} - Free Hospitality Calculator"

### Design System Integration
- **layout**: Uses glossary term layout as base
- **backgrounds**: `var(--background)`, `bg-card`, `bg-header-group`
- **borders**: `border-default`, `border-gray-200`
- **typography**: Design system classes with custom tool CSS
- **spacing**: Consistent padding and margins

---

## Instructions for Implementation:

1. **Tool Data Integration**:
   - Parse all 10 tools from the CSV into the tools array
   - Maintain exact slugs from CSV for URL compatibility
   - Clean and format HTML content for React embedding

2. **HTML Embedding**:
   - Use `dangerouslySetInnerHTML` to render tool HTML
   - Apply custom CSS to integrate with design system
   - Ensure JavaScript functionality remains intact

3. **Content Sections**:
   - Parse "how to" instructions with proper formatting
   - Display target audience and benefits clearly
   - Maintain consistent typography across sections

4. **Static Generation**:
   - Generate static params for all 10 tool slugs
   - Create proper metadata for each tool
   - Implement 404 handling for invalid slugs

5. **Tool Styling**:
   - Override tool CSS to match design system
   - Ensure responsive behavior on mobile
   - Maintain tool functionality while improving aesthetics

---

## Final React Component Location
**The processed code will be deployed to:** `/src/app/tools/[slug]/page.tsx`

*This template file serves as documentation and customization reference for individual tool pages*