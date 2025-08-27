# Pilla Website Development Notes

## Project Overview
Migrating from Bubble.io to Next.js/Vercel for better AI crawler compatibility and performance.The user doesn't have any experience with Github, Vercle or next.js so I am helping him set everything up.

The user doesn't want me to reference 'made by claude' or 'made with ai' in the submissions.

## Page Development Workflow
The user has Tailwind Plus access for pre-built React components. Our refined workflow to making and updating page layouts and typography:

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

## Template Editing Workflow
For making changes to existing pages:

1. **User edits template**: Modifies content in the mini-forms section at the bottom of template files (e.g., `/src/templates/homepage.md`)
   - Raw React code at the top remains unchanged as reference
   - Only the content forms section is edited for customization
   
2. **User saves file**: Must save template file after making changes

3. **User notifies Claude**: Simply says "I've made changes to [template name]"

4. **Claude automatically detects changes**: Reads the updated template file and compares the content forms with the live code to identify differences

5. **Claude implements changes**: Updates the live React component files (`.tsx`) with the new content from the template forms

**CRITICAL: Claude must check BOTH content AND typography for every field:**
- ✅ Content changes (text, links, images)
- ✅ Typography changes (h1 vs display-1, lead vs subtitle-lg, etc.)
- ❌ DO NOT assume typography is correct if only content matches
- ❌ DO NOT leave existing classes if template specifies different typography

This allows efficient content updates without needing to specify individual changes - Claude automatically finds and implements all differences between the template forms and live code.

## Typography System
Simplified 5-class typography system:
- **Colors**: #374151 (blue text), #9CA3AF (grey text)
- **5 Core Classes**: 
  1. `h1-h6` - Headings (semantic HTML OR CSS classes)
  2. `big-grey` - Small subtitles (18px, grey)
  3. `big-blue` - Introduction paragraphs (24px, blue) 
  4. `small-blue` - Default body text (18px, blue)
  5. `small-grey` - Secondary text (grey color)
- **Simple Rules**: One class per element, no mixing/combining
- **Intuitive Naming**: Size (big/small) + Color (blue/grey)
- **Font**: Arial with enhanced readability features
- **Typography Reference**: `/src/templates/css-styles-reference.md` shows complete system

### Template Typography Notation:
- **`<h2>`** = Semantic HTML element (SEO + styling)
- **`.h4`** = CSS class for visual styling only (no SEO)
- **No brackets** = If semantic heading missing, none created
- **Examples**: `<h1>` creates `<h1>`, `.h3` applies h3 styling to existing element

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
