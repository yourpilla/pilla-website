import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';
import { kvStore } from '@/lib/kv-store';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// Admin API key protection
function validateAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get('X-Admin-Key');
  const expectedKey = process.env.ADMIN_API_KEY;
  
  if (!expectedKey) {
    console.warn('ADMIN_API_KEY not set - admin endpoints are unprotected');
    return true; // Allow access if no key is configured
  }
  
  return adminKey === expectedKey;
}

interface ProcessingStats {
  processed: number;
  errors: number;
  skipped: number;
  newEmbeddings: number;
  updatedEmbeddings: number;
}

async function getFAQFileModifiedTime(filePath: string): Promise<number> {
  try {
    const stats = fs.statSync(filePath);
    return stats.mtime.getTime();
  } catch {
    return 0;
  }
}

async function getStoredFAQMetadata(uid: string): Promise<{ modifiedTime: number } | null> {
  try {
    const result = await kvStore.get(`faq:meta:${uid}`);
    return result ? JSON.parse(result) : null;
  } catch {
    return null;
  }
}

async function setStoredFAQMetadata(uid: string, metadata: { modifiedTime: number }): Promise<void> {
  try {
    await kvStore.set(`faq:meta:${uid}`, JSON.stringify(metadata));
  } catch (error) {
    console.error(`Failed to store metadata for ${uid}:`, error);
  }
}

export async function POST(request: NextRequest) {
  // Validate admin access
  if (!validateAdminKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { success: false, error: 'OpenAI API key not configured' },
      { status: 500 }
    );
  }

  const { forceRebuild = false } = await request.json().catch(() => ({}));

  try {
    const answersDir = path.join(process.cwd(), 'content', 'answers');
    const blogDir = path.join(process.cwd(), 'content', 'blog');
    
    // Check directories exist
    const directories = [
      { path: answersDir, type: 'answers' },
      { path: blogDir, type: 'blog' }
    ].filter(dir => fs.existsSync(dir.path));

    if (directories.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No content directories found' },
        { status: 404 }
      );
    }

    // Collect all content files
    const contentFiles: Array<{ file: string, dir: string, type: 'faq' | 'blog' }> = [];
    
    for (const { path: dirPath, type } of directories) {
      const files = fs.readdirSync(dirPath)
        .filter(file => file.endsWith('.md'))
        .map(file => ({ file, dir: dirPath, type: type === 'answers' ? 'faq' as const : 'blog' as const }));
      
      contentFiles.push(...files);
    }

    const stats: ProcessingStats = {
      processed: 0,
      errors: 0,
      skipped: 0,
      newEmbeddings: 0,
      updatedEmbeddings: 0
    };

    console.log(`🚀 Processing ${contentFiles.length} content files (${directories.map(d => `${d.type}: ${fs.readdirSync(d.path).filter(f => f.endsWith('.md')).length}`).join(', ')}) (forceRebuild: ${forceRebuild})`);

    for (const { file, dir, type } of contentFiles) {
      try {
        const filePath = path.join(dir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        const { data: frontmatter, content: markdownContent } = matter(content);

        const contentData = {
          uid: frontmatter['unique id'],
          title: frontmatter.title,
          slug: file.replace('.md', ''),
          meta: frontmatter.meta,
          summary: frontmatter.summary,
          content: markdownContent.substring(0, 2000),
          fullContent: markdownContent,
          type: type, // 'faq' or 'blog'
          category: frontmatter['secondary tag'] || null
        };

        if (!contentData.uid) {
          console.warn(`⚠️ No UID found for ${file} (${type}), skipping...`);
          stats.skipped++;
          continue;
        }

        // Check if we need to process this content
        const fileModifiedTime = await getFAQFileModifiedTime(filePath);
        const storedMetadata = await getStoredFAQMetadata(contentData.uid);
        
        const needsUpdate = forceRebuild || 
          !storedMetadata || 
          storedMetadata.modifiedTime < fileModifiedTime;

        if (!needsUpdate) {
          stats.skipped++;
          continue;
        }

        // Generate embedding
        const embeddingText = [
          contentData.title,
          contentData.meta,
          contentData.summary,
          contentData.content,
          contentData.type === 'blog' ? `Category: ${contentData.category}` : ''
        ].filter(Boolean).join('\n\n');

        const { embedding } = await embed({
          model: openai.embedding('text-embedding-3-small'),
          value: embeddingText,
        });

        // Store in Redis (use content: prefix for both FAQs and blogs)
        const embeddingKey = `content:embedding:${contentData.uid}`;
        const contentKey = `content:data:${contentData.uid}`;

        await Promise.all([
          kvStore.set(embeddingKey, JSON.stringify(embedding)),
          kvStore.set(contentKey, JSON.stringify(contentData)),
          setStoredFAQMetadata(contentData.uid, { modifiedTime: fileModifiedTime })
        ]);

        if (!storedMetadata) {
          stats.newEmbeddings++;
        } else {
          stats.updatedEmbeddings++;
        }

        stats.processed++;
        
        if (stats.processed % 10 === 0) {
          console.log(`✅ Processed ${stats.processed}/${faqFiles.length} FAQs`);
        }

        // Small delay to avoid rate limits (OpenAI has 5000 RPM limit)
        await new Promise(resolve => setTimeout(resolve, 15));

      } catch (error) {
        console.error(`❌ Error processing ${file}:`, error);
        stats.errors++;
      }
    }

    // Update generation metadata
    const metadata = {
      generatedAt: new Date().toISOString(),
      totalFAQs: faqFiles.length,
      processed: stats.processed,
      errors: stats.errors,
      skipped: stats.skipped,
      embeddingModel: 'text-embedding-3-small',
      version: '2.0'
    };

    await kvStore.set('faq:embeddings:metadata', JSON.stringify(metadata));

    console.log('📊 Generation complete:', stats);

    return NextResponse.json({
      success: true,
      data: {
        ...stats,
        totalFiles: faqFiles.length,
        metadata
      }
    });

  } catch (error) {
    console.error('💥 Embedding generation failed:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

// GET endpoint to check generation status
export async function GET(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const result = await kvStore.get('faq:embeddings:metadata');
    const metadata = result ? JSON.parse(result) : null;

    return NextResponse.json({
      success: true,
      data: {
        hasEmbeddings: !!metadata,
        metadata
      }
    });

  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to check embedding status' },
      { status: 500 }
    );
  }
}