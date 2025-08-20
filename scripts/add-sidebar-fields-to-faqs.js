const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to generate sidebar image URL based on content or default
function generateSidebarImage(title, slug) {
  // You can customize this logic to use specific Uploadcare URLs
  // For now, using a placeholder that you can replace with actual Uploadcare URLs
  return "https://ucarecdn.com/placeholder-uuid/hospitality-faq-image.jpg";
}

// Function to generate alt text based on title
function generateSidebarImageAlt(title) {
  // Extract key topic from title for better alt text
  if (title.toLowerCase().includes('job description') || title.toLowerCase().includes('skills')) {
    return "Professional hospitality job roles and responsibilities";
  } else if (title.toLowerCase().includes('food safety') || title.toLowerCase().includes('temperature') || title.toLowerCase().includes('hygiene')) {
    return "Food safety and hygiene in hospitality settings";
  } else if (title.toLowerCase().includes('cleaning') || title.toLowerCase().includes('maintenance')) {
    return "Hospitality cleaning and maintenance procedures";
  } else if (title.toLowerCase().includes('training') || title.toLowerCase().includes('certificate')) {
    return "Hospitality training and certification guidance";
  } else if (title.toLowerCase().includes('chef') || title.toLowerCase().includes('kitchen') || title.toLowerCase().includes('cooking')) {
    return "Professional kitchen and culinary operations";
  } else if (title.toLowerCase().includes('bar') || title.toLowerCase().includes('bartender') || title.toLowerCase().includes('service')) {
    return "Bar service and hospitality operations";
  } else if (title.toLowerCase().includes('hotel') || title.toLowerCase().includes('receptionist')) {
    return "Hotel management and guest services";
  } else {
    return "Hospitality industry guidance and best practices";
  }
}

// Get all FAQ files
const faqDir = path.join(__dirname, '..', 'content', 'answers');
const files = fs.readdirSync(faqDir).filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} FAQ files to update...`);

let updated = 0;
let skipped = 0;
let errors = 0;

files.forEach(filename => {
  try {
    const filePath = path.join(faqDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContents);
    
    // Check if sidebar fields already exist
    if (parsed.data.sidebar_image && parsed.data.sidebar_image_alt) {
      console.log(`Skipping ${filename} - sidebar fields already exist`);
      skipped++;
      return;
    }
    
    // Generate sidebar fields based on content
    const title = parsed.data.title || '';
    const slug = parsed.data.slug || filename.replace('.md', '');
    
    // Add sidebar image fields if they don't exist
    if (!parsed.data.sidebar_image) {
      parsed.data.sidebar_image = generateSidebarImage(title, slug);
    }
    
    if (!parsed.data.sidebar_image_alt) {
      parsed.data.sidebar_image_alt = generateSidebarImageAlt(title);
    }
    
    // Reconstruct the file with new fields
    const updatedContent = matter.stringify(parsed.content, parsed.data);
    
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
console.log(`\nNOTE: All sidebar_image fields are set to placeholder URLs.`);
console.log(`Replace 'https://ucarecdn.com/placeholder-uuid/hospitality-faq-image.jpg' with actual Uploadcare URLs as needed.`);