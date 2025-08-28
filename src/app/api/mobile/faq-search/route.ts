import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { embed } from 'ai';
import { findSimilarFAQs } from '@/lib/faq-embeddings';

// CORS headers for mobile app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-API-Key',
};

export async function OPTIONS() {
  return new Response(null, { status: 200, headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key (optional for mobile app authentication)
    const apiKey = request.headers.get('X-API-Key');
    const expectedApiKey = process.env.MOBILE_API_KEY;
    
    if (expectedApiKey && apiKey !== expectedApiKey) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid API key',
          code: 'UNAUTHORIZED'
        },
        { status: 401, headers: corsHeaders }
      );
    }

    const body = await request.json();
    const { query, limit = 3, minSimilarity = 0.4, includeContent = false } = body;

    // Validate input
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Query is required and must be a non-empty string',
          code: 'INVALID_QUERY'
        },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'AI service temporarily unavailable',
          code: 'SERVICE_UNAVAILABLE'
        },
        { status: 503, headers: corsHeaders }
      );
    }

    // Generate embedding for the search query
    const { embedding: queryEmbedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: query.trim(),
    });

    // Find similar FAQs
    const matches = await findSimilarFAQs(
      queryEmbedding,
      Math.min(Math.max(limit, 1), 10), // 1-10 results
      Math.min(Math.max(minSimilarity, 0.1), 0.9) // 0.1-0.9 similarity
    );

    // Format response for mobile app
    const results = matches.map(match => ({
      uid: match.faq.uid,
      title: match.faq.title,
      slug: match.faq.slug,
      summary: match.faq.summary || null,
      meta: match.faq.meta || null,
      similarity: Math.round(match.similarity * 100) / 100, // Round to 2 decimal places
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourpilla.com'}/answers/${match.faq.slug}`,
      ...(includeContent && { content: match.faq.content })
    }));

    return NextResponse.json({
      success: true,
      data: {
        query: query.trim(),
        results,
        count: results.length,
        searchedAt: new Date().toISOString(),
        embeddings_available: true
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Mobile FAQ search error:', error);
    
    // Handle specific error types
    let errorCode = 'INTERNAL_ERROR';
    let errorMessage = 'An unexpected error occurred';
    let statusCode = 500;

    if (error instanceof Error && error.message?.includes('API key')) {
      errorCode = 'API_KEY_ERROR';
      errorMessage = 'AI service authentication failed';
      statusCode = 401;
    } else if (error instanceof Error && error.message?.includes('rate limit')) {
      errorCode = 'RATE_LIMIT';
      errorMessage = 'Too many requests, please try again later';
      statusCode = 429;
    } else if (error instanceof Error && error.message?.includes('embedding')) {
      errorCode = 'EMBEDDING_ERROR';
      errorMessage = 'Failed to process search query';
      statusCode = 422;
    }

    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        code: errorCode
      },
      { status: statusCode, headers: corsHeaders }
    );
  }
}

// GET endpoint for simple testing
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const limit = parseInt(searchParams.get('limit') || '3');
  const minSimilarity = parseFloat(searchParams.get('minSimilarity') || '0.4');
  
  if (!query) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Query parameter "q" is required',
        code: 'MISSING_QUERY'
      },
      { status: 400, headers: corsHeaders }
    );
  }

  // Convert GET to POST internally
  return POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ query, limit, minSimilarity }),
    headers: { 'Content-Type': 'application/json' }
  }));
}