const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const blogDir = '/Users/liamjones/Library/Mobile Documents/com~apple~CloudDocs/cursor/pilla-website/content/blog';

// Get all .md files
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

console.log(`Validating YAML frontmatter in ${files.length} blog files...\n`);

let validFiles = 0;
let invalidFiles = 0;
const errors = [];

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Extract frontmatter (between first and second ---)
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
  
  if (!frontmatterMatch) {
    console.log(`❌ ${file} - No frontmatter found`);
    invalidFiles++;
    errors.push(`${file}: No frontmatter found`);
    return;
  }
  
  const frontmatterContent = frontmatterMatch[1];
  
  try {
    // Parse YAML
    const parsed = yaml.load(frontmatterContent);
    
    // Basic validation - check if it's an object
    if (typeof parsed === 'object' && parsed !== null) {
      console.log(`✅ ${file} - Valid YAML`);
      validFiles++;
    } else {
      console.log(`❌ ${file} - YAML parsed but not an object`);
      invalidFiles++;
      errors.push(`${file}: YAML parsed but not an object`);
    }
    
  } catch (error) {
    console.log(`❌ ${file} - YAML Error: ${error.message}`);
    invalidFiles++;
    errors.push(`${file}: ${error.message}`);
  }
});

console.log(`\n=== VALIDATION SUMMARY ===`);
console.log(`✅ Valid files: ${validFiles}`);
console.log(`❌ Invalid files: ${invalidFiles}`);
console.log(`📊 Total files: ${files.length}`);

if (errors.length > 0) {
  console.log(`\n=== ERRORS FOUND ===`);
  errors.forEach(error => console.log(`  ${error}`));
} else {
  console.log(`\n🎉 All YAML frontmatter is valid!`);
}