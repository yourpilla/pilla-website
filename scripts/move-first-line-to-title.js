const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to extract the first line from markdown content
function extractFirstLine(content) {
  // Split content into lines and find the first non-empty line that starts with #
  const lines = content.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Look for the first H1 heading (starts with # but not ##)
    if (line.match(/^#\s+(.+)$/)) {
      const titleText = line.replace(/^#\s+/, '').trim();
      
      // Remove this line from content and return both
      const remainingLines = lines.slice();
      remainingLines.splice(i, 1);
      
      // Also remove any empty lines that follow
      while (remainingLines[i] && remainingLines[i].trim() === '') {
        remainingLines.splice(i, 1);
      }
      
      return {
        title: titleText,
        remainingContent: remainingLines.join('\n').trim()
      };
    }
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
    
    // Try to extract first line (H1) from the markdown body
    const extractionResult = extractFirstLine(parsed.content);
    
    if (!extractionResult) {
      console.log(`Skipping ${filename} - no H1 heading found`);
      skipped++;
      return;
    }
    
    // Update the title with the extracted H1 text
    parsed.data.title = extractionResult.title;
    
    // Update the content with the remaining content (H1 removed)
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