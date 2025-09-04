import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const workId = searchParams.get('id');
    
    if (!workId) {
      return NextResponse.json({ error: 'Missing work ID parameter. Use ?id=your_work_id' }, { status: 400 });
    }

    const baseUrl = process.env.BUBBLE_API_ENDPOINT || 'https://yourpilla.com/version-test/api/1.1';
    const apiKey = process.env.BUBBLE_API_KEY || '';
    
    if (!apiKey) {
      return NextResponse.json({ error: 'BUBBLE_API_KEY not configured' }, { status: 500 });
    }

    console.log(`Fetching work with ID: ${workId}`);
    console.log(`Using Bubble API: ${baseUrl}`);

    // Fetch single work item by ID using Bubble Data API
    const url = `${baseUrl}/obj/work/${workId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Bubble API error: ${response.status} - ${errorText}`);
      return NextResponse.json({ 
        error: `Bubble API error: ${response.status}`, 
        details: errorText,
        url: url
      }, { status: response.status });
    }

    const data = await response.json();
    
    console.log('Successfully fetched work data');
    console.log('Available fields:', Object.keys(data.response || {}));

    return NextResponse.json({ 
      success: true,
      work_id: workId,
      raw_response: data,
      available_fields: Object.keys(data.response || {}),
      field_types: Object.entries(data.response || {}).reduce((acc, [key, value]) => {
        acc[key] = typeof value;
        return acc;
      }, {} as Record<string, string>)
    });

  } catch (error) {
    console.error('Error fetching work:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch work data', 
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}