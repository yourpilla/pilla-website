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
  let titleFromH1 = null;
  let newContentLines = [];
  let foundFirstH1 = false;
  
  // Look for first H1 and extract it
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check if this line is an H1 (starts with # followed by space)
    if (line.match(/^#\s+(.+)$/)) {
      if (!foundFirstH1) {
        // Extract the title text (everything after "# ")
        titleFromH1 = line.replace(/^#\s+/, '').trim();
        foundFirstH1 = true;
        // Skip this line (don't add it to new content)
        continue;
      }
    }
    
    // Add all other lines to new content
    newContentLines.push(lines[i]);
  }
  
  let hasChanges = false;
  
  // If we found an H1, update the title field and content
  if (titleFromH1) {
    // Update/add lowercase 'title' field
    parsed.data.title = titleFromH1;
    
    // Remove uppercase 'Title' field if it exists
    if (parsed.data.Title) {
      delete parsed.data.Title;
      hasChanges = true;
    }
    
    // Update content (remove the H1 line)
    parsed.content = newContentLines.join('\n');
    hasChanges = true;
  }
  
  // Write back to file if there were changes
  if (hasChanges) {
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Updated ${filename} - Title: "${titleFromH1}" (${index + 1}/${blogFiles.length})`);
    updated++;
  } else {
    console.log(`⏭️  Skipped ${filename} - No H1 found or already processed (${index + 1}/${blogFiles.length})`);
    skipped++;
  }
});

console.log(`\n🎉 Finished processing ${blogFiles.length} blog files!`);
console.log(`✅ Updated: ${updated} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`\nAll H1 headings have been moved from markdown body to 'title' YAML field.`);