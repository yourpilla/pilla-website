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

## Components Status
- ✅ Header with Resources dropdown
- ✅ Blog pillar page with categories
- ✅ Glossary pillar page with A-Z navigation
- ✅ Individual glossary pages with JSON-LD schema

## Content Structure
- Blog posts in `/content/blog/`
- Glossary terms in `/content/glossary/` (240+ terms)
- Uses gray-matter for YAML frontmatter parsing
- Uses react-markdown for content rendering

White background with top border (#D0D5DD)
