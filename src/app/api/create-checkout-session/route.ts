import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { 
      fullName, 
      email, 
      password, 
      firstLocationName, 
      firstTeamName 
    } = await request.json();

    if (!fullName || !email || !password || !firstLocationName || !firstTeamName) {
      return NextResponse.json(
        { error: 'All form fields are required' },
        { status: 400 }
      );
    }

    // Create Checkout Session with trial (let Stripe create the customer)
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
          source: 'website_signup',
          full_name: fullName,
        },
      },
      success_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/signup?cancelled=true`,
      metadata: {
        fullName,
        email,
        password,
        firstLocationName,
        firstTeamName,
      },
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (error: unknown) {
    console.error('Checkout session creation failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}