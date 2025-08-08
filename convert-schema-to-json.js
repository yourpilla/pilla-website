#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const glossaryDir = './content/glossary';

// Function to convert plain text schema to JSON-LD
function convertSchemaToJson(schemaText) {
  if (!schemaText || typeof schemaText !== 'string') {
    return '';
  }

  const lines = schemaText.trim().split('\n');
  const schemaData = {};

  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.includes(':')) {
      const [key, ...valueParts] = trimmedLine.split(':');
      const cleanKey = key.trim().replace(/^@/, '@');
      const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
      
      if (value) {
        schemaData[cleanKey] = value;
      }
    }
  });

  if (Object.keys(schemaData).length === 0) {
    return '';
  }

  // Create proper JSON-LD structure
  const jsonLd = {
    "@context": schemaData['@context'] || "https://schema.org",
    "@type": schemaData['@type'] || "DefinedTerm",
    "name": schemaData.name || '',
    "description": schemaData.description || '',
    "inDefinedTermSet": schemaData.inDefinedTermSet || "https://yourpilla.com/glossary",
    "url": schemaData.url || ''
  };

  // Add inLanguage if it exists
  if (schemaData.inLanguage) {
    jsonLd.inLanguage = schemaData.inLanguage;
  }

  // Format JSON with proper indentation for YAML literal block
  const jsonString = JSON.stringify(jsonLd, null, 2);
  return jsonString.split('\n').map(line => '  ' + line).join('\n');
}

// Read all markdown files
const files = fs.readdirSync(glossaryDir).filter(file => file.endsWith('.md'));

console.log(`Converting schema data in ${files.length} files...`);

let successCount = 0;
let errorCount = 0;

files.forEach((filename, index) => {
  try {
    const filepath = path.join(glossaryDir, filename);
    const fileContent = fs.readFileSync(filepath, 'utf8');
    const { data, content } = matter(fileContent);

    // Convert the plain text schema to JSON-LD
    const jsonSchema = convertSchemaToJson(data.schema);

    if (jsonSchema) {
      // Update the frontmatter with proper JSON schema
      const updatedFrontmatter = `---
title: "${data.title || ''}"
slug: "${data.slug || ''}"
meta: >-
  ${(data.meta || '').replace(/\n/g, ' ').trim()}
schema: |
${jsonSchema}
seo_title: "${data.seo_title || ''}"
unique_id: "${data.unique_id || ''}"
---

${content}`;

      // Write the updated file
      fs.writeFileSync(filepath, updatedFrontmatter);
      successCount++;
    } else {
      console.warn(`No valid schema found in ${filename}`);
      errorCount++;
    }

    if ((index + 1) % 20 === 0) {
      console.log(`Processed ${index + 1}/${files.length} files...`);
    }

  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    errorCount++;
  }
});

console.log('\n=== Schema Conversion Complete ===');
console.log(`✅ Successfully converted: ${successCount} files`);
console.log(`❌ Errors: ${errorCount} files`);

if (successCount > 0) {
  console.log('\nNext steps:');
  console.log('1. Test the build: npm run build');
  console.log('2. Check a few files to verify JSON-LD format');
  console.log('3. Commit the changes when satisfied');
}