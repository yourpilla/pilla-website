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

## Content Sponsorship System

### Architecture Overview
Complete monetization system for content clusters (blog + template + FAQs) with country-specific sponsorships at 30p per view.

### Content Cluster Structure
- **Cluster ID**: Blog slug (e.g., `coffee-machine-risk-assessment`)
- **Blog**: Main content at `/blog/[slug]` with embedded template
- **Template**: Referenced via `template actual` UID field in blog frontmatter
- **FAQs**: Referenced via `questions` field (comma-separated UIDs) in blog frontmatter

### Analytics Tracking System

#### View Tracking Middleware (`src/middleware.ts`)
- **Non-blocking tracking** on `/blog/*` and `/answers/*` routes
- **Country detection** from Vercel geo headers (`x-vercel-ip-country`)
- **Edge Runtime compatible** - no file system access in middleware
- **Client-side completion** via `/api/track` endpoint for FAQ cluster mapping

#### Analytics Architecture
```
User visits page → Middleware detects country → Client tracker sends data to API → 
API resolves cluster mapping → Redis stores view count
```

#### Data Storage (Upstash Redis)
- **View Counters**: `views:{clusterId}:{country}:{YYYY-MM}` → integer count
- **Sponsor Data**: `sponsor:{clusterId}:{country}` → JSON with Stripe customer + rate
- **Debug Data**: `pageview:{clusterId}:{timestamp}:{random}` → full page view data (90-day TTL)

### Key Components

#### Analytics Libraries
- **`src/lib/analytics.ts`**: Public API functions for tracking and querying
- **`src/lib/kv-store.ts`**: Upstash Redis wrapper with KVStore interface
- **`src/lib/cluster-utils.ts`**: FAQ-to-cluster mapping via file system
- **`src/lib/geo-utils.ts`**: Country detection from request headers
- **`src/components/AnalyticsTracker.tsx`**: Client-side view tracking component

#### API Endpoints
- **`/api/track`**: Processes page views and cluster mapping
- **`/api/analytics`**: Retrieves view data for reporting (cluster or monthly billing)
- **`/api/sponsors`**: CRUD operations for sponsor management

#### Admin Dashboard
- **`/admin/sponsors`**: Sponsor management interface with billing calculations
- **Features**: Add sponsors, view monthly analytics, calculate revenue
- **Real-time billing**: Multiplies view counts by sponsor rates per country

### Environment Setup
- **Production**: Uses Upstash Redis via Vercel integration
- **Preview/Development**: Uses mock Redis (no environment variables)
- **Automatic switching**: Detects `UPSTASH_REDIS_REST_URL` presence

### Redis Integration
Connected via Vercel Marketplace → Upstash Redis integration with auto-generated environment variables:
- `UPSTASH_REDIS_REST_URL`: Redis endpoint
- `UPSTASH_REDIS_REST_TOKEN`: Authentication token

### Billing Model
- **30p per view** charged monthly via Stripe
- **Country-specific sponsors**: Different sponsors per cluster per country
- **Automatic aggregation**: Monthly view counts calculated from daily tracking