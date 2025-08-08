#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Read the JSON export
const jsonData = JSON.parse(fs.readFileSync('./glossary-export.json', 'utf8'));

// Create content/glossary directory if it doesn't exist
const glossaryDir = './content/glossary';
if (!fs.existsSync(glossaryDir)) {
  fs.mkdirSync(glossaryDir, { recursive: true });
}

// Function to convert HTML to plain text (basic conversion)
function htmlToText(html) {
  if (!html) return '';
  
  // Remove HTML tags and decode entities
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();
}

// Function to extract JSON-LD from schema script tag
function extractSchemaData(schemaHtml) {
  if (!schemaHtml) return '';
  
  // Extract JSON from script tag
  const jsonMatch = schemaHtml.match(/<script[^>]*>([\s\S]*?)<\/script>/);
  if (jsonMatch && jsonMatch[1]) {
    try {
      // Parse the JSON and convert to a YAML-safe string format
      const jsonData = JSON.parse(jsonMatch[1].trim());
      
      // Convert to a simplified string format that won't break YAML
      const schemaString = `
  @context: "${jsonData['@context'] || ''}"
  @type: "${jsonData['@type'] || ''}"
  name: "${(jsonData.name || '').replace(/"/g, '\\"')}"
  description: "${(jsonData.description || '').replace(/"/g, '\\"')}"
  inDefinedTermSet: "${jsonData.inDefinedTermSet || ''}"
  url: "${jsonData.url || ''}"${jsonData.inLanguage ? `\n  inLanguage: "${jsonData.inLanguage}"` : ''}`;
      
      return schemaString.trim();
    } catch (e) {
      // If parsing fails, return empty string
      console.warn('Failed to parse schema JSON:', e.message);
      return '';
    }
  }
  
  return '';
}

// Function to clean and format content
function formatContent(html) {
  if (!html) return '';
  
  let content = html;
  
  // Convert basic HTML to markdown-like format
  content = content
    .replace(/<h2>/gi, '\n## ')
    .replace(/<\/h2>/gi, '\n')
    .replace(/<h3>/gi, '\n### ')
    .replace(/<\/h3>/gi, '\n')
    .replace(/<p>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<em>(.*?)<\/em>/gi, '*$1*')
    .replace(/<li>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<ol>/gi, '\n')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<ul>/gi, '\n')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<a href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    .replace(/<[^>]*>/g, '') // Remove remaining HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\n\s*\n\s*\n/g, '\n\n') // Normalize multiple line breaks
    .trim();
  
  return content;
}

// Function to create safe filename
function createSafeFilename(slug) {
  if (!slug) return 'untitled';
  
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

console.log(`Processing ${jsonData.length} glossary entries...`);

let successCount = 0;
let errorCount = 0;

jsonData.forEach((entry, index) => {
  try {
    const slug = entry.Slug || createSafeFilename(entry.term);
    const title = entry.term || 'Untitled';
    const meta = entry['meta '] || entry.meta || '';
    const uniqueId = entry['unique id'] || '';
    const seoTitle = entry['seo title'] || title;
    
    // Format the content
    const content = formatContent(entry['description html'] || '');
    
    // Extract schema JSON
    const schemaJson = extractSchemaData(entry.schema);
    
    // Create YAML frontmatter (skip schema for now to avoid YAML issues)
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
slug: "${slug}"
meta: >-
  ${meta.replace(/\n/g, ' ').trim()}
seo_title: "${seoTitle.replace(/"/g, '\\"')}"
unique_id: "${uniqueId}"
---

${content}`;

    // Write the markdown file
    const filename = `${slug}.md`;
    const filepath = path.join(glossaryDir, filename);
    
    fs.writeFileSync(filepath, frontmatter);
    
    successCount++;
    
    if ((index + 1) % 20 === 0) {
      console.log(`Processed ${index + 1}/${jsonData.length} entries...`);
    }
    
  } catch (error) {
    console.error(`Error processing entry ${index + 1}:`, error.message);
    console.error('Entry data:', JSON.stringify(entry, null, 2).substring(0, 200) + '...');
    errorCount++;
  }
});

console.log('\n=== Migration Complete ===');
console.log(`✅ Successfully created: ${successCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`📁 Location: ${glossaryDir}`);

if (successCount > 0) {
  console.log('\nNext steps:');
  console.log('1. Review the generated files in content/glossary/');
  console.log('2. Test the glossary page at http://localhost:3000/glossary');
  console.log('3. Commit the changes when satisfied');
}