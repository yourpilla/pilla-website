import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export interface ContentItem {
  slug: string;
  title: string;
  meta?: string;
  uniqueId?: string;
  content: string;
  frontmatter: Record<string, unknown>;
  category: string;
}

export function getContentByCategory(category: 'blog' | 'jobs' | 'glossary' | 'legal'): ContentItem[] {
  const categoryPath = path.join(contentDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = getAllMarkdownFiles(categoryPath);
  
  return files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    const relativePath = path.relative(categoryPath, filePath);
    const slug = relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
    
    return {
      slug,
      title: data.Title || data.title || slug,
      meta: data.meta,
      uniqueId: data['unique id'],
      content,
      frontmatter: data,
      category,
    };
  });
}

export function getContentBySlug(category: string, slug: string): ContentItem | null {
  try {
    let filePath = path.join(contentDirectory, category, `${slug}.md`);
    
    if (!fs.existsSync(filePath)) {
      // Try nested structure for jobs
      const files = getAllMarkdownFiles(path.join(contentDirectory, category));
      const matchingFile = files.find(file => {
        const relativePath = path.relative(path.join(contentDirectory, category), file);
        return relativePath.replace(/\.md$/, '').replace(/\\/g, '/') === slug;
      });
      
      if (!matchingFile) return null;
      filePath = matchingFile;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.Title || data.title || slug,
      meta: data.meta,
      uniqueId: data['unique id'],
      content,
      frontmatter: data,
      category,
    };
  } catch (error) {
    console.error(`Error loading content for ${category}/${slug}:`, error);
    return null;
  }
}

function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = [];
  
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

export function getAllSlugs(category: string): string[] {
  const categoryPath = path.join(contentDirectory, category);
  const files = getAllMarkdownFiles(categoryPath);
  
  return files.map((filePath) => {
    const relativePath = path.relative(categoryPath, filePath);
    return relativePath.replace(/\.md$/, '').replace(/\\/g, '/');
  });
}