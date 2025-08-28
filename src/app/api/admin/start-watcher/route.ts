import { NextRequest, NextResponse } from 'next/server';
import { startFAQWatcher, stopFAQWatcher } from '@/lib/faq-watcher';

// Admin endpoint to control FAQ file watcher
function validateAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get('X-Admin-Key');
  const expectedKey = process.env.ADMIN_API_KEY;
  
  if (!expectedKey) {
    console.warn('ADMIN_API_KEY not set - admin endpoints are unprotected');
    return true;
  }
  
  return adminKey === expectedKey;
}

export async function POST(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { action } = await request.json();

    switch (action) {
      case 'start':
        const watcher = startFAQWatcher();
        return NextResponse.json({
          success: true,
          message: 'FAQ watcher started',
          status: watcher ? 'running' : 'failed to start'
        });

      case 'stop':
        stopFAQWatcher();
        return NextResponse.json({
          success: true,
          message: 'FAQ watcher stopped',
          status: 'stopped'
        });

      case 'status':
        return NextResponse.json({
          success: true,
          message: 'FAQ watcher status',
          status: 'running in production mode only',
          environment: process.env.NODE_ENV
        });

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action. Use: start, stop, or status' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('FAQ watcher control error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// GET endpoint for watcher status
export async function GET(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  return NextResponse.json({
    success: true,
    data: {
      environment: process.env.NODE_ENV,
      watcherEnabled: process.env.NODE_ENV === 'production',
      message: process.env.NODE_ENV === 'production' 
        ? 'File watcher active in production'
        : 'File watcher disabled in development (use manual API instead)'
    }
  });
}