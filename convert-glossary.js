const fs = require('fs');
const path = require('path');
const TurndownService = require('turndown');

// Configure turndown for HTML to markdown conversion
const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced'
});

// Custom rule for external reading sections
turndownService.addRule('externalReading', {
  filter: function (node) {
    return node.nodeName === 'DIV' && node.className === 'external-reading';
  },
  replacement: function (content) {
    return '\n## External Reading\n\n' + content;
  }
});

function escapeYamlString(str) {
  if (!str) return '';
  
  // Check if string needs special handling
  if (str.includes('"') || str.includes("'") || str.includes('\n') || str.includes(':') || str.length > 100) {
    // Use literal block style for complex strings
    return '|\n' + str.split('\n').map(line => '  ' + line).join('\n');
  }
  
  // Simple string with quotes
  return `"${str.replace(/"/g, '\\"')}"`;
}

function extractSchemaFromScript(scriptTag) {
  if (!scriptTag) return null;
  
  try {
    // Extract JSON from script tag
    const match = scriptTag.match(/<script[^>]*>\s*(\{[\s\S]*?\})\s*<\/script>/);
    if (match) {
      return JSON.parse(match[1]);
    }
  } catch (error) {
    console.error('Error parsing schema:', error);
  }
  
  return null;
}

function createBreadcrumbSchema(term, slug) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://yourpilla.com"
      },
      {
        "@type": "ListItem", 
        "position": 2,
        "name": "Glossary",
        "item": "https://yourpilla.com/glossary"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": term,
        "item": `https://yourpilla.com/glossary/${slug}`
      }
    ]
  };
}

function convertGlossaryEntry(entry) {
  console.log(`Converting: ${entry.term}`);
  
  // Convert HTML description to markdown
  let content = '';
  if (entry['description html']) {
    content = turndownService.turndown(entry['description html']);
  }
  
  // Extract schema from script tag
  const schema = extractSchemaFromScript(entry.schema);
  
  // Create breadcrumb schema
  const breadcrumbSchema = createBreadcrumbSchema(entry.term, entry.Slug);
  
  // Create YAML frontmatter
  const frontmatter = [
    '---',
    `title: ${escapeYamlString(entry.term)}`,
    `slug: ${escapeYamlString(entry.Slug)}`,
    `meta: ${escapeYamlString(entry['meta '])}`,
    `seo_title: ${escapeYamlString(entry['seo title'])}`,
    `unique_id: ${escapeYamlString(entry['unique id'])}`
  ];
  
  // Add schema if present
  if (schema) {
    frontmatter.push('schema:');
    frontmatter.push('  ' + JSON.stringify(schema, null, 2).split('\n').join('\n  '));
  }
  
  // Add breadcrumb schema
  frontmatter.push('breadcrumb_schema:');
  frontmatter.push('  ' + JSON.stringify(breadcrumbSchema, null, 2).split('\n').join('\n  '));
  
  frontmatter.push('---');
  
  // Combine frontmatter and content
  const markdown = frontmatter.join('\n') + '\n\n' + content;
  
  // Write to file
  const filename = `${entry.Slug}.md`;
  const filepath = path.join('/Users/liamjones/Library/Mobile Documents/com~apple~CloudDocs/cursor/pilla-website/content/glossary', filename);
  
  try {
    fs.writeFileSync(filepath, markdown, 'utf8');
    console.log(`✅ Created: ${filename}`);
  } catch (error) {
    console.error(`❌ Error writing ${filename}:`, error);
  }
}

// Main execution
async function main() {
  try {
    console.log('🚀 Starting glossary conversion...');
    
    // Read the JSON file
    const jsonData = fs.readFileSync('/Users/liamjones/Library/Mobile Documents/com~apple~CloudDocs/cursor/pilla-website/glossary export new.json', 'utf8');
    const glossaryEntries = JSON.parse(jsonData);
    
    console.log(`📊 Found ${glossaryEntries.length} glossary entries to convert`);
    
    // Ensure output directory exists
    const outputDir = '/Users/liamjones/Library/Mobile Documents/com~apple~CloudDocs/cursor/pilla-website/content/glossary';
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Convert each entry
    let successful = 0;
    for (const entry of glossaryEntries) {
      try {
        convertGlossaryEntry(entry);
        successful++;
      } catch (error) {
        console.error(`❌ Failed to convert ${entry.term}:`, error);
      }
    }
    
    console.log(`\n✅ Conversion complete!`);
    console.log(`📈 Successfully converted: ${successful}/${glossaryEntries.length} entries`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error);
  }
}

main();