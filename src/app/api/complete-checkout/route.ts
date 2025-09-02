import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    // Retrieve the checkout session with all data
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['subscription', 'customer'],
    });

    if (!session.subscription) {
      return NextResponse.json(
        { error: 'No subscription found for this session' },
        { status: 400 }
      );
    }

    // Extract form data from session metadata
    const {
      fullName,
      email,
      password,
      firstLocationName,
      firstTeamName,
    } = session.metadata || {};

    if (!fullName || !email || !password || !firstLocationName || !firstTeamName) {
      return NextResponse.json(
        { error: 'Required form data missing from session' },
        { status: 400 }
      );
    }

    // Create Bubble.io account with session data
    const bubbleResponse = await fetch(`${process.env.BUBBLE_API_ENDPOINT}/wf/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUBBLE_API_KEY}`,
      },
      body: JSON.stringify({
        name: fullName,
        email: email,
        password: password,
        first_location_name: firstLocationName,
        first_team_name: firstTeamName,
        stripe_customer_id: typeof session.customer === 'string' 
          ? session.customer 
          : session.customer?.id,
        subscription_id: typeof session.subscription === 'string' 
          ? session.subscription 
          : session.subscription?.id,
        signup_source: 'website',
      }),
    });

    if (!bubbleResponse.ok) {
      const errorData = await bubbleResponse.json().catch(() => ({}));
      console.error('Bubble.io account creation failed:', errorData);
      
      return NextResponse.json(
        { error: 'Failed to create account. Please contact support.' },
        { status: 500 }
      );
    }

    const bubbleData = await bubbleResponse.json();

    return NextResponse.json({
      success: true,
      customerId: typeof session.customer === 'string' 
        ? session.customer 
        : session.customer?.id,
      subscriptionId: typeof session.subscription === 'string' 
        ? session.subscription 
        : session.subscription?.id,
      bubbleUserId: bubbleData.response?.user_id,
      trialEndsAt: typeof session.subscription === 'object' 
        ? session.subscription.trial_end 
        : null,
    });
  } catch (error: unknown) {
    console.error('Checkout completion failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to complete signup' },
      { status: 500 }
    );
  }
}