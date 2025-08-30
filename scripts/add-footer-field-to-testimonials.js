const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const testimonialsDir = path.join(__dirname, '..', 'content', 'testimonials');

function addFooterFieldToTestimonials() {
  try {
    // Check if testimonials directory exists
    if (!fs.existsSync(testimonialsDir)) {
      console.log('❌ Testimonials directory not found');
      return;
    }

    // Get all markdown files in the testimonials directory
    const files = fs.readdirSync(testimonialsDir).filter(file => file.endsWith('.md'));
    
    console.log(`Found ${files.length} testimonial files to process...`);
    
    let processedCount = 0;
    let updatedCount = 0;
    
    files.forEach(filename => {
      const filePath = path.join(testimonialsDir, filename);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Parse the frontmatter
      const parsed = matter(content);
      
      processedCount++;
      
      // Check if footer field already exists
      const hasFooterField = parsed.data.footer !== undefined;
      
      if (!hasFooterField) {
        // Add the footer field with default value false
        parsed.data.footer = false;
        
        // Reconstruct the file with the new frontmatter
        const updatedContent = matter.stringify(parsed.content, parsed.data);
        
        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedContent, 'utf8');
        
        updatedCount++;
        console.log(`✅ Updated: ${filename}`);
      } else {
        console.log(`⏭️  Skipped: ${filename} (footer field already exists)`);
      }
    });
    
    console.log(`\n🎉 Process completed!`);
    console.log(`📁 Processed: ${processedCount} files`);
    console.log(`✨ Updated: ${updatedCount} files`);
    console.log(`⏭️  Skipped: ${processedCount - updatedCount} files (already had footer field)`);
    
  } catch (error) {
    console.error('❌ Error processing testimonial files:', error);
  }
}

// Run the script
addFooterFieldToTestimonials();