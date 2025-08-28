import { NextRequest, NextResponse } from 'next/server';
import { scalableInternalLinkingManager } from '@/lib/scalable-internal-linking';
import { internalLinkingManager } from '@/lib/internal-linking';

// Admin API key protection
function validateAdminKey(request: NextRequest): boolean {
  const adminKey = request.headers.get('X-Admin-Key');
  const expectedKey = process.env.ADMIN_API_KEY;
  
  if (!expectedKey) {
    console.warn('ADMIN_API_KEY not set - admin endpoints are unprotected');
    return true;
  }
  
  return adminKey === expectedKey;
}

// GET - View all internal link mappings
export async function GET(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const useScalable = searchParams.get('scalable') === 'true';

    if (action === 'stats' || useScalable) {
      // Use scalable system for stats
      const stats = await scalableInternalLinkingManager.getCacheStats();
      return NextResponse.json({ success: true, stats });
    }

    if (action === 'refresh') {
      if (useScalable) {
        await scalableInternalLinkingManager.refreshCache();
        return NextResponse.json({ success: true, message: 'Scalable cache refreshed successfully' });
      } else {
        await internalLinkingManager.refresh();
        return NextResponse.json({ success: true, message: 'Legacy cache refreshed successfully' });
      }
    }

    // Legacy system - get all mappings
    const mappings = await internalLinkingManager.getMappings();
    
    // Group by type for easier viewing
    const groupedMappings = {
      glossary: mappings.filter(m => m.type === 'glossary'),
      faq: mappings.filter(m => m.type === 'faq'),
      blog: mappings.filter(m => m.type === 'blog')
    };

    const stats = {
      total: mappings.length,
      byType: {
        glossary: groupedMappings.glossary.length,
        faq: groupedMappings.faq.length,
        blog: groupedMappings.blog.length
      },
      topPriorityPhrases: mappings
        .filter(m => m.priority >= 8)
        .slice(0, 20)
        .map(m => ({ phrase: m.phrase, type: m.type, priority: m.priority }))
    };

    return NextResponse.json({
      success: true,
      data: {
        stats,
        mappings: groupedMappings,
        sampleMappings: {
          glossary: groupedMappings.glossary.slice(0, 5),
          faq: groupedMappings.faq.slice(0, 5),
          blog: groupedMappings.blog.slice(0, 5)
        }
      }
    });

  } catch (error) {
    console.error('Internal links API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// POST - Refresh internal link mappings
export async function POST(request: NextRequest) {
  if (!validateAdminKey(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    const { action, contentType, slug, useScalable } = await request.json().catch(() => ({ action: 'refresh' }));

    if (action === 'add_content' && useScalable) {
      if (!contentType || !slug) {
        return NextResponse.json(
          { success: false, error: 'contentType and slug are required' },
          { status: 400 }
        );
      }

      await scalableInternalLinkingManager.addNewContent(contentType, slug);
      return NextResponse.json({ success: true, message: 'Content added to scalable phrase index' });
    }

    if (action === 'rebuild' && useScalable) {
      await scalableInternalLinkingManager.refreshCache();
      return NextResponse.json({ success: true, message: 'Scalable phrase index rebuilt' });
    }

    if (action === 'refresh') {
      if (useScalable) {
        await scalableInternalLinkingManager.refreshCache();
        const stats = await scalableInternalLinkingManager.getCacheStats();
        
        return NextResponse.json({
          success: true,
          message: 'Scalable internal link mappings refreshed successfully',
          data: {
            totalPhrases: stats.totalPhrases,
            totalPages: stats.totalPages,
            refreshedAt: new Date().toISOString()
          }
        });
      } else {
        await internalLinkingManager.refresh();
        const mappings = await internalLinkingManager.getMappings();
        
        return NextResponse.json({
          success: true,
          message: 'Legacy internal link mappings refreshed successfully',
          data: {
            totalMappings: mappings.length,
            refreshedAt: new Date().toISOString()
          }
        });
      }
    }

    // Test linking on sample content
    if (action === 'test') {
      const { content, currentUrl, useScalable: testScalable } = await request.json();
      
      if (!content) {
        return NextResponse.json(
          { success: false, error: 'Content is required for testing' },
          { status: 400 }
        );
      }

      let processedContent: string;
      let linksFound: any[] = [];

      if (testScalable) {
        processedContent = await scalableInternalLinkingManager.processContentFast(
          content,
          currentUrl || '/test',
          5
        );
        
        // Get the links that would be added
        linksFound = await scalableInternalLinkingManager.getLinksForContent(
          content,
          currentUrl || '/test',
          5
        );
      } else {
        processedContent = await internalLinkingManager.processContent(
          content,
          currentUrl || '/test',
          { maxLinksPerPage: 5 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          originalContent: content,
          processedContent,
          linksAdded: (processedContent.match(/<a[^>]+class="internal-link"/g) || []).length,
          linksFound: testScalable ? linksFound : undefined,
          systemUsed: testScalable ? 'scalable' : 'legacy'
        }
      });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid action. Use "refresh", "test", "rebuild", or "add_content"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Internal links refresh error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}