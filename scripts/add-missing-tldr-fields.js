const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '../content/blog');

// Read all blog files
const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

console.log(`Found ${blogFiles.length} blog files to check...`);

let updated = 0;
let skipped = 0;

blogFiles.forEach((filename, index) => {
  const filePath = path.join(blogDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(fileContent);
  
  let hasChanges = false;
  
  // Add empty tldr field if it doesn't exist
  if (!parsed.data.tldr) {
    parsed.data.tldr = '';
    hasChanges = true;
  }
  
  // Add empty intro field if it doesn't exist
  if (!parsed.data.intro) {
    parsed.data.intro = '';
    hasChanges = true;
  }
  
  // Write back to file if there were changes
  if (hasChanges) {
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Updated ${filename} - Added missing fields (${index + 1}/${blogFiles.length})`);
    updated++;
  } else {
    console.log(`⏭️  Skipped ${filename} - All fields present (${index + 1}/${blogFiles.length})`);
    skipped++;
  }
});

console.log(`\n🎉 Finished processing ${blogFiles.length} blog files!`);
console.log(`✅ Updated: ${updated} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`\nAll blog posts now have both intro and tldr fields.`);