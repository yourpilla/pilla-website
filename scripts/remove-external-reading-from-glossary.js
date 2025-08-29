const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const glossaryDir = path.join(__dirname, '..', 'content', 'glossary');

function removeExternalReadingFromGlossary() {
  try {
    // Get all markdown files in the glossary directory
    const files = fs.readdirSync(glossaryDir).filter(file => file.endsWith('.md'));
    
    console.log(`Found ${files.length} glossary files to process...`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    files.forEach(filename => {
      const filePath = path.join(glossaryDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse the frontmatter and content
      const parsed = matter(content);
      let markdownContent = parsed.content;
      
      processedCount++;
      
      // Check if the content contains External Reading sections
      const hasExternalReading = /## External Reading/i.test(markdownContent);
      
      if (hasExternalReading) {
        // Remove everything from "## External Reading" to the end of the file
        // This handles cases where there might be multiple External Reading headers
        markdownContent = markdownContent.replace(/## External Reading[\s\S]*$/gmi, '');
        
        // Clean up any trailing whitespace or newlines
        markdownContent = markdownContent.trim();
        
        // Reconstruct the file with the cleaned content
        const updatedFileContent = matter.stringify(markdownContent, parsed.data);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedFileContent, 'utf8');
        
        updatedCount++;
        console.log(`✅ Cleaned: ${filename}`);
      } else {
        console.log(`⏭️  Skipped: ${filename} (no External Reading section found)`);
      }
    });
    
    console.log(`\n🎉 Process completed!`);
    console.log(`📁 Processed: ${processedCount} files`);
    console.log(`✨ Updated: ${updatedCount} files`);
    console.log(`⏭️  Skipped: ${processedCount - updatedCount} files (no External Reading sections)`);
    
  } catch (error) {
    console.error('❌ Error processing glossary files:', error);
  }
}

// Run the script
removeExternalReadingFromGlossary();