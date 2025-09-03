import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Create Checkout Session with custom fields for all user data
    const session = await stripe.checkout.sessions.create({
      customer_email: email,
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [{
        price: process.env.STRIPE_PRICE_ID || 'price_1S2eoUDI83xAbaeVIzNRxn5v',
        quantity: 1,
      }],
      subscription_data: {
        trial_period_days: 7,
        metadata: {
          source: 'website_signup_single_stage',
        },
      },
      success_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/signup/single-stage-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/signup/single-stage?cancelled=true`,
      custom_fields: [
        {
          key: 'location_name',
          label: { type: 'text', custom: 'Business Location Name' },
          type: 'text',
          text: { 
            maximum_length: 50, 
            minimum_length: 1 
          },
          optional: false,
        },
        {
          key: 'team_name',
          label: { type: 'text', custom: 'First Team Name' },
          type: 'text',
          text: { 
            maximum_length: 50, 
            minimum_length: 1 
          },
          optional: false,
        }
      ],
      metadata: {
        email: email,
        signup_type: 'single_stage',
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: unknown) {
    console.error('Single-stage checkout session creation failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}