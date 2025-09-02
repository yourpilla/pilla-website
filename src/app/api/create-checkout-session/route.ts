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

    // Create or retrieve Stripe customer
    let customer;
    const existingCustomers = await stripe.customers.list({
      email: email,
      limit: 1,
    });

    if (existingCustomers.data.length > 0) {
      customer = existingCustomers.data[0];
    } else {
      customer = await stripe.customers.create({
        email: email,
        name: fullName,
        metadata: {
          source: 'website_signup',
        },
      });
    }

    // Create Checkout Session with trial
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
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/signup/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/signup?cancelled=true`,
      metadata: {
        fullName,
        email,
        password,
        firstLocationName,
        firstTeamName,
        customerId: customer.id,
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