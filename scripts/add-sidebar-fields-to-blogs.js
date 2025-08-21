const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '../content/blog');

// Function to generate appropriate alt text based on blog title
function generateAltText(title) {
  const lowerTitle = title.toLowerCase();
  
  // Food safety and hygiene topics
  if (lowerTitle.includes('food safety') || lowerTitle.includes('haccp') || lowerTitle.includes('hygiene')) {
    return 'Food safety procedures and hygiene practices in hospitality';
  }
  
  // Allergen management
  if (lowerTitle.includes('allergen') || lowerTitle.includes('allergy')) {
    return 'Allergen management and food safety protocols';
  }
  
  // Temperature and equipment
  if (lowerTitle.includes('temperature') || lowerTitle.includes('fridge') || lowerTitle.includes('freezer') || lowerTitle.includes('equipment')) {
    return 'Kitchen equipment and temperature monitoring systems';
  }
  
  // Cooking and food preparation
  if (lowerTitle.includes('cook') || lowerTitle.includes('food') || lowerTitle.includes('prep') || lowerTitle.includes('storage')) {
    return 'Professional food preparation and cooking techniques';
  }
  
  // Compliance and inspection
  if (lowerTitle.includes('compliance') || lowerTitle.includes('inspection') || lowerTitle.includes('audit') || lowerTitle.includes('eho')) {
    return 'Health inspection and regulatory compliance procedures';
  }
  
  // Cleaning and sanitation
  if (lowerTitle.includes('clean') || lowerTitle.includes('sanit') || lowerTitle.includes('wash')) {
    return 'Professional cleaning and sanitation practices';
  }
  
  // Staff and training
  if (lowerTitle.includes('staff') || lowerTitle.includes('training') || lowerTitle.includes('team')) {
    return 'Staff training and hospitality team management';
  }
  
  // Default fallback
  return 'Professional hospitality operations and best practices';
}

// Function to generate Uploadcare image URL based on content theme
function generateImageUrl(title) {
  const lowerTitle = title.toLowerCase();
  
  // Use different placeholder URLs for different topics
  // Note: These are placeholder URLs - replace with actual Uploadcare URLs
  if (lowerTitle.includes('food safety') || lowerTitle.includes('haccp')) {
    return 'https://ucarecdn.com/placeholder-food-safety/hospitality-food-safety.jpg';
  }
  
  if (lowerTitle.includes('allergen')) {
    return 'https://ucarecdn.com/placeholder-allergen/allergen-management.jpg';
  }
  
  if (lowerTitle.includes('temperature') || lowerTitle.includes('fridge') || lowerTitle.includes('freezer')) {
    return 'https://ucarecdn.com/placeholder-temperature/kitchen-temperature.jpg';
  }
  
  if (lowerTitle.includes('clean') || lowerTitle.includes('sanit')) {
    return 'https://ucarecdn.com/placeholder-cleaning/kitchen-cleaning.jpg';
  }
  
  if (lowerTitle.includes('cook') || lowerTitle.includes('prep')) {
    return 'https://ucarecdn.com/placeholder-cooking/food-preparation.jpg';
  }
  
  // Default hospitality image
  return 'https://ucarecdn.com/placeholder-default/hospitality-operations.jpg';
}

// Read all blog files
const blogFiles = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

console.log(`Found ${blogFiles.length} blog files to update...`);

blogFiles.forEach((filename, index) => {
  const filePath = path.join(blogDir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(fileContent);
  
  // Get title from frontmatter or extract from content
  const title = parsed.data.Title || parsed.data.title || filename.replace('.md', '').replace(/-/g, ' ');
  
  // Check if fields already exist
  const hasSubtitle = parsed.data.subtitle !== undefined;
  const hasSidebarImage = parsed.data.sidebar_image !== undefined;
  const hasSidebarImageAlt = parsed.data.sidebar_image_alt !== undefined;
  
  let updated = false;
  
  // Add subtitle field if it doesn't exist
  if (!hasSubtitle) {
    // Look for author/date info in content to move to subtitle
    const contentLines = parsed.content.split('\n');
    let authorLine = '';
    
    // Find lines that contain date and author info
    for (let i = 0; i < Math.min(10, contentLines.length); i++) {
      const line = contentLines[i].trim();
      if (line.includes('Date modified:') || line.includes('written by') || line.includes('Founder')) {
        authorLine = line;
        break;
      }
    }
    
    if (authorLine) {
      parsed.data.subtitle = authorLine.replace(/^#*\s*/, '').trim();
    } else {
      // Default subtitle format
      parsed.data.subtitle = `Date modified: 1st January 2025 | This article has been written by Pilla Founder, [Liam Jones](https://yourpilla.com/profile/liam-jones), click to [email Liam directly](https://mailto:liam@yourpilla.com), he reads every email.`;
    }
    updated = true;
  }
  
  // Add sidebar image field if it doesn't exist
  if (!hasSidebarImage) {
    parsed.data.sidebar_image = generateImageUrl(title);
    updated = true;
  }
  
  // Add sidebar image alt field if it doesn't exist  
  if (!hasSidebarImageAlt) {
    parsed.data.sidebar_image_alt = generateAltText(title);
    updated = true;
  }
  
  // Write back to file if updated
  if (updated) {
    const newContent = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(filePath, newContent, 'utf-8');
    console.log(`✅ Updated ${filename} (${index + 1}/${blogFiles.length})`);
  } else {
    console.log(`⏭️  Skipped ${filename} - fields already exist (${index + 1}/${blogFiles.length})`);
  }
});

console.log(`\n🎉 Finished processing ${blogFiles.length} blog files!`);
console.log(`\nNote: Image URLs are placeholders. Update them with actual Uploadcare URLs as needed.`);