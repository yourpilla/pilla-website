import { kvStore } from './kv-store';

export interface FAQData {
  uid: string;
  title: string;
  slug: string;
  meta?: string;
  summary?: string;
  content: string;
  fullContent: string;
}

export interface FAQMatch {
  faq: FAQData;
  similarity: number;
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

// Get FAQ content by UID
export async function getFAQContent(uid: string): Promise<FAQData | null> {
  try {
    const contentKey = `faq:content:${uid}`;
    const result = await kvStore.get(contentKey);
    
    if (!result) return null;
    
    return JSON.parse(result) as FAQData;
  } catch (error) {
    console.error(`Error getting FAQ content for ${uid}:`, error);
    return null;
  }
}

// Get FAQ embedding by UID
export async function getFAQEmbedding(uid: string): Promise<number[] | null> {
  try {
    const embeddingKey = `faq:embedding:${uid}`;
    const result = await kvStore.get(embeddingKey);
    
    if (!result) return null;
    
    return JSON.parse(result) as number[];
  } catch (error) {
    console.error(`Error getting FAQ embedding for ${uid}:`, error);
    return null;
  }
}

// Get all FAQ UIDs (for scanning embeddings)
export async function getAllFAQUIDs(): Promise<string[]> {
  try {
    const pattern = 'faq:content:*';
    const keys = await kvStore.scan(pattern);
    
    return keys.map(key => key.replace('faq:content:', ''));
  } catch (error) {
    console.error('Error getting all FAQ UIDs:', error);
    return [];
  }
}

// Find similar FAQs using vector similarity
export async function findSimilarFAQs(
  queryEmbedding: number[], 
  limit: number = 5, 
  minSimilarity: number = 0.3
): Promise<FAQMatch[]> {
  try {
    const allUIDs = await getAllFAQUIDs();
    const matches: FAQMatch[] = [];

    for (const uid of allUIDs) {
      const [faqEmbedding, faqContent] = await Promise.all([
        getFAQEmbedding(uid),
        getFAQContent(uid)
      ]);

      if (faqEmbedding && faqContent) {
        const similarity = cosineSimilarity(queryEmbedding, faqEmbedding);
        
        if (similarity >= minSimilarity) {
          matches.push({
            faq: faqContent,
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
    console.error('Error finding similar FAQs:', error);
    return [];
  }
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