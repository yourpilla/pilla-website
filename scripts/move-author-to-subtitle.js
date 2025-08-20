const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to extract the author/date line from markdown content
function extractAuthorContent(content) {
  // Look for the pattern that starts with "Date modified:" and includes the author info
  const authorRegex = /^Date modified:.*?(?=\n\n|\n#|$)/ms;
  const match = content.match(authorRegex);
  
  if (match) {
    return {
      authorContent: match[0].trim(),
      remainingContent: content.replace(authorRegex, '').trim()
    };
  }
  
  return null;
}

// Get all FAQ files
const faqDir = path.join(__dirname, '..', 'content', 'answers');
const files = fs.readdirSync(faqDir).filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} FAQ files to process...`);

let updated = 0;
let skipped = 0;
let errors = 0;

files.forEach(filename => {
  try {
    const filePath = path.join(faqDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContents);
    
    // Try to extract author content from the markdown body
    const extractionResult = extractAuthorContent(parsed.content);
    
    if (!extractionResult) {
      console.log(`Skipping ${filename} - no author content found`);
      skipped++;
      return;
    }
    
    // Update the subtitle with the extracted author content
    parsed.data.subtitle = extractionResult.authorContent;
    
    // Update the content with the remaining content (author line removed)
    const updatedContent = matter.stringify(extractionResult.remainingContent, parsed.data);
    
    // Write back to file
    fs.writeFileSync(filePath, updatedContent);
    
    updated++;
    if (updated % 50 === 0) {
      console.log(`Updated ${updated} files...`);
    }
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error.message);
    errors++;
  }
});

console.log(`\nCompleted! Updated ${updated} files, skipped ${skipped} files, ${errors} errors.`);