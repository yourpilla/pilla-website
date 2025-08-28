import { kvStore } from './kv-store';

export interface ContentData {
  uid: string;
  title: string;
  slug: string;
  meta?: string;
  summary?: string;
  content: string;
  fullContent: string;
  type: 'faq' | 'blog';
  category?: string;
}

// Legacy interface for backward compatibility
export interface FAQData extends ContentData {
  type: 'faq';
}

export interface ContentMatch {
  content: ContentData;
  similarity: number;
}

// Legacy interface for backward compatibility
export interface FAQMatch extends ContentMatch {
  faq: FAQData;
  content: FAQData;
}

// Calculate cosine similarity between two vectors
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }

  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

// Get content by UID (FAQs and blogs)
export async function getContentData(uid: string): Promise<ContentData | null> {
  try {
    // Try new format first
    let contentKey = `content:data:${uid}`;
    let result = await kvStore.get(contentKey);
    
    // Fallback to old FAQ format for backward compatibility
    if (!result) {
      contentKey = `faq:content:${uid}`;
      result = await kvStore.get(contentKey);
    }
    
    if (!result) return null;
    
    return JSON.parse(result) as ContentData;
  } catch (error) {
    console.error(`Error getting content data for ${uid}:`, error);
    return null;
  }
}

// Legacy function for backward compatibility
export async function getFAQContent(uid: string): Promise<FAQData | null> {
  const content = await getContentData(uid);
  return content?.type === 'faq' ? content as FAQData : null;
}

// Get content embedding by UID
export async function getContentEmbedding(uid: string): Promise<number[] | null> {
  try {
    // Try new format first
    let embeddingKey = `content:embedding:${uid}`;
    let result = await kvStore.get(embeddingKey);
    
    // Fallback to old FAQ format for backward compatibility
    if (!result) {
      embeddingKey = `faq:embedding:${uid}`;
      result = await kvStore.get(embeddingKey);
    }
    
    if (!result) return null;
    
    return JSON.parse(result) as number[];
  } catch (error) {
    console.error(`Error getting content embedding for ${uid}:`, error);
    return null;
  }
}

// Legacy function for backward compatibility
export async function getFAQEmbedding(uid: string): Promise<number[] | null> {
  return getContentEmbedding(uid);
}

// Get all content UIDs (for scanning embeddings)
export async function getAllContentUIDs(): Promise<string[]> {
  try {
    // Get both new and old format keys
    const [newKeys, oldKeys] = await Promise.all([
      kvStore.scan('content:data:*'),
      kvStore.scan('faq:content:*')
    ]);
    
    const newUIDs = newKeys.map(key => key.replace('content:data:', ''));
    const oldUIDs = oldKeys.map(key => key.replace('faq:content:', ''));
    
    // Combine and deduplicate
    return [...new Set([...newUIDs, ...oldUIDs])];
  } catch (error) {
    console.error('Error getting all content UIDs:', error);
    return [];
  }
}

// Legacy function for backward compatibility
export async function getAllFAQUIDs(): Promise<string[]> {
  return getAllContentUIDs();
}

// Find similar content using vector similarity
export async function findSimilarContent(
  queryEmbedding: number[], 
  limit: number = 5, 
  minSimilarity: number = 0.3,
  contentType?: 'faq' | 'blog'
): Promise<ContentMatch[]> {
  try {
    const allUIDs = await getAllContentUIDs();
    const matches: ContentMatch[] = [];

    for (const uid of allUIDs) {
      const [contentEmbedding, contentData] = await Promise.all([
        getContentEmbedding(uid),
        getContentData(uid)
      ]);

      if (contentEmbedding && contentData) {
        // Filter by content type if specified
        if (contentType && contentData.type !== contentType) {
          continue;
        }

        const similarity = cosineSimilarity(queryEmbedding, contentEmbedding);
        
        if (similarity >= minSimilarity) {
          matches.push({
            content: contentData,
            similarity
          });
        }
      }
    }

    // Sort by similarity (highest first) and limit results
    return matches
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

  } catch (error) {
    console.error('Error finding similar content:', error);
    return [];
  }
}

// Legacy function for backward compatibility
export async function findSimilarFAQs(
  queryEmbedding: number[], 
  limit: number = 5, 
  minSimilarity: number = 0.3
): Promise<FAQMatch[]> {
  const matches = await findSimilarContent(queryEmbedding, limit, minSimilarity, 'faq');
  return matches.map(match => ({
    faq: match.content as FAQData,
    content: match.content as FAQData,
    similarity: match.similarity
  }));
}

// Get embedding generation metadata
export async function getEmbeddingMetadata(): Promise<{
  generatedAt: string;
  totalFAQs: number;
  errors: number;
  embeddingModel: string;
  version: string;
} | null> {
  try {
    const result = await kvStore.get('faq:embeddings:metadata');
    return result ? JSON.parse(result) : null;
  } catch (error) {
    console.error('Error getting embedding metadata:', error);
    return null;
  }
}