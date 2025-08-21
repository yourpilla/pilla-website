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
  let introContent = '';
  let tldrContent = '';
  let remainingContentLines = [];
  
  let foundTldr = false;
  let foundMainContent = false;
  let tldrStartIndex = -1;
  let tldrEndIndex = -1;
  
  // Look for TLDR section and extract intro + TLDR
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for TLDR section header
    if (line.toLowerCase().includes('tldr') && line.startsWith('##')) {
      foundTldr = true;
      tldrStartIndex = i;
      continue;
    }
    
    // If we found TLDR, collect its content until next section
    if (foundTldr && !foundMainContent) {
      // Check if this is the start of the next major section
      if (line.startsWith('##') && !line.toLowerCase().includes('tldr')) {
        foundMainContent = true;
        tldrEndIndex = i;
        remainingContentLines.push(lines[i]);
        continue;
      }
      
      // Skip empty lines at start of TLDR
      if (line === '' && tldrContent === '') {
        continue;
      }
      
      // Collect TLDR content
      if (line !== '') {
        tldrContent += (tldrContent ? '\n' : '') + line;
      }
      continue;
    }
    
    // If we haven't found TLDR yet, this might be intro content
    if (!foundTldr && !foundMainContent) {
      // Check if this is a major section header (but not TLDR)
      if (line.startsWith('##') && !line.toLowerCase().includes('tldr')) {
        foundMainContent = true;
        remainingContentLines.push(lines[i]);
        continue;
      }
      
      // Skip empty lines at start of intro
      if (line === '' && introContent === '') {
        continue;
      }
      
      // Collect intro content (stop at first major section or TLDR)
      if (line !== '' && !line.startsWith('##')) {
        introContent += (introContent ? '\n' : '') + line;
      }
    }
    
    // Collect remaining content
    if (foundMainContent) {
      remainingContentLines.push(lines[i]);
    }
  }
  
  // If no main content sections found, put everything in remaining content
  if (!foundMainContent && !foundTldr) {
    // Look for first paragraph as intro
    let firstParagraphEnd = -1;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === '' && introContent !== '') {
        firstParagraphEnd = i;
        break;
      }
      if (line !== '') {
        introContent += (introContent ? '\n' : '') + line;
      }
    }
    
    // Remaining content starts after first paragraph
    if (firstParagraphEnd > -1) {
      remainingContentLines = lines.slice(firstParagraphEnd + 1);
    } else {
      remainingContentLines = [];
    }
  }
  
  let hasChanges = false;
  
  // Add intro field if we found content and field doesn't exist
  if (introContent && !parsed.data.intro) {
    parsed.data.intro = introContent.trim();
    hasChanges = true;
  }
  
  // Add tldr field if we found content and field doesn't exist
  if (tldrContent && !parsed.data.tldr) {
    parsed.data.tldr = tldrContent.trim();
    hasChanges = true;
  }
  
  // Update content to remove intro and TLDR sections
  if (hasChanges && (introContent || tldrContent)) {
    parsed.content = remainingContentLines.join('\n').trim();
  }
  
  // Write back to file if there were changes
  if (hasChanges) {
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Updated ${filename} - Added intro${tldrContent ? ' and TLDR' : ''} fields (${index + 1}/${blogFiles.length})`);
    updated++;
  } else {
    console.log(`⏭️  Skipped ${filename} - Fields already exist or no content found (${index + 1}/${blogFiles.length})`);
    skipped++;
  }
});

console.log(`\n🎉 Finished processing ${blogFiles.length} blog files!`);
console.log(`✅ Updated: ${updated} files`);
console.log(`⏭️  Skipped: ${skipped} files`);
console.log(`\nIntro and TLDR sections have been moved to YAML frontmatter.`);