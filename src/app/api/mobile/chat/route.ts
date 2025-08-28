import { NextRequest, NextResponse } from 'next/server';
import { openai } from '@ai-sdk/openai';
import { embed, generateText } from 'ai';
import { findSimilarContent } from '@/lib/faq-embeddings';

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
    // Validate API key (optional)
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
    const { 
      message, 
      conversationHistory = [], 
      maxSources = 3,
      includeSourceLinks = true 
    } = body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Message is required and must be a non-empty string',
          code: 'INVALID_MESSAGE'
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

    // Generate embedding for the user's message
    const { embedding: queryEmbedding } = await embed({
      model: openai.embedding('text-embedding-3-small'),
      value: message.trim(),
    });

    // Find relevant content using vector similarity (both FAQs and blogs)
    const relevantContent = await findSimilarContent(
      queryEmbedding,
      maxSources,
      0.3 // Lower threshold for more context
    );

    // Build context from relevant content
    const context = relevantContent.map((match, index) => 
      `[Source ${index + 1}: ${match.content.title} (${match.content.type})]\n${match.content.content}\n`
    ).join('\n');

    // Build conversation history for context
    const conversationContext = conversationHistory
      .slice(-6) // Keep last 6 messages for context
      .map((msg: { role: string; content: string }) => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Generate conversational response using GPT
    const { text: aiResponse } = await generateText({
      model: openai('gpt-4o-mini'), // Cost-effective model
      messages: [
        {
          role: 'system',
          content: `You are a helpful hospitality management assistant. Answer questions using the provided FAQ content. Be conversational, practical, and specific to hospitality/restaurant/hotel management.

Rules:
- Use the provided FAQ and blog content as your primary source of information
- If multiple sources are relevant, synthesize the information
- If no relevant content is found, politely say you don't have specific information
- Keep responses conversational but informative
- Include practical tips when relevant
- Don't mention "according to the content" - just provide helpful answers
- Draw from both FAQ answers and blog articles when available

Available content context:
${context || 'No relevant content found for this query.'}

${conversationContext ? `Previous conversation:\n${conversationContext}` : ''}`
        },
        {
          role: 'user',
          content: message
        }
      ],
      maxOutputTokens: 500, // Keep responses concise for mobile
      temperature: 0.7, // Balanced creativity/accuracy
    });

    // Prepare source links if requested
    const sources = includeSourceLinks ? relevantContent.map(match => ({
      title: match.content.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://yourpilla.com'}/${match.content.type === 'faq' ? 'answers' : 'blog'}/${match.content.slug}`,
      type: match.content.type,
      category: match.content.category,
      similarity: Math.round(match.similarity * 100),
      excerpt: match.content.summary || match.content.content.substring(0, 120) + '...'
    })) : [];

    return NextResponse.json({
      success: true,
      data: {
        message: aiResponse,
        sources,
        sourceCount: relevantContent.length,
        hasRelevantContent: relevantContent.length > 0,
        respondedAt: new Date().toISOString()
      }
    }, { headers: corsHeaders });

  } catch (error) {
    console.error('Mobile chat error:', error);
    
    // Handle specific error types
    let errorCode = 'INTERNAL_ERROR';
    let errorMessage = 'An unexpected error occurred while processing your message';
    let statusCode = 500;

    if (error instanceof Error) {
      if (error.message?.includes('API key')) {
        errorCode = 'API_KEY_ERROR';
        errorMessage = 'AI service authentication failed';
        statusCode = 401;
      } else if (error.message?.includes('rate limit')) {
        errorCode = 'RATE_LIMIT';
        errorMessage = 'Too many requests, please try again in a moment';
        statusCode = 429;
      } else if (error.message?.includes('embedding')) {
        errorCode = 'EMBEDDING_ERROR';
        errorMessage = 'Failed to process your message';
        statusCode = 422;
      }
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
  const message = searchParams.get('message');
  
  if (!message) {
    return NextResponse.json(
      { 
        success: false, 
        error: 'Message parameter is required',
        code: 'MISSING_MESSAGE'
      },
      { status: 400, headers: corsHeaders }
    );
  }

  // Convert GET to POST internally
  return POST(new NextRequest(request.url, {
    method: 'POST',
    body: JSON.stringify({ message }),
    headers: { 'Content-Type': 'application/json' }
  }));
}