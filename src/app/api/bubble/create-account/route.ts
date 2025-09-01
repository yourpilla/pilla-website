import { NextRequest, NextResponse } from 'next/server';
import { BubbleCreateAccountRequest } from '@/types/signup';

const BUBBLE_API_ENDPOINT = process.env.BUBBLE_API_ENDPOINT;
const BUBBLE_API_KEY = process.env.BUBBLE_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const data: BubbleCreateAccountRequest = await request.json();

    if (!BUBBLE_API_ENDPOINT || !BUBBLE_API_KEY) {
      console.error('Bubble.io API configuration missing');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    // Validate required fields
    const requiredFields = [
      'fullName', 'email', 'password', 
      'firstLocationName', 'firstTeamName', 
      'stripe_customer_id', 'subscription_id'
    ];
    
    for (const field of requiredFields) {
      if (!data[field as keyof BubbleCreateAccountRequest]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create user account in Bubble.io
    const bubbleResponse = await fetch(`${BUBBLE_API_ENDPOINT}/wf/create-user-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${BUBBLE_API_KEY}`,
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        password: data.password,
        first_location_name: data.firstLocationName,
        first_team_name: data.firstTeamName,
        stripe_customer_id: data.stripe_customer_id,
        subscription_id: data.subscription_id,
        signup_source: 'website',
      }),
    });

    if (!bubbleResponse.ok) {
      const errorText = await bubbleResponse.text();
      console.error('Bubble.io API error:', errorText);
      
      // Handle specific Bubble errors
      if (bubbleResponse.status === 409) {
        return NextResponse.json(
          { error: 'An account with this email already exists' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { error: 'Failed to create account' },
        { status: 500 }
      );
    }

    const bubbleResult = await bubbleResponse.json();
    
    return NextResponse.json({
      success: true,
      user_id: bubbleResult.user_id,
    });
  } catch (error: unknown) {
    console.error('Bubble account creation failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to create account' },
      { status: 500 }
    );
  }
}