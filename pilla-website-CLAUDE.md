# Pilla Website Development Notes

## Project Overview
Migrating from Bubble.io to Next.js/Vercel for better AI crawler compatibility and performance.The user doesn't have any experience with Github, Vercle or next.js so I am helping him set everything up.

The user doesn't want me to reference 'made by claude' or 'made with ai' in the submissions.

## Page Development Workflow
The user has Tailwind Plus access for pre-built React components. Our workflow:

1. **User**: Adds raw Tailwind Plus React code sections to `/src/templates/[page-name].md`
2. **Claude**: Reads the code and creates mini-forms for customizing content (text, images, links, etc.)
3. **User**: Completes the forms with their specific content
4. **Claude**: Generates the final React component with global styles applied and pushes to GitHub for Vercel deployment

Template structure:
- `src/templates/` - Contains page template files
- Each template has sections for: Raw Code → Content Forms → Final Component

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
