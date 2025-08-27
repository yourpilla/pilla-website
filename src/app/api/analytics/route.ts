import { NextRequest, NextResponse } from 'next/server';
import { getClusterViews, getMonthlyViewsForBilling } from '@/lib/analytics';

// GET /api/analytics - Get analytics data
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const clusterId = searchParams.get('clusterId');
    const country = searchParams.get('country');
    const month = searchParams.get('month'); // YYYY-MM format
    const type = searchParams.get('type'); // 'cluster' or 'monthly-billing'

    if (type === 'monthly-billing') {
      if (!month) {
        return NextResponse.json(
          { error: 'Month parameter required for monthly-billing type (format: YYYY-MM)' },
          { status: 400 }
        );
      }
      
      const monthlyData = await getMonthlyViewsForBilling(month);
      return NextResponse.json({
        month,
        totalClusters: monthlyData.length,
        data: monthlyData
      });
    }

    if (type === 'cluster' || (!type && clusterId)) {
      if (!clusterId || !country || !month) {
        return NextResponse.json(
          { error: 'clusterId, country, and month parameters required for cluster analytics' },
          { status: 400 }
        );
      }

      const views = await getClusterViews(clusterId, country.toUpperCase(), month);
      return NextResponse.json({
        clusterId,
        country: country.toUpperCase(),
        month,
        views
      });
    }

    return NextResponse.json(
      { error: 'Please specify type parameter: "cluster" or "monthly-billing"' },
      { status: 400 }
    );

  } catch (error) {
    console.error('Error getting analytics:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// For testing purposes - DELETE method to clear test data (remove in production)
export async function DELETE() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    // In a real implementation, you'd clear test data from KV store
    return NextResponse.json({ message: 'Test data cleared' });
  } catch (error) {
    console.error('Error clearing test data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}