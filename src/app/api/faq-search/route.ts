import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';
import { findSimilarFAQs } from '@/lib/faq-embeddings';

export async function POST(request: NextRequest) {
  try {
    const { query, limit = 5, minSimilarity = 0.3 } = await request.json();

    if (!query || typeof query !== 'string') {
      return NextResponse.json(
        { error: 'Query is required and must be a string' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Generate embedding for the search query
    const { embedding: queryEmbedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: query,
    });

    // Find similar FAQs using vector similarity
    const matches = await findSimilarFAQs(
      queryEmbedding,
      Math.min(limit, 10), // Cap at 10 results max
      Math.max(minSimilarity, 0.1) // Minimum similarity threshold
    );

    return NextResponse.json({
      query,
      matches,
      count: matches.length,
      searchedAt: new Date().toISOString()
    });

  } catch (error) {
    console.error('FAQ search error:', error);
    
    if (error instanceof Error && error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'Invalid OpenAI API key' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error during FAQ search' },
      { status: 500 }
    );
  }
}

// GET endpoint for testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter "q" is required' },
      { status: 400 }
    );
  }

  // Convert GET to POST internally
  return POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ query }),
    headers: { 'Content-Type': 'application/json' }
  }));
}