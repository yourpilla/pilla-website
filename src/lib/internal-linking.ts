import { getContentByCategory } from './content';
import fs from 'fs';
import path from 'path';

export interface LinkMapping {
  phrase: string;
  url: string;
  title: string;
  type: 'glossary' | 'faq' | 'blog';
  priority: number; // Higher = more important links
}

export interface LinkingOptions {
  maxLinksPerPage?: number;
  maxLinksPerPhrase?: number;
  caseSensitive?: boolean;
  skipIfAlreadyLinked?: boolean;
}

class InternalLinkingManager {
  private linkMappings: LinkMapping[] = [];
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    console.log('🔗 Initializing internal linking system...');
    
    this.linkMappings = [
      // Custom phrase mappings (from JSON files)
      ...await this.loadCustomPhraseMappings(),
      // Auto-generated mappings (as fallback)
      ...await this.buildGlossaryMappings(),
      ...await this.buildFAQMappings(), 
      ...await this.buildBlogMappings()
    ];

    // Remove duplicates (custom phrases override auto-generated)
    const seenPhrases = new Set<string>();
    this.linkMappings = this.linkMappings.filter(mapping => {
      const key = `${mapping.phrase.toLowerCase()}:${mapping.url}`;
      if (seenPhrases.has(key)) return false;
      seenPhrases.add(key);
      return true;
    });

    // Sort by priority (higher priority first)
    this.linkMappings.sort((a, b) => b.priority - a.priority);
    
    console.log(`✅ Internal linking initialized with ${this.linkMappings.length} phrase mappings`);
    this.initialized = true;
  }

  private async loadCustomPhraseMappings(): Promise<LinkMapping[]> {
    const mappings: LinkMapping[] = [];
    const phrasesDir = path.join(process.cwd(), 'content', 'internal-links');

    try {
      // Load glossary phrases
      const glossaryPath = path.join(phrasesDir, 'glossary-phrases.json');
      if (fs.existsSync(glossaryPath)) {
        const glossaryPhrases = JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
        for (const [key, config] of Object.entries(glossaryPhrases)) {
          const item = config as any;
          for (const phrase of item.phrases) {
            mappings.push({
              phrase,
              url: item.url,
              title: item.title,
              type: 'glossary',
              priority: item.priority || 10
            });
          }
        }
      }

      // Load FAQ phrases
      const faqPath = path.join(phrasesDir, 'faq-phrases.json');
      if (fs.existsSync(faqPath)) {
        const faqPhrases = JSON.parse(fs.readFileSync(faqPath, 'utf8'));
        for (const [key, config] of Object.entries(faqPhrases)) {
          const item = config as any;
          for (const phrase of item.phrases) {
            mappings.push({
              phrase,
              url: item.url,
              title: item.title,
              type: 'faq',
              priority: item.priority || 6
            });
          }
        }
      }

      // Load blog phrases  
      const blogPath = path.join(phrasesDir, 'blog-phrases.json');
      if (fs.existsSync(blogPath)) {
        const blogPhrases = JSON.parse(fs.readFileSync(blogPath, 'utf8'));
        for (const [key, config] of Object.entries(blogPhrases)) {
          const item = config as any;
          for (const phrase of item.phrases) {
            mappings.push({
              phrase,
              url: item.url,
              title: item.title,
              type: 'blog',
              priority: item.priority || 4
            });
          }
        }
      }

      console.log(`📁 Loaded ${mappings.length} custom phrase mappings`);
    } catch (error) {
      console.warn('⚠️ Could not load custom phrase mappings:', error);
    }

    return mappings;
  }

  private async buildGlossaryMappings(): Promise<LinkMapping[]> {
    const glossaries = getContentByCategory('glossary');
    const mappings: LinkMapping[] = [];

    for (const glossary of glossaries) {
      // Main title mapping (highest priority)
      mappings.push({
        phrase: glossary.title,
        url: `/glossary/${glossary.slug}`,
        title: glossary.title,
        type: 'glossary',
        priority: 10
      });

      // Extract additional phrases from content
      const additionalPhrases = this.extractPhrasesFromGlossary(glossary);
      for (const phrase of additionalPhrases) {
        mappings.push({
          phrase,
          url: `/glossary/${glossary.slug}`,
          title: glossary.title,
          type: 'glossary',
          priority: 8
        });
      }
    }

    return mappings;
  }

  private async buildFAQMappings(): Promise<LinkMapping[]> {
    const faqs = getContentByCategory('answers');
    const mappings: LinkMapping[] = [];

    for (const faq of faqs) {
      // Extract key phrases from FAQ titles and content
      const phrases = this.extractPhrasesFromFAQ(faq);
      
      for (const phrase of phrases) {
        mappings.push({
          phrase,
          url: `/answers/${faq.slug}`,
          title: faq.title,
          type: 'faq',
          priority: 6
        });
      }
    }

    return mappings;
  }

  private async buildBlogMappings(): Promise<LinkMapping[]> {
    const blogs = getContentByCategory('blog');
    const mappings: LinkMapping[] = [];

    for (const blog of blogs) {
      // Extract key phrases from blog titles
      const phrases = this.extractPhrasesFromBlog(blog);
      
      for (const phrase of phrases) {
        mappings.push({
          phrase,
          url: `/blog/${blog.slug}`,
          title: blog.title,
          type: 'blog',
          priority: 4
        });
      }
    }

    return mappings;
  }

  private extractPhrasesFromGlossary(glossary: any): string[] {
    const phrases: string[] = [];
    
    // For glossary terms like "86", also add common variations
    const title = glossary.title.toLowerCase();
    
    // Add the term itself
    phrases.push(glossary.title);
    
    // Add quoted versions for slang terms
    if (title.match(/^[\d\w]+$/) && title.length <= 3) {
      phrases.push(`"${glossary.title}"`);
      phrases.push(`'${glossary.title}'`);
    }
    
    // Extract phrases from meta description
    if (glossary.meta) {
      const metaPhrases = this.extractKeyPhrasesFromText(glossary.meta);
      phrases.push(...metaPhrases);
    }

    // Extract from first paragraph of content
    if (glossary.content) {
      const firstParagraph = glossary.content.split('\n')[0];
      const contentPhrases = this.extractKeyPhrasesFromText(firstParagraph);
      phrases.push(...contentPhrases.slice(0, 3)); // Limit to avoid over-linking
    }

    return phrases.filter(phrase => phrase.length >= 2 && phrase.length <= 50);
  }

  private extractPhrasesFromFAQ(faq: any): string[] {
    const phrases: string[] = [];
    
    // Extract key phrases from title (remove question words)
    const cleanTitle = faq.title
      .replace(/^(how|what|when|where|why|which|who)\s+/i, '')
      .replace(/\?$/, '');
    
    const titlePhrases = this.extractKeyPhrasesFromText(cleanTitle);
    phrases.push(...titlePhrases);

    // Extract from meta description
    if (faq.meta) {
      const metaPhrases = this.extractKeyPhrasesFromText(faq.meta);
      phrases.push(...metaPhrases.slice(0, 2));
    }

    return phrases.filter(phrase => phrase.length >= 3 && phrase.length <= 40);
  }

  private extractPhrasesFromBlog(blog: any): string[] {
    const phrases: string[] = [];
    
    // Extract key phrases from title
    const titlePhrases = this.extractKeyPhrasesFromText(blog.title);
    phrases.push(...titlePhrases);

    // Add category as a phrase if available
    if (blog['secondary tag']) {
      phrases.push(blog['secondary tag']);
    }

    return phrases.filter(phrase => phrase.length >= 3 && phrase.length <= 35);
  }

  private extractKeyPhrasesFromText(text: string): string[] {
    // Remove common words and extract meaningful phrases
    const commonWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could', 'should'];
    
    // Extract noun phrases and compound terms
    const phrases: string[] = [];
    
    // Split by common delimiters
    const segments = text.split(/[,;.!?]/);
    
    for (const segment of segments) {
      const words = segment.trim().split(/\s+/).filter(word => 
        word.length > 2 && 
        !commonWords.includes(word.toLowerCase()) &&
        /^[a-zA-Z0-9\-']+$/.test(word)
      );
      
      // Add 2-3 word phrases
      for (let i = 0; i < words.length - 1; i++) {
        if (i < words.length - 1) {
          phrases.push(`${words[i]} ${words[i + 1]}`);
        }
        if (i < words.length - 2) {
          phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
        }
      }
      
      // Add individual significant words
      phrases.push(...words);
    }
    
    return [...new Set(phrases)]; // Remove duplicates
  }

  async processContent(
    html: string, 
    currentUrl: string, 
    options: LinkingOptions = {}
  ): Promise<string> {
    await this.initialize();

    const opts: Required<LinkingOptions> = {
      maxLinksPerPage: 10,
      maxLinksPerPhrase: 1,
      caseSensitive: false,
      skipIfAlreadyLinked: true,
      ...options
    };

    let processedHtml = html;
    let linksAdded = 0;
    const usedPhrases = new Set<string>();

    // Filter out links to current page
    const availableMappings = this.linkMappings.filter(mapping => 
      mapping.url !== currentUrl && 
      !currentUrl.includes(mapping.url) &&
      !mapping.url.includes(currentUrl)
    );

    for (const mapping of availableMappings) {
      if (linksAdded >= opts.maxLinksPerPage) break;
      if (usedPhrases.has(mapping.phrase.toLowerCase())) continue;

      const regex = new RegExp(
        `\\b${this.escapeRegex(mapping.phrase)}\\b`,
        opts.caseSensitive ? 'g' : 'gi'
      );

      // Check if phrase exists and isn't already linked
      const matches = processedHtml.match(regex);
      if (!matches) continue;

      // Skip if already inside a link tag
      if (opts.skipIfAlreadyLinked) {
        const hasExistingLink = /<a[^>]*>[^<]*${this.escapeRegex(mapping.phrase)}[^<]*<\/a>/i.test(processedHtml);
        if (hasExistingLink) continue;
      }

      // Replace first occurrence with link
      let replacementCount = 0;
      processedHtml = processedHtml.replace(regex, (match) => {
        if (replacementCount >= opts.maxLinksPerPhrase) return match;
        
        // Don't replace if inside existing HTML tags
        const beforeMatch = processedHtml.substring(0, processedHtml.indexOf(match));
        const openTags = (beforeMatch.match(/<[^\/][^>]*>/g) || []).length;
        const closeTags = (beforeMatch.match(/<\/[^>]*>/g) || []).length;
        
        if (openTags !== closeTags) return match; // Inside a tag
        
        replacementCount++;
        linksAdded++;
        usedPhrases.add(mapping.phrase.toLowerCase());
        
        return `<a href="${mapping.url}" title="${mapping.title}" class="internal-link">${match}</a>`;
      });
    }

    return processedHtml;
  }

  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Get mappings for debugging/admin
  async getMappings(): Promise<LinkMapping[]> {
    await this.initialize();
    return this.linkMappings;
  }

  // Refresh mappings when content changes
  async refresh(): Promise<void> {
    this.initialized = false;
    await this.initialize();
  }
}

// Singleton instance
export const internalLinkingManager = new InternalLinkingManager();