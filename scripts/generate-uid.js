#!/usr/bin/env node

/**
 * UID Generator for FAQ Pages
 * 
 * Generates UIDs in the same format as Bubble-generated ones:
 * Format: [timestamp]x[random_number]
 * Example: 1746538990379x219765694240846800
 */

function generateUID() {
  // Get current timestamp in milliseconds
  const timestamp = Date.now();
  
  // Generate a random 18-digit number (similar to existing UIDs)
  const randomPart = Math.floor(Math.random() * 999999999999999999) + 100000000000000000;
  
  // Combine timestamp and random part with 'x'
  const uid = `${timestamp}x${randomPart}`;
  
  return uid;
}

// If script is run directly, generate and print a UID
if (require.main === module) {
  const newUID = generateUID();
  console.log('Generated UID:', newUID);
  console.log('\nTo use in FAQ YAML frontmatter:');
  console.log(`unique id: ${newUID}`);
}

module.exports = { generateUID };