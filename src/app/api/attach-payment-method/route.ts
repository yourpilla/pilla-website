import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-08-27.basil',
});

export async function POST(request: NextRequest) {
  try {
    const { customerId, paymentMethodId } = await request.json();

    if (!customerId || !paymentMethodId) {
      return NextResponse.json(
        { error: 'Customer ID and Payment Method ID are required' },
        { status: 400 }
      );
    }

    // Attach payment method to customer
    await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId,
    });

    // Set as default payment method for future invoices
    await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Payment method attached successfully',
    });
  } catch (error: unknown) {
    console.error('Failed to attach payment method:', error);
    
    return NextResponse.json(
      { error: 'Failed to save payment method' },
      { status: 500 }
    );
  }
}