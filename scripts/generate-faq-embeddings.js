const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { openai } = require('@ai-sdk/openai');
const { embed } = require('ai');
const { Redis } = require('@upstash/redis');

// Initialize Redis (will use env vars in production)
const redis = process.env.KV_REST_API_URL 
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

async function generateFAQEmbeddings() {
  console.log('🚀 Starting FAQ embedding generation...');
  
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY environment variable is required');
    process.exit(1);
  }

  if (!redis) {
    console.error('❌ Redis connection not available. Run in production or set KV_REST_API_URL');
    process.exit(1);
  }

  const answersDir = path.join(process.cwd(), 'content', 'answers');
  
  if (!fs.existsSync(answersDir)) {
    console.error('❌ FAQ directory not found:', answersDir);
    process.exit(1);
  }

  const faqFiles = fs.readdirSync(answersDir).filter(file => file.endsWith('.md'));
  console.log(`📁 Found ${faqFiles.length} FAQ files`);

  let processed = 0;
  let errors = 0;

  for (const file of faqFiles) {
    try {
      const filePath = path.join(answersDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const { data: frontmatter, content: markdownContent } = matter(content);

      // Extract FAQ data
      const faqData = {
        uid: frontmatter['unique id'],
        title: frontmatter.title,
        slug: file.replace('.md', ''),
        meta: frontmatter.meta,
        summary: frontmatter.summary,
        content: markdownContent.substring(0, 2000), // First 2000 chars
        fullContent: markdownContent
      };

      if (!faqData.uid) {
        console.warn(`⚠️  No UID found for ${file}, skipping...`);
        continue;
      }

      // Create text for embedding (title + meta + summary + content)
      const embeddingText = [
        faqData.title,
        faqData.meta,
        faqData.summary,
        faqData.content
      ].filter(Boolean).join('\n\n');

      // Generate embedding
      console.log(`🔄 Processing ${file}...`);
      const { embedding } = await embed({
        model: openai.embedding('text-embedding-3-small'),
        value: embeddingText,
      });

      // Store in Redis
      const embeddingKey = `faq:embedding:${faqData.uid}`;
      const contentKey = `faq:content:${faqData.uid}`;

      await redis.set(embeddingKey, JSON.stringify(embedding));
      await redis.set(contentKey, JSON.stringify(faqData));

      processed++;
      console.log(`✅ Processed ${file} (${processed}/${faqFiles.length})`);

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 100));

    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
      errors++;
    }
  }

  console.log('\n📊 Embedding generation complete!');
  console.log(`✅ Successfully processed: ${processed} FAQs`);
  console.log(`❌ Errors: ${errors} FAQs`);
  console.log(`💾 Stored ${processed * 2} keys in Redis`);

  // Store metadata about the embedding generation
  const metadata = {
    generatedAt: new Date().toISOString(),
    totalFAQs: processed,
    errors: errors,
    embeddingModel: 'text-embedding-3-small',
    version: '1.0'
  };

  await redis.set('faq:embeddings:metadata', JSON.stringify(metadata));
  console.log('📝 Stored embedding metadata');
}

// Run the script
generateFAQEmbeddings().catch(error => {
  console.error('💥 Script failed:', error);
  process.exit(1);
});