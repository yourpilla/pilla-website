#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const answersDirectory = path.join(process.cwd(), 'content', 'answers');

function getAllMarkdownFiles(dir) {
  const files = [];
  
  if (!fs.existsSync(dir)) {
    return files;
  }
  
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath));
    } else if (item.endsWith('.md')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

function removeSummaryFields() {
  console.log('🔍 Finding FAQ files...');
  
  const faqFiles = getAllMarkdownFiles(answersDirectory);
  
  console.log(`📄 Found ${faqFiles.length} FAQ files`);
  
  let removedCount = 0;
  let noSummaryCount = 0;
  
  faqFiles.forEach((filePath) => {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);
      
      // Check if summary field exists
      if (!frontmatter.summary) {
        noSummaryCount++;
        return;
      }
      
      // Remove summary field
      delete frontmatter.summary;
      
      // Write back to file
      const updatedFile = matter.stringify(content, frontmatter);
      fs.writeFileSync(filePath, updatedFile, 'utf8');
      
      removedCount++;
      console.log(`✅ Removed summary from ${path.basename(filePath)}`);
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log('\n📊 Summary:');
  console.log(`🗑️  Removed: ${removedCount} summary fields`);
  console.log(`⏭️  No summary: ${noSummaryCount} files (didn't have summary)`);
  console.log(`📄 Total processed: ${removedCount + noSummaryCount} files`);
}

// Run the script
console.log('🚀 Starting summary field removal process...\n');
removeSummaryFields();
console.log('\n✨ Summary removal completed!');