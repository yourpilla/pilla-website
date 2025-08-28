import { NextRequest, NextResponse } from 'next/server';

// Webhook endpoint for external content management systems
// This can be called when FAQs are added/updated externally

function validateWebhookSignature(request: NextRequest, body: string): boolean {
  const signature = request.headers.get('x-webhook-signature');
  const secret = process.env.WEBHOOK_SECRET;
  
  if (!secret || !signature) {
    return false;
  }

  // Simple HMAC validation (implement proper crypto.createHmac in production)
  const expectedSignature = `sha256=${Buffer.from(secret + body).toString('base64')}`;
  return signature === expectedSignature;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    
    // Validate webhook signature if configured
    if (process.env.WEBHOOK_SECRET && !validateWebhookSignature(request, body)) {
      return NextResponse.json(
        { success: false, error: 'Invalid webhook signature' },
        { status: 401 }
      );
    }

    const data = JSON.parse(body);
    console.log('📥 FAQ webhook received:', data);

    // Trigger embedding generation
    const baseUrl = process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}`
      : 'http://localhost:3000';

    const response = await fetch(`${baseUrl}/api/admin/generate-embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Admin-Key': process.env.ADMIN_API_KEY || 'development'
      },
      body: JSON.stringify({ forceRebuild: false })
    });

    const result = await response.json();

    if (result.success) {
      console.log('✅ Auto-embedding generation completed:', result.data);
      
      return NextResponse.json({
        success: true,
        message: 'FAQ embeddings updated successfully',
        data: result.data
      });
    } else {
      console.error('❌ Auto-embedding generation failed:', result.error);
      
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('💥 Webhook processing failed:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Webhook processing failed'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for webhook health check
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'FAQ webhook endpoint is healthy',
    timestamp: new Date().toISOString()
  });
}