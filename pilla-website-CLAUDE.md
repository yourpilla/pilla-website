# Pilla Website Development Notes

## Project Overview
Migrating from Bubble.io to Next.js/Vercel for better AI crawler compatibility and performance.The user doesn't have any experience with Github, Vercle or next.js so I am helping him set everything up.

The user doesn't want me to reference 'made by claude' or 'made with ai' in the submissions.

## Page Development Workflow
The user has Tailwind Plus access for pre-built React components. Our refined workflow:

1. **User**: Adds raw Tailwind Plus React code sections to `/src/templates/[page-name].md`
2. **Claude**: Processes the code by:
   - Removing background graphics/textures/patterns
   - Applying `bg-main` background color (#FAF9FB) to sections
   - Updating text classes to our typography system (eyebrow, display-1, subtitle-lg, lead, etc.)
   - Creating mini-forms for content AND typography class customization
   - **IMPORTANT**: Mini-forms must preserve the original content from the raw Tailwind Plus code as default values (not placeholder content) so user can identify which form controls which section
3. **User**: Customizes content and fine-tunes typography classes using the forms
4. **Claude**: Generates the final React component and pushes to GitHub for Vercel deployment

Template structure:
- `src/templates/` - Contains page template files as working documents
- Each template has sections for: Raw Code → Content Forms → Typography Forms
- Template files are reference documents only (NOT the final code)
- Final processed code goes directly to the appropriate page path (.tsx files)

## Typography System
New SaaS Typography Kit applied globally:
- **Colors**: #374151 (main text), #9CA3AF (muted text)  
- **Classes**: display-1, display-2, eyebrow, subtitle-lg, lead, text-muted, etc.
- **Headings**: Bold weights (700-800) with proper spacing and responsive sizing
- **Font**: Arial with enhanced readability features
- **HTML vs CSS**: Always use semantic HTML tags (h1, h2, etc.) for SEO, then apply visual CSS classes for styling
- **Typography Reference**: Temporary page at `/typography-reference` shows all available classes (delete before going live)

## Components Status
- ✅ Header with Resources dropdown
- ✅ Blog pillar page with dynamic content loading (3 posts)
- ✅ Tools pillar page with dynamic content loading (9 calculators)
- ✅ Legal pillar page with dynamic content loading (3 documents)
- ✅ Glossary pillar page with A-Z navigation (240+ terms)
- ✅ Individual glossary pages with JSON-LD schema
- ✅ All pillar pages now use content management system

## Content Structure
- Blog posts in `/content/blog/` (3 posts)
- Tools/calculators in `/content/tools/` (9 tools)
- Legal documents in `/content/legal/` (3 documents)
- Glossary terms in `/content/glossary/` (240+ terms)
- Uses gray-matter for YAML frontmatter parsing
- Uses react-markdown for content rendering
- All content categories integrated with pillar pages

## ISR (Incremental Static Regeneration) Configuration
Content pages use ISR to avoid full site rebuilds when content changes:
- **Blog posts**: Revalidate every 1 hour (3600 seconds)
- **Tools**: Revalidate every 6 hours (21600 seconds)  
- **Glossary**: Revalidate every 12 hours (43200 seconds)
- **Legal**: Revalidate every 24 hours (86400 seconds)

### On-Demand Revalidation
- API endpoint: `/api/revalidate` handles GitHub webhooks
- Automatically revalidates affected pages when content changes in GitHub
- Webhook URL: `https://yourpilla.com/api/revalidate`
- Security: Uses GITHUB_WEBHOOK_SECRET for signature verification
- Manual testing: `/api/revalidate?path=/blog&secret=MANUAL_SECRET`

### GitHub Webhook Setup
1. Go to GitHub repo Settings > Webhooks
2. Add webhook: `https://yourpilla.com/api/revalidate`
3. Content type: `application/json`
4. Events: Select "Push" events only
5. Add secret token (set as GITHUB_WEBHOOK_SECRET in Vercel environment)

White background with top border (#D0D5DD)
