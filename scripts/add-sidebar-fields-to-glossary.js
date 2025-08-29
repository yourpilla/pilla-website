const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const glossaryDir = path.join(__dirname, '..', 'content', 'glossary');

// Default sidebar image for glossary terms
const defaultSidebarImage = 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop&auto=format';
const defaultSidebarImageAlt = 'Hospitality glossary term';

function addSidebarFieldsToGlossary() {
  try {
    // Get all markdown files in the glossary directory
    const files = fs.readdirSync(glossaryDir).filter(file => file.endsWith('.md'));
    
    console.log(`Found ${files.length} glossary files to process...`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    files.forEach(filename => {
      const filePath = path.join(glossaryDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse the frontmatter
      const parsed = matter(content);
      
      processedCount++;
      
      // Check if sidebar fields already exist
      const hasSidebarImage = parsed.data.sidebar_image;
      const hasSidebarImageAlt = parsed.data.sidebar_image_alt;
      
      if (!hasSidebarImage || !hasSidebarImageAlt) {
        // Add the missing fields
        if (!hasSidebarImage) {
          parsed.data.sidebar_image = defaultSidebarImage;
        }
        if (!hasSidebarImageAlt) {
          parsed.data.sidebar_image_alt = defaultSidebarImageAlt;
        }
        
        // Reconstruct the file with the new frontmatter
        const updatedContent = matter.stringify(parsed.content, parsed.data);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        updatedCount++;
        console.log(`✅ Updated: ${filename}`);
      } else {
        console.log(`⏭️  Skipped: ${filename} (fields already exist)`);
      }
    });
    
    console.log(`\n🎉 Process completed!`);
    console.log(`📁 Processed: ${processedCount} files`);
    console.log(`✨ Updated: ${updatedCount} files`);
    console.log(`⏭️  Skipped: ${processedCount - updatedCount} files (already had fields)`);
    
  } catch (error) {
    console.error('❌ Error processing glossary files:', error);
  }
}

// Run the script
addSidebarFieldsToGlossary();