import { NextRequest, NextResponse } from 'next/server';
import { setSponsorData, getSponsorData, getAllSponsors, SponsorData } from '@/lib/analytics';

// GET /api/sponsors - Get all sponsors or specific sponsor
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clusterId = searchParams.get('clusterId');
    const country = searchParams.get('country');

    if (clusterId && country) {
      // Get specific sponsor
      const sponsor = await getSponsorData(clusterId, country);
      if (!sponsor) {
        return NextResponse.json({ error: 'Sponsor not found' }, { status: 404 });
      }
      return NextResponse.json(sponsor);
    } else {
      // Get all sponsors
      const sponsors = await getAllSponsors();
      return NextResponse.json(sponsors);
    }
  } catch (error) {
    console.error('Error getting sponsors:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/sponsors - Create or update sponsor
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clusterId, country, stripeCustomerId, ratePerView, active = true } = body;

    // Validate required fields
    if (!clusterId || !country || !stripeCustomerId || !ratePerView) {
      return NextResponse.json(
        { error: 'Missing required fields: clusterId, country, stripeCustomerId, ratePerView' },
        { status: 400 }
      );
    }

    // Validate rate per view
    if (typeof ratePerView !== 'number' || ratePerView <= 0) {
      return NextResponse.json(
        { error: 'ratePerView must be a positive number' },
        { status: 400 }
      );
    }

    const sponsorData: SponsorData = {
      clusterId,
      country: country.toUpperCase(),
      stripeCustomerId,
      ratePerView,
      active,
      createdAt: Date.now()
    };

    await setSponsorData(clusterId, country.toUpperCase(), sponsorData);

    return NextResponse.json({ 
      message: 'Sponsor created/updated successfully',
      sponsor: sponsorData
    });
  } catch (error) {
    console.error('Error creating/updating sponsor:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// PUT /api/sponsors - Update sponsor (same as POST for now)
export async function PUT(request: NextRequest) {
  return POST(request);
}