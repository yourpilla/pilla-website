import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('No Stripe signature found');
      return NextResponse.json(
        { error: 'No signature' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: unknown) {
      console.error('Webhook signature verification failed:', err instanceof Error ? err.message : 'Unknown error');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;
        await handlePaymentSucceeded(invoice);
        break;

      case 'invoice.payment_failed':
        const failedInvoice = event.data.object as Stripe.Invoice;
        await handlePaymentFailed(failedInvoice);
        break;

      case 'customer.subscription.created':
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionCreated(subscription);
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(updatedSubscription);
        break;

      case 'customer.subscription.deleted':
        const deletedSubscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(deletedSubscription);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: unknown) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    );
  }
}

async function handlePaymentSucceeded(invoice: Stripe.Invoice) {
  console.log('Payment succeeded for invoice:', invoice.id);
  
  // If this is the first payment after trial, update user status in Bubble
  if (invoice.subscription && invoice.billing_reason === 'subscription_cycle') {
    try {
      const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
      
      // Update user subscription status in Bubble.io
      await fetch(`${process.env.BUBBLE_API_ENDPOINT}/wf/update-subscription-status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.BUBBLE_API_KEY}`,
        },
        body: JSON.stringify({
          stripe_customer_id: subscription.customer,
          subscription_id: subscription.id,
          status: 'active',
          billing_cycle_anchor: subscription.current_period_end,
        }),
      });
    } catch (error) {
      console.error('Failed to update subscription status in Bubble:', error);
    }
  }
}

async function handlePaymentFailed(invoice: Stripe.Invoice) {
  console.log('Payment failed for invoice:', invoice.id);
  
  try {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription as string);
    
    // Update user subscription status in Bubble.io
    await fetch(`${process.env.BUBBLE_API_ENDPOINT}/wf/update-subscription-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUBBLE_API_KEY}`,
      },
      body: JSON.stringify({
        stripe_customer_id: subscription.customer,
        subscription_id: subscription.id,
        status: 'payment_failed',
        retry_date: invoice.next_payment_attempt,
      }),
    });
  } catch (error) {
    console.error('Failed to update payment failure status in Bubble:', error);
  }
}

async function handleSubscriptionCreated(subscription: Stripe.Subscription) {
  console.log('Subscription created:', subscription.id);
  
  // This is handled in the signup flow, but we can log it for tracking
}

async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  console.log('Subscription updated:', subscription.id);
  
  try {
    // Update subscription details in Bubble.io
    await fetch(`${process.env.BUBBLE_API_ENDPOINT}/wf/update-subscription-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUBBLE_API_KEY}`,
      },
      body: JSON.stringify({
        stripe_customer_id: subscription.customer,
        subscription_id: subscription.id,
        status: subscription.status,
        current_period_end: subscription.current_period_end,
        trial_end: subscription.trial_end,
      }),
    });
  } catch (error) {
    console.error('Failed to update subscription in Bubble:', error);
  }
}

async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  console.log('Subscription cancelled:', subscription.id);
  
  try {
    // Update subscription status in Bubble.io
    await fetch(`${process.env.BUBBLE_API_ENDPOINT}/wf/update-subscription-status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.BUBBLE_API_KEY}`,
      },
      body: JSON.stringify({
        stripe_customer_id: subscription.customer,
        subscription_id: subscription.id,
        status: 'cancelled',
        cancelled_at: subscription.canceled_at,
      }),
    });
  } catch (error) {
    console.error('Failed to update cancellation in Bubble:', error);
  }
}