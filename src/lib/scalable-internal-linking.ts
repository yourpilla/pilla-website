import { kvStore } from './kv-store';
import { getContentByCategory } from './content';
import fs from 'fs';
import path from 'path';

export interface ScalableLinkMapping {
  phrase: string;
  url: string;
  title: string;
  type: 'glossary' | 'faq' | 'blog';
  priority: number;
  pageCount?: number; // How many pages contain this phrase
}

export interface LinkingCache {
  mappings: ScalableLinkMapping[];
  lastUpdated: string;
  totalPages: number;
  totalPhrases: number;
}

class ScalableInternalLinkingManager {
  private readonly CACHE_KEY = 'internal_links:cache';
  private readonly PHRASE_INDEX_KEY = 'internal_links:phrase_index';
  private readonly CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours
  private cache: LinkingCache | null = null;
  private phraseIndex: Map<string, ScalableLinkMapping[]> = new Map();

  // Pre-compute all phrases and store in Redis
  async buildPhraseIndex(): Promise<void> {
    console.log('🏗️ Building scalable phrase index for 15,000+ pages...');
    
    const startTime = Date.now();
    const allMappings: ScalableLinkMapping[] = [];

    // Load custom phrases (high priority)
    const customMappings = await this.loadCustomPhraseMappings();
    allMappings.push(...customMappings);

    // Load auto-generated phrases (lower priority, as fallback)
    const autoMappings = await this.generateAutoPhrases();
    allMappings.push(...autoMappings);

    // Remove duplicates (custom overrides auto)
    const uniqueMappings = this.deduplicateMappings(allMappings);

    // Build efficient phrase index
    const phraseIndex: { [phrase: string]: ScalableLinkMapping[] } = {};
    
    for (const mapping of uniqueMappings) {
      const normalizedPhrase = mapping.phrase.toLowerCase().trim();
      
      if (!phraseIndex[normalizedPhrase]) {
        phraseIndex[normalizedPhrase] = [];
      }
      
      phraseIndex[normalizedPhrase].push(mapping);
    }

    // Sort each phrase group by priority
    for (const phrase in phraseIndex) {
      phraseIndex[phrase].sort((a, b) => b.priority - a.priority);
    }

    // Create cache object
    const cache: LinkingCache = {
      mappings: uniqueMappings,
      lastUpdated: new Date().toISOString(),
      totalPages: await this.getTotalPageCount(),
      totalPhrases: Object.keys(phraseIndex).length
    };

    // Store in Redis with compression
    await kvStore.set(this.CACHE_KEY, JSON.stringify(cache));
    await kvStore.set(this.PHRASE_INDEX_KEY, JSON.stringify(phraseIndex));

    console.log(`✅ Phrase index built in ${Date.now() - startTime}ms`);
    console.log(`📊 ${cache.totalPages} pages, ${cache.totalPhrases} unique phrases`);

    this.cache = cache;
    this.phraseIndex = new Map(Object.entries(phraseIndex));
  }

  // Fast phrase lookup for a specific page
  async getLinksForContent(
    content: string, 
    currentUrl: string, 
    maxLinks: number = 10
  ): Promise<Array<{ phrase: string; url: string; title: string; type: string }>> {
    await this.ensureCacheLoaded();
    
    const foundLinks: Array<{ phrase: string; url: string; title: string; type: string }> = [];
    const usedPhrases = new Set<string>();
    
    // Convert content to lowercase for matching
    const lowerContent = content.toLowerCase();
    
    // Only check phrases that actually appear in the content
    const candidatePhrases = Array.from(this.phraseIndex.keys()).filter(phrase => 
      lowerContent.includes(phrase)
    );

    // Sort candidate phrases by priority and length (longer phrases first)
    candidatePhrases.sort((a, b) => {
      const mappingsA = this.phraseIndex.get(a) || [];
      const mappingsB = this.phraseIndex.get(b) || [];
      const priorityA = mappingsA[0]?.priority || 0;
      const priorityB = mappingsB[0]?.priority || 0;
      
      if (priorityA !== priorityB) return priorityB - priorityA;
      return b.length - a.length; // Longer phrases first
    });

    for (const phrase of candidatePhrases) {
      if (foundLinks.length >= maxLinks) break;
      if (usedPhrases.has(phrase)) continue;

      const mappings = this.phraseIndex.get(phrase) || [];
      const validMapping = mappings.find(m => 
        m.url !== currentUrl && 
        !currentUrl.includes(m.url) &&
        !m.url.includes(currentUrl)
      );

      if (validMapping) {
        foundLinks.push({
          phrase: validMapping.phrase,
          url: validMapping.url,
          title: validMapping.title,
          type: validMapping.type
        });
        usedPhrases.add(phrase);
      }
    }

    return foundLinks;
  }

  // Optimized content processing
  async processContentFast(
    html: string, 
    currentUrl: string, 
    maxLinks: number = 10
  ): Promise<string> {
    const links = await this.getLinksForContent(html, currentUrl, maxLinks);
    
    if (links.length === 0) return html;

    let processedHtml = html;
    
    for (const link of links) {
      const regex = new RegExp(`\\b${this.escapeRegex(link.phrase)}\\b`, 'gi');
      
      // Replace only first occurrence
      let replaced = false;
      processedHtml = processedHtml.replace(regex, (match) => {
        if (replaced) return match;
        
        // Don't replace if inside existing HTML tags
        const beforeMatch = processedHtml.substring(0, processedHtml.indexOf(match));
        const openTags = (beforeMatch.match(/<[^\/][^>]*>/g) || []).length;
        const closeTags = (beforeMatch.match(/<\/[^>]*>/g) || []).length;
        
        if (openTags !== closeTags) return match;
        
        replaced = true;
        return `<a href="${link.url}" title="${link.title}" class="internal-link">${match}</a>`;
      });
    }

    return processedHtml;
  }

  // Check if cache needs refresh
  async needsRefresh(): Promise<boolean> {
    try {
      const cacheData = await kvStore.get(this.CACHE_KEY);
      if (!cacheData) return true;

      const cache: LinkingCache = JSON.parse(cacheData);
      const lastUpdated = new Date(cache.lastUpdated).getTime();
      const now = Date.now();

      return (now - lastUpdated) > this.CACHE_DURATION;
    } catch {
      return true;
    }
  }

  // Incremental updates for new content
  async addNewContent(contentType: 'glossary' | 'faq' | 'blog', slug: string): Promise<void> {
    console.log(`📝 Adding new ${contentType}: ${slug} to phrase index`);
    
    // This would be called by the file watcher when new content is added
    // For now, trigger a full rebuild (could be optimized later)
    await this.buildPhraseIndex();
  }

  // Load cache from Redis
  private async ensureCacheLoaded(): Promise<void> {
    if (this.cache && this.phraseIndex.size > 0) return;

    try {
      const [cacheData, indexData] = await Promise.all([
        kvStore.get(this.CACHE_KEY),
        kvStore.get(this.PHRASE_INDEX_KEY)
      ]);

      if (cacheData && indexData) {
        this.cache = JSON.parse(cacheData);
        const indexObj = JSON.parse(indexData);
        this.phraseIndex = new Map(Object.entries(indexObj));
        
        console.log(`📚 Loaded phrase cache: ${this.phraseIndex.size} phrases`);
      } else {
        console.log('🏗️ No phrase cache found, building new index...');
        await this.buildPhraseIndex();
      }
    } catch (error) {
      console.error('❌ Failed to load phrase cache:', error);
      await this.buildPhraseIndex();
    }
  }

  private async loadCustomPhraseMappings(): Promise<ScalableLinkMapping[]> {
    // Same as before, but optimized for scale
    const mappings: ScalableLinkMapping[] = [];
    const phrasesDir = path.join(process.cwd(), 'content', 'internal-links');

    const files = ['glossary-phrases.json', 'faq-phrases.json', 'blog-phrases.json'];
    const defaultPriorities = { glossary: 10, faq: 6, blog: 4 };

    for (const file of files) {
      const filePath = path.join(phrasesDir, file);
      if (!fs.existsSync(filePath)) continue;

      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        const type = file.replace('-phrases.json', '') as keyof typeof defaultPriorities;

        for (const [key, config] of Object.entries(data)) {
          const item = config as any;
          for (const phrase of item.phrases) {
            mappings.push({
              phrase,
              url: item.url,
              title: item.title,
              type: type as 'glossary' | 'faq' | 'blog',
              priority: item.priority || defaultPriorities[type]
            });
          }
        }
      } catch (error) {
        console.warn(`⚠️ Error loading ${file}:`, error);
      }
    }

    return mappings;
  }

  private async generateAutoPhrases(): Promise<ScalableLinkMapping[]> {
    const mappings: ScalableLinkMapping[] = [];
    
    // Only generate for top-priority content to avoid overwhelming the index
    const categories = ['glossary', 'answers', 'blog'];
    
    for (const category of categories) {
      const content = getContentByCategory(category);
      const sampleSize = Math.min(content.length, 1000); // Limit auto-generation
      
      for (let i = 0; i < sampleSize; i++) {
        const item = content[i];
        const phrases = this.extractKeyPhrases(item, category);
        
        for (const phrase of phrases.slice(0, 3)) { // Limit phrases per item
          mappings.push({
            phrase,
            url: `/${category === 'answers' ? 'answers' : category}/${item.slug}`,
            title: item.title,
            type: category === 'answers' ? 'faq' : category as 'glossary' | 'blog',
            priority: category === 'glossary' ? 8 : category === 'answers' ? 5 : 3
          });
        }
      }
    }

    return mappings;
  }

  private extractKeyPhrases(item: any, category: string): string[] {
    const phrases: string[] = [];
    
    // Extract 1-3 key phrases per item (focused approach)
    if (item.title) {
      const cleanTitle = item.title
        .replace(/^(how|what|when|where|why|which|who)\s+/i, '')
        .replace(/\?$/, '');
      
      if (cleanTitle.length >= 3 && cleanTitle.length <= 50) {
        phrases.push(cleanTitle);
      }
    }

    // Add category/tag if available
    if (item['secondary tag']) {
      phrases.push(item['secondary tag']);
    }

    return phrases.slice(0, 2); // Max 2 phrases per item
  }

  private deduplicateMappings(mappings: ScalableLinkMapping[]): ScalableLinkMapping[] {
    const seen = new Map<string, ScalableLinkMapping>();
    
    for (const mapping of mappings) {
      const key = `${mapping.phrase.toLowerCase()}:${mapping.url}`;
      
      if (!seen.has(key) || seen.get(key)!.priority < mapping.priority) {
        seen.set(key, mapping);
      }
    }
    
    return Array.from(seen.values());
  }

  private async getTotalPageCount(): Promise<number> {
    try {
      const categories = ['glossary', 'answers', 'blog'];
      let total = 0;
      
      for (const category of categories) {
        const content = getContentByCategory(category);
        total += content.length;
      }
      
      return total;
    } catch {
      return 0;
    }
  }

  private escapeRegex(string: string): string {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // Admin methods
  async getCacheStats(): Promise<any> {
    await this.ensureCacheLoaded();
    
    return {
      cacheLoaded: !!this.cache,
      totalPhrases: this.phraseIndex.size,
      lastUpdated: this.cache?.lastUpdated,
      totalPages: this.cache?.totalPages,
      needsRefresh: await this.needsRefresh()
    };
  }

  async refreshCache(): Promise<void> {
    await this.buildPhraseIndex();
  }
}

// Singleton instance
export const scalableInternalLinkingManager = new ScalableInternalLinkingManager();