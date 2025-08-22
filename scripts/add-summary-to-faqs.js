#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const answersDirectory = path.join(process.cwd(), 'content', 'answers');

function extractSummaryFromSchema(frontmatter) {
  try {
    // Check if schema exists
    if (!frontmatter.schema) {
      return null;
    }
    
    let schema;
    
    // Handle schema as string (YAML pipe format) or object
    if (typeof frontmatter.schema === 'string') {
      try {
        schema = JSON.parse(frontmatter.schema);
      } catch (parseError) {
        console.error('Failed to parse schema JSON string:', parseError.message);
        return null;
      }
    } else if (typeof frontmatter.schema === 'object') {
      schema = frontmatter.schema;
    } else {
      return null;
    }
    
    // Look for mainEntity (can be array or single object)
    let mainEntity = schema.mainEntity;
    if (!mainEntity) {
      return null;
    }
    
    // If mainEntity is not an array, make it one
    if (!Array.isArray(mainEntity)) {
      mainEntity = [mainEntity];
    }
    
    // Get the first question
    const firstQuestion = mainEntity[0];
    if (!firstQuestion || firstQuestion['@type'] !== 'Question') {
      return null;
    }
    
    // Get the accepted answer
    const acceptedAnswer = firstQuestion.acceptedAnswer;
    if (!acceptedAnswer || acceptedAnswer['@type'] !== 'Answer') {
      return null;
    }
    
    // Extract the text field
    const answerText = acceptedAnswer.text;
    if (!answerText || typeof answerText !== 'string') {
      return null;
    }
    
    // Clean up the text (remove extra whitespace, newlines)
    const cleanText = answerText.replace(/\s+/g, ' ').trim();
    
    // If it's too long, truncate at sentence boundary
    if (cleanText.length > 200) {
      const truncated = cleanText.substring(0, 200);
      const lastPeriod = truncated.lastIndexOf('.');
      const lastQuestion = truncated.lastIndexOf('?');
      const lastExclamation = truncated.lastIndexOf('!');
      
      const lastSentence = Math.max(lastPeriod, lastQuestion, lastExclamation);
      
      if (lastSentence > 50) {
        return cleanText.substring(0, lastSentence + 1);
      }
    }
    
    return cleanText;
    
  } catch (error) {
    console.error('Error parsing schema:', error.message);
    return null;
  }
}

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

function addSummaryToFAQs() {
  console.log('🔍 Finding FAQ files...');
  
  const faqFiles = getAllMarkdownFiles(answersDirectory);
  
  console.log(`📄 Found ${faqFiles.length} FAQ files`);
  
  let updatedCount = 0;
  let skippedCount = 0;
  let noSchemaCount = 0;
  
  faqFiles.forEach((filePath) => {
    try {
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content } = matter(fileContents);
      
      // Check if summary already exists
      if (frontmatter.summary) {
        skippedCount++;
        console.log(`⏭️  Skipped ${path.basename(filePath)} (summary already exists)`);
        return;
      }
      
      // Extract summary from JSON-LD schema
      const summary = extractSummaryFromSchema(frontmatter);
      
      if (!summary) {
        noSchemaCount++;
        console.log(`⚠️  No schema or answer text found for ${path.basename(filePath)}`);
        return;
      }
      
      // Add summary to frontmatter
      frontmatter.summary = summary;
      
      // Write back to file
      const updatedFile = matter.stringify(content, frontmatter);
      fs.writeFileSync(filePath, updatedFile, 'utf8');
      
      updatedCount++;
      console.log(`✅ Updated ${path.basename(filePath)}`);
      console.log(`   Summary: "${summary.substring(0, 50)}${summary.length > 50 ? '...' : ''}"`);
      
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });
  
  console.log('\n📊 Summary:');
  console.log(`✅ Updated: ${updatedCount} files`);
  console.log(`⏭️  Skipped: ${skippedCount} files (already had summary)`);
  console.log(`⚠️  No schema: ${noSchemaCount} files (no JSON-LD schema found)`);
  console.log(`📄 Total processed: ${updatedCount + skippedCount + noSchemaCount} files`);
}

// Run the script
console.log('🚀 Starting FAQ summary addition process...\n');
addSummaryToFAQs();
console.log('\n✨ Process completed!');