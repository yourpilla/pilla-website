import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

// Cache for cluster mappings to avoid repeated file reads
const clusterCache = new Map<string, string>();
const faqToClusterCache = new Map<string, string>();

export async function getClusterFromPath(pathname: string): Promise<string | null> {
  try {
    if (pathname.startsWith('/blog/')) {
      // For blog pages, the cluster ID is the slug
      const slug = pathname.replace('/blog/', '').replace(/\/$/, '');
      return slug;
    }
    
    if (pathname.startsWith('/answers/')) {
      // For FAQ pages, we need to find which blog references this FAQ
      const faqSlug = pathname.replace('/answers/', '').replace(/\/$/, '');
      return await findClusterForFAQ(faqSlug);
    }
    
    return null;
  } catch (error) {
    console.error('Error determining cluster from path:', pathname, error);
    return null;
  }
}

async function findClusterForFAQ(faqSlug: string): Promise<string | null> {
  // Check cache first
  if (faqToClusterCache.has(faqSlug)) {
    return faqToClusterCache.get(faqSlug)!;
  }

  try {
    // Read the FAQ file to get its UID
    const faqPath = path.join(process.cwd(), 'content', 'answers', `${faqSlug}.md`);
    if (!fs.existsSync(faqPath)) {
      return null;
    }

    const faqContent = fs.readFileSync(faqPath, 'utf8');
    const faqMatter = matter(faqContent);
    const faqUID = faqMatter.data['unique id'];

    if (!faqUID) {
      return null;
    }

    // Find which blog references this FAQ UID
    const blogsDir = path.join(process.cwd(), 'content', 'blog');
    if (!fs.existsSync(blogsDir)) {
      return null;
    }

    const blogFiles = fs.readdirSync(blogsDir).filter(file => file.endsWith('.md'));
    
    for (const blogFile of blogFiles) {
      const blogPath = path.join(blogsDir, blogFile);
      const blogContent = fs.readFileSync(blogPath, 'utf8');
      const blogMatter = matter(blogContent);
      
      const questions = blogMatter.data.questions;
      if (questions && typeof questions === 'string') {
        // Parse comma-separated UIDs and check if our FAQ UID is in there
        const questionUIDs = questions.split(',').map(uid => uid.trim());
        if (questionUIDs.includes(faqUID)) {
          const clusterSlug = blogMatter.data.slug || blogFile.replace('.md', '');
          
          // Cache the result
          faqToClusterCache.set(faqSlug, clusterSlug);
          return clusterSlug;
        }
      }
    }

    return null;
  } catch (error) {
    console.error('Error finding cluster for FAQ:', faqSlug, error);
    return null;
  }
}

export function clearClusterCache() {
  clusterCache.clear();
  faqToClusterCache.clear();
}