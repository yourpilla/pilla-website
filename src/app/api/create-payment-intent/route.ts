import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { email, fullName } = await request.json();

    if (!email || !fullName) {
      return NextResponse.json(
        { error: 'Email and full name are required' },
        { status: 400 }
      );
    }

    // Create or retrieve customer
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

    // Create setup intent to collect payment method for future use
    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: 'off_session',
      payment_method_types: ['card'],
      metadata: {
        source: 'website_signup',
        full_name: fullName,
      },
    });

    // Create subscription with 7-day trial after payment method collection
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID || 'price_1S2eoUDI83xAbaeVIzNRxn5v',
        },
      ],
      trial_period_days: 7,
      payment_behavior: 'default_incomplete',
      payment_settings: {
        save_default_payment_method: 'on_subscription',
        payment_method_types: ['card'],
      },
      metadata: {
        source: 'website_signup',
        full_name: fullName,
      },
    });

    return NextResponse.json({
      clientSecret: setupIntent.client_secret,
      customerId: customer.id,
      subscriptionId: subscription.id,
      trialEndsAt: subscription.trial_end,
    });
  } catch (error: unknown) {
    console.error('Payment intent creation failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}