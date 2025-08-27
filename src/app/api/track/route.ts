import { NextRequest, NextResponse } from 'next/server';
import { trackPageView } from '@/lib/analytics';
import { getClusterFromPath } from '@/lib/cluster-utils';
import { getCountryFromRequest } from '@/lib/geo-utils';

// POST /api/track - Track page view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      pathname, 
      country: clientCountry, 
      timestamp, 
      ip, 
      userAgent, 
      clusterId: directClusterId,
      faqSlug 
    } = body;

    // Detect country from server-side headers (more accurate than client-side)
    const serverCountry = getCountryFromRequest(request);
    const country = serverCountry || clientCountry || 'UNKNOWN';

    let clusterId = directClusterId;

    // If this is an FAQ page, we need to find which cluster it belongs to
    if (faqSlug && !clusterId) {
      clusterId = await getClusterFromPath(`/answers/${faqSlug}`);
    }

    if (clusterId && country) {
      await trackPageView({
        pathname,
        clusterId,
        country,
        timestamp: parseInt(timestamp),
        ip: request.headers.get('x-forwarded-for') || ip || 'unknown',
        userAgent
      });

      return NextResponse.json({ success: true, clusterId, country });
    }

    return NextResponse.json({ success: false, error: 'Missing clusterId or country' });
  } catch (error) {
    console.error('Track API error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}