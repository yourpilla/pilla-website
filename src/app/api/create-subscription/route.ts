import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { paymentMethodId, email, fullName } = await request.json();

    if (!paymentMethodId || !email || !fullName) {
      return NextResponse.json(
        { error: 'Payment Method ID, email, and full name are required' },
        { status: 400 }
      );
    }

    // Get the payment method to find the customer
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    
    if (!paymentMethod.customer) {
      return NextResponse.json(
        { error: 'Payment method is not attached to a customer' },
        { status: 400 }
      );
    }

    const customerId = typeof paymentMethod.customer === 'string' 
      ? paymentMethod.customer 
      : paymentMethod.customer.id;

    // Create subscription with 7-day trial
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: process.env.STRIPE_PRICE_ID || 'price_1S2eoUDI83xAbaeVIzNRxn5v',
        },
      ],
      trial_period_days: 7,
      default_payment_method: paymentMethodId,
      metadata: {
        source: 'website_signup',
        full_name: fullName,
      },
    });

    return NextResponse.json({
      customerId: customerId,
      subscriptionId: subscription.id,
      trialEndsAt: subscription.trial_end,
    });
  } catch (error: unknown) {
    console.error('Subscription creation failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to create subscription' },
      { status: 500 }
    );
  }
}