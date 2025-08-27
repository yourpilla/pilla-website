# Pilla Website - Claude Development Guide

## Project Overview
Next.js 15 marketing website for Your Pilla hospitality management platform with 785+ dynamic content pages.

## Content Structure
- **Answers** (484 pages): FAQ content at `/answers/[slug]`
- **Blog** (49 pages): Industry insights at `/blog/[slug]`
- **Glossary** (240 pages): Hospitality terminology at `/glossary/[slug]`
- **Tools** (9 pages): Calculators at `/tools/[slug]`
- **Legal** (3 pages): Compliance documents at `/legal/[slug]`

### Blog Categories
Blog posts are organized by `secondary tag` field with dedicated category pages:
- **Job Descriptions**: `/blog/hospitality-job-role`
- **Job Interviews**: `/blog/interviews`
- **Onboarding**: `/blog/restaurant-staff-onboarding`
- **Food Hygiene**: `/blog/food-safety-management-system`
- **Health and Safety**: `/blog/hospitality-risks`
- **Operations**: `/blog/operations`

## Recent Enhancements

### Blog System Improvements
- **Category Filtering**: Added selectable category pills to `/blog` page for filtering by `secondary tag`
- **Server/Client Architecture**: Proper separation with server components for data fetching, client components for interactivity
- **Component Structure**: `BlogFilter.tsx` handles client-side filtering using `ContentItem` types

### Blog Post Enhancements  
- **Layout Matching**: Updated blog post pages to match answers page structure (3-column grid, sidebar images)
- **FAQ Integration**: Dynamic FAQ sections using UID-based references from `questions` YAML field
- **Summary Display**: FAQ summaries extracted from JSON-LD schema's first answer text (120 char limit with "Read more" links)
- **Typography System**: Custom CSS classes (`.h1`, `.h2`, `.small-blue`, etc.) for consistent styling
- **Content Sections**: Added `intro` and `tldr` YAML fields with ReactMarkdown rendering

### FAQ Summary System
- **Auto-extraction**: Summaries generated from JSON-LD schema `acceptedAnswer.text` field
- **Processing**: Successfully processed 483/484 FAQ files with schema-based summaries
- **Display**: Truncated summaries on blog pages with links to full FAQ pages
- **Masonry Layout**: CSS columns for natural flow of FAQ items

### SEO Automation
- **Dynamic Sitemap**: `/src/app/sitemap.ts` generates sitemap.xml with all 785+ pages
- **AI Optimization**: `/src/app/llms.txt/route.ts` creates llms.txt for AI content discovery
- Both files auto-update hourly with revalidation

### Image Configuration
- Added Uploadcare domain (`ucarecdn.com`) to Next.js remote patterns
- Optimized image URLs with `-/resize/800x/-/quality/best/-/format/auto/`

## Content Management
- All content stored as markdown files in `/content/` directory
- YAML frontmatter includes SEO schemas, breadcrumb data, and metadata
- Content processed via `/src/lib/content.ts` functions

## Scripts Available
- `scripts/add-sidebar-fields-to-faqs.js`: Bulk add image fields to FAQ files
- `scripts/move-author-to-subtitle.js`: Move author content to YAML subtitle
- `scripts/move-first-line-to-title.js`: Extract H1 to YAML title field
- `scripts/add-summary-to-faqs.js`: Extract summaries from JSON-LD schema for FAQ pages
- `scripts/remove-summary-fields.js`: Remove existing summary fields from FAQ files
- `scripts/generate-uid.js`: Generate Bubble-compatible UIDs for new FAQ pages

## Development Notes
- Uses Next.js 15 App Router with React 19
- ReactMarkdown for content rendering with custom link components
- Uploadcare for dynamic image management
- Gray-matter for frontmatter parsing

## Architecture Patterns

### Component Structure
- **Server Components**: Handle data fetching with Node.js APIs (fs, path)
- **Client Components**: Handle interactivity and state management
- **Example**: `blog/page.tsx` (server) → `BlogFilter.tsx` (client)

### Content Management
- **YAML Fields**: `intro`, `tldr`, `questions` (comma-separated UIDs), `secondary tag`, `summary`
- **UID System**: Bubble-compatible format for FAQ referencing (`timestamp x randomNumber`)
- **Schema Integration**: JSON-LD structured data stored as YAML pipe strings

### FAQ Integration
- **UID-based Referencing**: Blog posts reference FAQs via `questions` field
- **Dynamic Content**: `getFAQsByUIDs()` resolves UIDs to full FAQ content  
- **Summary Display**: Extracted from schema's first `acceptedAnswer.text`
- **Layout**: Masonry-style with CSS columns, background matching (`bg-main`)