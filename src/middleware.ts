import { NextRequest, NextResponse } from 'next/server';
import { getCountryFromRequest } from './lib/geo-utils';
import { trackPageView } from './lib/analytics';
import { getClusterFromPath } from './lib/cluster-utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only track views on blog and FAQ pages
  const isTrackablePage = pathname.startsWith('/blog/') || pathname.startsWith('/answers/');
  
  if (isTrackablePage) {
    try {
      // Get visitor's country from request headers
      const country = getCountryFromRequest(request);
      
      // Determine which cluster this page belongs to
      const clusterId = await getClusterFromPath(pathname);
      
      if (clusterId && country) {
        // Track the page view asynchronously (don't block the response)
        trackPageView({
          pathname,
          clusterId,
          country,
          timestamp: Date.now(),
          ip: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
          userAgent: request.headers.get('user-agent') || 'unknown'
        });
      }
    } catch (error) {
      // Log error but don't block the request
      console.error('Analytics tracking error:', error);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Match blog and FAQ pages only
  matcher: ['/blog/:path*', '/answers/:path*']
};