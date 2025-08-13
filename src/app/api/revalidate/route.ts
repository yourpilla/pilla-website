import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// GitHub webhook secret for security
const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

function verifySignature(payload: string, signature: string): boolean {
  if (!WEBHOOK_SECRET) {
    console.error('GITHUB_WEBHOOK_SECRET not configured');
    return false;
  }

  const hmac = crypto.createHmac('sha256', WEBHOOK_SECRET);
  const digest = 'sha256=' + hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

function getAffectedPaths(files: string[]): string[] {
  const paths: Set<string> = new Set();
  
  for (const file of files) {
    // Check if file is in content directory
    if (file.startsWith('content/')) {
      const parts = file.split('/');
      if (parts.length >= 3) {
        const category = parts[1]; // blog, tools, legal, glossary
        const fileName = parts[parts.length - 1];
        
        if (fileName.endsWith('.md')) {
          const slug = fileName.replace('.md', '');
          
          // Add individual page paths
          paths.add(`/${category}/${slug}`);
          
          // Add category listing pages
          paths.add(`/${category}`);
        }
      }
    }
    
    // If any content file changed, also revalidate home page
    if (file.startsWith('content/')) {
      paths.add('/');
    }
  }
  
  return Array.from(paths);
}

export async function POST(request: NextRequest) {
  try {
    // Get the raw body for signature verification
    const body = await request.text();
    const signature = request.headers.get('x-hub-signature-256');
    
    if (!signature || !verifySignature(body, signature)) {
      console.error('Invalid webhook signature');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const payload = JSON.parse(body);
    
    // Only process push events
    if (payload.ref !== 'refs/heads/main') {
      return NextResponse.json({ message: 'Not main branch, skipping' });
    }
    
    // Get list of changed files
    const changedFiles: string[] = [];
    
    if (payload.commits) {
      for (const commit of payload.commits) {
        if (commit.added) changedFiles.push(...commit.added);
        if (commit.modified) changedFiles.push(...commit.modified);
        if (commit.removed) changedFiles.push(...commit.removed);
      }
    }
    
    console.log('Changed files:', changedFiles);
    
    // Determine which paths need revalidation
    const pathsToRevalidate = getAffectedPaths(changedFiles);
    
    console.log('Paths to revalidate:', pathsToRevalidate);
    
    // Revalidate affected paths
    const results = await Promise.allSettled(
      pathsToRevalidate.map(async (path) => {
        try {
          revalidatePath(path);
          return { path, status: 'success' };
        } catch (error) {
          console.error(`Failed to revalidate ${path}:`, error);
          return { path, status: 'error', error };
        }
      })
    );
    
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;
    
    return NextResponse.json({
      message: `Revalidation completed`,
      successful,
      failed,
      paths: pathsToRevalidate,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// For manual testing/triggering
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const path = searchParams.get('path');
  const secret = searchParams.get('secret');
  
  // Simple secret check for manual triggers
  if (secret !== process.env.MANUAL_REVALIDATE_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  if (path) {
    try {
      revalidatePath(path);
      return NextResponse.json({ 
        message: `Revalidated ${path}`, 
        timestamp: new Date().toISOString() 
      });
    } catch (error) {
      return NextResponse.json({ error: 'Revalidation failed' }, { status: 500 });
    }
  }
  
  return NextResponse.json({ 
    message: 'Manual revalidation endpoint',
    usage: 'GET /api/revalidate?path=/blog/my-post&secret=YOUR_SECRET'
  });
}