# Pilla Website - Claude Development Guide

## Project Overview
Next.js 15 marketing website for Your Pilla hospitality management platform with 785+ dynamic content pages.

## Content Structure
- **Answers** (484 pages): FAQ content at `/answers/[slug]`
- **Blog** (49 pages): Industry insights at `/blog/[slug]`
- **Glossary** (240 pages): Hospitality terminology at `/glossary/[slug]`
- **Tools** (9 pages): Calculators at `/tools/[slug]`
- **Legal** (3 pages): Compliance documents at `/legal/[slug]`

## Recent Enhancements

### FAQ Page Improvements
- Removed cross-hatch background pattern, using `bg-main` color
- Added dynamic sidebar images via YAML frontmatter (`sidebar_image`, `sidebar_image_alt`)
- Restructured layout from 2-column to 3-column grid (text: 2/3, image: 1/3)
- Moved author info from markdown body to `subtitle` YAML field
- Moved H1 headings from markdown to `title` YAML field
- Added proper page padding (~75px total)
- Implemented mobile-responsive image centering

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

## Development Notes
- Uses Next.js 15 App Router with React 19
- ReactMarkdown for content rendering with custom link components
- Uploadcare for dynamic image management
- Gray-matter for frontmatter parsing