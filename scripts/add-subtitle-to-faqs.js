const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Function to generate a subtitle from the title
function generateSubtitle(title) {
  // Remove question marks and make it more descriptive
  let subtitle = title.replace(/\?/g, '');
  
  // Common patterns and their subtitles
  const patterns = [
    { regex: /What.*skills.*should.*include/i, subtitle: 'Essential competencies and qualifications for effective performance' },
    { regex: /How.*clean/i, subtitle: 'Step-by-step cleaning procedures and best practices' },
    { regex: /How.*temperature/i, subtitle: 'Temperature monitoring guidelines and procedures' },
    { regex: /What.*temperature/i, subtitle: 'Required temperature standards and monitoring' },
    { regex: /How.*often.*check/i, subtitle: 'Monitoring frequency and compliance requirements' },
    { regex: /What.*do.*if/i, subtitle: 'Emergency procedures and corrective actions' },
    { regex: /How.*store/i, subtitle: 'Proper storage procedures and safety guidelines' },
    { regex: /What.*difference/i, subtitle: 'Key distinctions and comparative analysis' },
    { regex: /How.*cook/i, subtitle: 'Safe cooking procedures and temperature requirements' },
    { regex: /What.*causes/i, subtitle: 'Root causes and prevention strategies' },
    { regex: /How.*know/i, subtitle: 'Identification methods and quality indicators' },
    { regex: /What.*equipment/i, subtitle: 'Equipment specifications and usage guidelines' },
    { regex: /How.*maintain/i, subtitle: 'Maintenance procedures and schedules' },
    { regex: /What.*procedure/i, subtitle: 'Step-by-step procedures and protocols' },
    { regex: /How.*ensure/i, subtitle: 'Quality assurance methods and verification' },
    { regex: /What.*signs/i, subtitle: 'Warning signs and identification criteria' },
    { regex: /How.*prevent/i, subtitle: 'Prevention strategies and control measures' },
    { regex: /What.*training/i, subtitle: 'Training requirements and certification guidelines' },
    { regex: /How.*document/i, subtitle: 'Documentation procedures and record keeping' },
    { regex: /What.*legal/i, subtitle: 'Legal requirements and compliance obligations' }
  ];
  
  // Find matching pattern
  for (const pattern of patterns) {
    if (pattern.regex.test(title)) {
      return pattern.subtitle;
    }
  }
  
  // Default subtitle based on title structure
  if (title.includes('job description')) {
    return 'Key responsibilities, qualifications and requirements';
  } else if (title.includes('safety') || title.includes('hygiene')) {
    return 'Safety procedures and compliance guidelines';
  } else if (title.includes('management') || title.includes('manager')) {
    return 'Management best practices and operational guidance';
  } else if (title.includes('training') || title.includes('certificate')) {
    return 'Training requirements and certification procedures';
  } else if (title.includes('equipment') || title.includes('maintenance')) {
    return 'Equipment operation and maintenance procedures';
  } else {
    return 'Professional guidance and industry best practices';
  }
}

// Get all FAQ files
const faqDir = path.join(__dirname, '..', 'content', 'answers');
const files = fs.readdirSync(faqDir).filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} FAQ files to update...`);

let updated = 0;
let errors = 0;

files.forEach(filename => {
  try {
    const filePath = path.join(faqDir, filename);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const parsed = matter(fileContents);
    
    // Check if subtitle already exists
    if (parsed.data.subtitle) {
      console.log(`Skipping ${filename} - subtitle already exists`);
      return;
    }
    
    // Generate subtitle from title
    const title = parsed.data.title || parsed.data.Title || '';
    if (!title) {
      console.log(`Warning: No title found in ${filename}`);
      return;
    }
    
    const subtitle = generateSubtitle(title);
    
    // Add subtitle field after title
    parsed.data.subtitle = subtitle;
    
    // Reconstruct the file with subtitle
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

console.log(`\nCompleted! Updated ${updated} files, ${errors} errors.`);