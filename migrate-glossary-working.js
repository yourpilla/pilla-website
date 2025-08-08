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

// Function to format content from HTML
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

// Function to escape YAML strings
function escapeYamlString(str) {
  if (!str) return '';
  return str.replace(/"/g, '\\"').replace(/\\/g, '\\\\');
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
    
    // Create YAML frontmatter without schema to avoid YAML issues
    const frontmatter = `---
title: "${escapeYamlString(title)}"
slug: "${slug}"
meta: >-
  ${meta.replace(/\n/g, ' ').trim()}
seo_title: "${escapeYamlString(seoTitle)}"
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
    errorCount++;
  }
});

console.log('\n=== Migration Complete ===');
console.log(`✅ Successfully created: ${successCount} files`);
console.log(`❌ Errors: ${errorCount} files`);
console.log(`📁 Location: ${glossaryDir}`);

if (successCount > 0) {
  console.log('\nNext steps:');
  console.log('1. Test the build: npm run build');
  console.log('2. Check the glossary page works');  
  console.log('3. Add JSON-LD schema to page template later');
  console.log('4. Commit the working migration');
}