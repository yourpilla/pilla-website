import { getContentByCategory } from '@/lib/content'

export const revalidate = 3600 // Revalidate every hour

export async function GET() {
  const content = generateLLMSTxt()
  
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  })
}

function generateLLMSTxt(): string {
  const baseUrl = 'https://yourpilla.com'
  
  // Get content counts for dynamic sections
  const answers = getContentByCategory('answers')
  const blogPosts = getContentByCategory('blog')
  const glossaryTerms = getContentByCategory('glossary')
  const tools = getContentByCategory('tools')
  const legal = getContentByCategory('legal')
  
  return `# Your Pilla

> Hospitality management platform providing food safety systems, staff training resources, and operational guidance for restaurants, cafes, and hospitality businesses.

Your Pilla helps hospitality businesses manage food safety compliance, staff training, and operational procedures. The platform includes comprehensive guides, calculators, job descriptions, and practical resources for restaurant managers and hospitality professionals.

## Key Pages

- [Homepage](${baseUrl}): Main platform overview and features
- [About](${baseUrl}/about): Company background and mission
- [How It Works](${baseUrl}/how-it-works): Platform functionality and benefits
- [Pricing](${baseUrl}/pricing): Subscription plans and features

## FAQ and Answers (${answers.length} pages)

- [All Answers](${baseUrl}/answers): Complete FAQ collection covering food safety, operations, and compliance
${answers
  .filter(item => item.frontmatter?.featured === true)
  .slice(0, 10)
  .map(item => `- [${item.title}](${baseUrl}/answers/${item.slug}): ${item.frontmatter?.meta || item.content.slice(0, 100).replace(/\n/g, ' ') + '...'}`).join('\n')}

## Blog Content (${blogPosts.length} pages)

- [All Blog Posts](${baseUrl}/blog): Industry insights, guides, and best practices
${blogPosts
  .filter(item => item.frontmatter?.featured === true)
  .slice(0, 5)
  .map(item => `- [${item.title}](${baseUrl}/blog/${item.slug}): ${item.frontmatter?.meta || item.content.slice(0, 100).replace(/\n/g, ' ') + '...'}`).join('\n')}

## Glossary (${glossaryTerms.length} terms)

- [Hospitality Glossary](${baseUrl}/glossary): Comprehensive terminology for hospitality professionals
${glossaryTerms
  .slice(0, 10)
  .map(item => `- [${item.title}](${baseUrl}/glossary/${item.slug}): ${item.frontmatter?.meta || item.content.slice(0, 100).replace(/\n/g, ' ') + '...'}`).join('\n')}

## Tools and Calculators (${tools.length} tools)

- [All Tools](${baseUrl}/tools): Practical calculators and planning tools
${tools
  .map(item => `- [${item.title}](${baseUrl}/tools/${item.slug}): ${item.frontmatter?.meta || item.content.slice(0, 100).replace(/\n/g, ' ') + '...'}`).join('\n')}

## Legal and Compliance (${legal.length} documents)

- [Legal Hub](${baseUrl}/legal): Terms, privacy policy, and legal information
${legal
  .map(item => `- [${item.title}](${baseUrl}/legal/${item.slug}): ${item.frontmatter?.meta || 'Legal document and compliance information'}`).join('\n')}
`
}