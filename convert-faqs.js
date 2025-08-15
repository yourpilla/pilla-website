#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

// Initialize HTML to Markdown converter
const turndown = new TurndownService({
  headingStyle: 'atx',
  bulletListMarker: '-',
  codeBlockStyle: 'fenced'
});

// Custom rules for better conversion
turndown.addRule('links', {
  filter: 'a',
  replacement: function (content, node) {
    const href = node.getAttribute('href');
    const target = node.getAttribute('target');
    if (target === '_blank') {
      return `[${content}](${href})`;
    }
    return `[${content}](${href})`;
  }
});

// Function to clean and convert HTML to Markdown
function htmlToMarkdown(html) {
  if (!html) return '';
  
  // Clean up the HTML
  let cleaned = html
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
  
  // Convert to markdown
  let markdown = turndown.turndown(cleaned);
  
  // Clean up the markdown
  markdown = markdown
    .replace(/\n{3,}/g, '\n\n')  // Remove excessive line breaks
    .trim();
  
  return markdown;
}

// Function to properly escape YAML string values
function escapeYamlString(str) {
  if (!str) return '';
  
  // If string contains quotes, newlines, or special YAML characters, use literal block style
  if (str.includes('"') || str.includes("'") || str.includes('\n') || str.includes(':') || str.length > 100) {
    return '|\n' + str.split('\n').map(line => '  ' + line).join('\n');
  }
  
  // For simple strings, just quote them
  return `"${str.replace(/"/g, '\\"')}"`;
}

// Function to create YAML frontmatter from FAQ data
function createFrontmatter(faq) {
  const frontmatter = {
    title: faq.title || '',
    meta: faq.meta || '',
    slug: faq.Slug || '',
    'unique id': faq['unique id'] || '',
    featured: false,
    'secondary tag': faq['secondary tag'] === '(deleted option)' ? '' : (faq['secondary tag'] || ''),
    'breadcrumb short': faq['breadcrumb short'] || '',
    'pillar text': faq['pillar text'] || '',
    'pillar link': faq['pillar link'] || '',
    'subpage text': faq['subpage text'] || '',
    'subpage link': faq['subpage link'] || '',
    blog: faq.blog || ''
  };

  // Add schema data as YAML instead of inline scripts
  if (faq.schema) {
    try {
      const schemaData = JSON.parse(faq.schema.replace(/<script[^>]*>|<\/script>/g, ''));
      frontmatter.schema = schemaData;
    } catch (e) {
      console.warn(`Warning: Could not parse schema for ${faq.slug}:`, e.message);
    }
  }

  if (faq['breadcrumb schema']) {
    try {
      const breadcrumbData = JSON.parse(faq['breadcrumb schema'].replace(/<script[^>]*>|<\/script>/g, ''));
      frontmatter.breadcrumb_schema = breadcrumbData;
    } catch (e) {
      console.warn(`Warning: Could not parse breadcrumb schema for ${faq.slug}:`, e.message);
    }
  }

  // Convert to YAML string
  let yamlString = '---\n';
  for (const [key, value] of Object.entries(frontmatter)) {
    if (value !== '' && value !== null && value !== undefined) {
      if (typeof value === 'object') {
        yamlString += `${key}: |\n`;
        const jsonString = JSON.stringify(value, null, 2);
        // Indent each line of the JSON
        const indentedJson = jsonString.split('\n').map(line => '  ' + line).join('\n');
        yamlString += indentedJson + '\n';
      } else if (typeof value === 'string') {
        const escapedValue = escapeYamlString(value);
        if (escapedValue.startsWith('|\n')) {
          yamlString += `${key}: ${escapedValue}\n`;
        } else {
          yamlString += `${key}: ${escapedValue}\n`;
        }
      } else {
        yamlString += `${key}: ${value}\n`;
      }
    }
  }
  yamlString += '---\n\n';
  
  return yamlString;
}

// Main conversion function
async function convertFAQs() {
  try {
    console.log('Reading FAQ JSON file...');
    const jsonPath = path.join(__dirname, 'export_All-FAQs-modified--_2025-08-15_11-11-06.json');
    const rawData = fs.readFileSync(jsonPath, 'utf8');
    const faqs = JSON.parse(rawData);

    console.log(`Found ${faqs.length} FAQs to convert`);

    // Create answers directory if it doesn't exist
    const answersDir = path.join(__dirname, 'content', 'answers');
    if (!fs.existsSync(answersDir)) {
      fs.mkdirSync(answersDir, { recursive: true });
      console.log('Created content/answers directory');
    }

    let successCount = 0;
    let errorCount = 0;

    // Process each FAQ
    for (let i = 0; i < faqs.length; i++) {
      const faq = faqs[i];
      
      try {
        console.log(`Processing FAQ ${i + 1}/${faqs.length}: ${faq.title || faq.Slug}`);

        // Convert HTML content to markdown
        const markdownContent = htmlToMarkdown(faq['answer html']);
        
        // Create frontmatter
        const frontmatter = createFrontmatter(faq);
        
        // Combine frontmatter and content
        const fullContent = frontmatter + markdownContent;
        
        // Create filename from slug
        const filename = `${faq.Slug || `faq-${i + 1}`}.md`;
        const filePath = path.join(answersDir, filename);
        
        // Write file
        fs.writeFileSync(filePath, fullContent, 'utf8');
        
        successCount++;
        
        if (i % 10 === 0) {
          console.log(`Processed ${i + 1}/${faqs.length} FAQs...`);
        }
        
      } catch (error) {
        console.error(`Error processing FAQ ${i + 1} (${faq.title || faq.Slug}):`, error.message);
        errorCount++;
      }
    }

    console.log('\n=== Conversion Complete ===');
    console.log(`Successfully converted: ${successCount} FAQs`);
    console.log(`Errors: ${errorCount} FAQs`);
    console.log(`Total processed: ${faqs.length} FAQs`);
    console.log(`Output directory: ${answersDir}`);

  } catch (error) {
    console.error('Fatal error during conversion:', error);
    process.exit(1);
  }
}

// Run the conversion
if (require.main === module) {
  convertFAQs();
}

module.exports = { convertFAQs, htmlToMarkdown, createFrontmatter };