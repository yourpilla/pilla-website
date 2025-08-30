import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

// Map blog frontmatter categories to your category pages
const BLOG_CATEGORY_MAPPING: Record<string, {
  slug: string;
  title: string;
  href: string;
}> = {
  'Food Hygiene': {
    slug: 'food-safety-management-system',
    title: 'Food Safety Management System',
    href: '/blog/food-safety-management-system'
  },
  'Health & Safety': {
    slug: 'hospitality-risks',
    title: 'Hospitality Risk Management',
    href: '/blog/hospitality-risks'
  },
  'Operations': {
    slug: 'operations',
    title: 'Operations Management',
    href: '/blog/operations'
  },
  'Interviews': {
    slug: 'interviews',
    title: 'Interview Techniques',
    href: '/blog/interviews'
  },
  'Job Roles': {
    slug: 'hospitality-job-roles',
    title: 'Hospitality Job Roles',
    href: '/blog/hospitality-job-roles'
  },
  'Staff Onboarding': {
    slug: 'restaurant-staff-onboarding',
    title: 'Staff Onboarding',
    href: '/blog/restaurant-staff-onboarding'
  }
};

export interface ContentItem {
  slug: string;
  title: string;
  meta?: string;
  uniqueId?: string;
  content: string;
  frontmatter: Record<string, unknown>;
  category: string;
  featured?: boolean;
  blogCategory?: {
    slug: string;
    title: string;
    href: string;
  };
}

export interface TestimonialItem extends ContentItem {
  name: string;
  role?: string;
  company?: string;
  imageUrl?: string;
  platform: string;
  platformUrl: string;
  platformLogo: string;
  priority?: number;
}

export function getContentByCategory(category: 'blog' | 'jobs' | 'glossary' | 'legal' | 'tools' | 'answers' | 'testimonials'): ContentItem[] {
  const categoryPath = path.join(contentDirectory, category);
  
  if (!fs.existsSync(categoryPath)) {
    return [];
  }

  const files = getAllMarkdownFiles(categoryPath);
  
  return files.map((filePath) => {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    
    // Use only the filename for the slug, ignoring folder structure
    const slug = path.basename(filePath, '.md');
    
    // For blog posts, map secondary tag to blog category
    let blogCategory;
    if (category === 'blog' && data['secondary tag']) {
      blogCategory = BLOG_CATEGORY_MAPPING[data['secondary tag'] as string];
    }
    
    return {
      slug,
      title: data.Title || data.title || slug,
      meta: data.meta,
      uniqueId: data['unique id'],
      content,
      frontmatter: data,
      category,
      featured: data.featured === true,
      blogCategory,
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
    
    // For blog posts, map secondary tag to blog category
    let blogCategory;
    if (category === 'blog' && data['secondary tag']) {
      blogCategory = BLOG_CATEGORY_MAPPING[data['secondary tag'] as string];
    }
    
    return {
      slug,
      title: data.Title || data.title || slug,
      meta: data.meta,
      uniqueId: data['unique id'],
      content,
      frontmatter: data,
      category,
      featured: data.featured === true,
      blogCategory,
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
    // Use only the filename for the slug, ignoring folder structure
    return path.basename(filePath, '.md');
  });
}

// Get all blog posts for a specific blog category
export function getBlogsByCategory(categorySlug: string): ContentItem[] {
  const allBlogs = getContentByCategory('blog');
  
  const categoryBlogs = allBlogs.filter(blog => 
    blog.blogCategory?.slug === categorySlug
  );
  
  // Sort by featured status (featured first), then alphabetically by title
  return categoryBlogs.sort((a, b) => {
    // Featured posts come first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // If both are featured or both are not featured, sort alphabetically
    return a.title.localeCompare(b.title);
  });
}

// Get FAQ content by UID
export function getFAQByUID(uid: string): ContentItem | null {
  const allAnswers = getContentByCategory('answers');
  
  const faq = allAnswers.find(answer => 
    answer.uniqueId === uid || answer.frontmatter['unique id'] === uid
  );
  
  return faq || null;
}

// Get multiple FAQs by array of UIDs
export function getFAQsByUIDs(uids: string[]): ContentItem[] {
  if (!Array.isArray(uids) || uids.length === 0) {
    return [];
  }
  
  const faqs: ContentItem[] = [];
  
  for (const uid of uids) {
    const faq = getFAQByUID(uid);
    if (faq) {
      faqs.push(faq);
    }
  }
  
  return faqs;
}

// Get all testimonials with proper typing and sorting
export function getTestimonials(): TestimonialItem[] {
  const testimonials = getContentByCategory('testimonials');
  
  return testimonials.map(item => ({
    ...item,
    name: item.frontmatter.name as string || item.title,
    role: item.frontmatter.role as string,
    company: item.frontmatter.company as string,
    imageUrl: item.frontmatter.imageUrl as string,
    platform: item.frontmatter.platform as string,
    platformUrl: item.frontmatter.platformUrl as string,
    platformLogo: item.frontmatter.platformLogo as string,
    priority: item.frontmatter.priority as number || 0,
  } as TestimonialItem))
  .sort((a, b) => {
    // Featured testimonials first
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    
    // Then by priority (higher first)
    if (a.priority !== b.priority) return (b.priority || 0) - (a.priority || 0);
    
    // Finally alphabetically by name
    return a.name.localeCompare(b.name);
  });
}

// Get featured testimonial
export function getFeaturedTestimonial(): TestimonialItem | null {
  const testimonials = getTestimonials();
  return testimonials.find(t => t.featured) || testimonials[0] || null;
}

// Get non-featured testimonials for masonry layout
export function getRegularTestimonials(): TestimonialItem[] {
  const testimonials = getTestimonials();
  return testimonials.filter(t => !t.featured);
}

// Get footer testimonials
export function getFooterTestimonials(): TestimonialItem[] {
  const testimonials = getTestimonials();
  return testimonials.filter(t => t.frontmatter.footer === true);
}