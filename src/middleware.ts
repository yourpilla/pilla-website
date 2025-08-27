import { NextRequest, NextResponse } from 'next/server';
import { getCountryFromRequest } from './lib/geo-utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only track views on blog and FAQ pages
  const isTrackablePage = pathname.startsWith('/blog/') || pathname.startsWith('/answers/');
  
  if (isTrackablePage) {
    try {
      // Get visitor's country from request headers
      const country = getCountryFromRequest(request);
      
      // Simple cluster ID extraction (no file system access needed)
      let clusterId: string | null = null;
      
      if (pathname.startsWith('/blog/')) {
        // For blog pages, cluster ID is the slug
        clusterId = pathname.replace('/blog/', '').replace(/\/$/, '');
      } else if (pathname.startsWith('/answers/')) {
        // For FAQ pages, we'll handle cluster mapping via API call after response
        const faqSlug = pathname.replace('/answers/', '').replace(/\/$/, '');
        
        // Store tracking data in headers for server-side processing
        const response = NextResponse.next();
        response.headers.set('x-track-faq', faqSlug);
        response.headers.set('x-track-country', country || 'UNKNOWN');
        response.headers.set('x-track-pathname', pathname);
        response.headers.set('x-track-timestamp', Date.now().toString());
        response.headers.set('x-track-ip', request.headers.get('x-forwarded-for') || 'unknown');
        response.headers.set('x-track-user-agent', request.headers.get('user-agent') || 'unknown');
        
        return response;
      }
      
      if (clusterId && country) {
        // For blog pages, we can track immediately
        // We'll use a simple approach: make API call after response
        const response = NextResponse.next();
        response.headers.set('x-track-cluster', clusterId);
        response.headers.set('x-track-country', country);
        response.headers.set('x-track-pathname', pathname);
        response.headers.set('x-track-timestamp', Date.now().toString());
        response.headers.set('x-track-ip', request.headers.get('x-forwarded-for') || 'unknown');
        response.headers.set('x-track-user-agent', request.headers.get('user-agent') || 'unknown');
        
        return response;
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