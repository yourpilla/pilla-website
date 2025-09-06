const fs = require('fs');
const path = require('path');

const blogDir = '/Users/liamjones/Library/Mobile Documents/com~apple~CloudDocs/cursor/pilla-website/content/blog';

// Get all .md files
const files = fs.readdirSync(blogDir).filter(file => file.endsWith('.md'));

console.log(`Found ${files.length} blog files to check`);

let fixedCount = 0;

files.forEach(file => {
  const filePath = path.join(blogDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if file has tldr field with >- (folded block scalar)
  if (content.includes('tldr: >-')) {
    const originalContent = content;
    
    // Fix indentation for tldr field content
    // This regex finds tldr: >- followed by lines that should be indented
    content = content.replace(
      /(tldr: >-\n)([^]*?)(\nintro: '')/,
      (match, start, tldrContent, end) => {
        // Split the tldr content into lines and indent each non-empty line
        const lines = tldrContent.split('\n');
        const indentedLines = lines.map(line => {
          // If line is empty, keep it empty
          if (line.trim() === '') return line;
          // If line is already properly indented (starts with 2+ spaces), keep it
          if (line.startsWith('  ')) return line;
          // Otherwise, add 2-space indentation
          return '  ' + line;
        });
        
        return start + indentedLines.join('\n') + end;
      }
    );
    
    if (originalContent !== content) {
      fs.writeFileSync(filePath, content);
      console.log(`${file} - Fixed YAML indentation`);
      fixedCount++;
    }
  }
});

console.log(`\nFixed YAML indentation in ${fixedCount} files`);