const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '../content/blog');

// Read all blog files
const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

console.log(`Found ${blogFiles.length} blog files to update...`);

let updated = 0;
let skipped = 0;

blogFiles.forEach((filename, index) => {
  const filePath = path.join(blogDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(fileContent);
  
  // Split content into lines
  const lines = parsed.content.split('\n');
  let authorInfo = null;
  let newContentLines = [];
  let foundAuthorInfo = false;
  
  // Look for author/date information in the first few lines
  for (let i = 0; i < Math.min(15, lines.length); i++) {
    const line = lines[i].trim();
    
    // Skip empty lines
    if (line === '') {
      if (!foundAuthorInfo) {
        continue; // Skip empty lines at the beginning
      } else {
        newContentLines.push(lines[i]); // Keep empty lines after we found author info
        continue;
      }
    }
    
    // Check if this line contains author/date information
    // Look for patterns like "Date modified:" or "written by" or "Founder"
    if ((line.includes('Date modified:') || 
         line.includes('written by') || 
         line.includes('Founder') || 
         line.includes('Pilla') || 
         line.includes('email') ||
         line.includes('liam@yourpilla.com')) && 
        !foundAuthorInfo) {
      
      authorInfo = line;
      foundAuthorInfo = true;
      // Don't add this line to new content
      continue;
    }
    
    // If we haven't found author info yet and this looks like regular content, stop looking
    if (!foundAuthorInfo && (line.startsWith('##') || line.length > 100)) {
      // This looks like regular content, add it and stop looking for author info
      newContentLines.push(lines[i]);
      // Add all remaining lines
      for (let j = i + 1; j < lines.length; j++) {
        newContentLines.push(lines[j]);
      }
      break;
    }
    
    // Add other lines to new content
    if (foundAuthorInfo || !line.includes('Date modified:')) {
      newContentLines.push(lines[i]);
    }
  }
  
  let hasChanges = false;
  
  // If we found author info, update the subtitle field and content
  if (authorInfo) {
    // Clean up the author info (remove markdown formatting artifacts)
    const cleanAuthorInfo = authorInfo
      .replace(/&nbsp;/g, ' ')
      .replace(/^\s*-?\s*/, '') // Remove leading dashes or spaces
      .trim();
    
    // Update subtitle field (overwrite the existing placeholder)
    parsed.data.subtitle = cleanAuthorInfo;
    
    // Update content (remove the author info line)
    parsed.content = newContentLines.join('\n').trim();
    hasChanges = true;
  }
  
  // Write back to file if there were changes
  if (hasChanges) {
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Updated ${filename} - Moved author info to subtitle (${index + 1}/${blogFiles.length})`);
    updated++;
  } else {
    console.log(`⏭️  Skipped ${filename} - No author info found or already processed (${index + 1}/${blogFiles.length})`);
    skipped++;
  }
});

console.log(`\n🎉 Finished processing ${blogFiles.length} blog files!`);
console.log(`✅ Updated: ${updated} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`\nAll author/date information has been moved from markdown body to 'subtitle' YAML field.`);