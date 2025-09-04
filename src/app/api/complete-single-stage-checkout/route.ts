import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { generateUserFriendlyPassword } from '@/lib/password-generator';

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
      expand: ['subscription', 'subscription.items', 'customer', 'custom_fields'],
    });

    if (!session.subscription) {
      return NextResponse.json(
        { error: 'No subscription found for this session' },
        { status: 400 }
      );
    }

    // Extract email and name from customer details (Stripe collected them)
    const email = session.customer_details?.email;
    const fullName = session.customer_details?.name;

    if (!email || !fullName) {
      return NextResponse.json(
        { error: 'Required customer data missing from session' },
        { status: 400 }
      );
    }

    // Extract custom fields
    const customFields = session.custom_fields || [];
    const locationName = customFields.find(field => field.key === 'location_name')?.text?.value;
    const locationAddress = customFields.find(field => field.key === 'location_address')?.text?.value;
    const teamName = customFields.find(field => field.key === 'team_name')?.text?.value;

    if (!locationName || !locationAddress || !teamName) {
      return NextResponse.json(
        { error: 'Required custom fields missing from session' },
        { status: 400 }
      );
    }

    // Generate a secure password for the user
    const generatedPassword = generateUserFriendlyPassword();

    // Extract subscription details
    const subscription = typeof session.subscription === 'object' ? session.subscription : null;
    const subscriptionId = typeof session.subscription === 'string' 
      ? session.subscription 
      : session.subscription?.id;
    
    // Get the first subscription item
    const subscriptionItemId = subscription?.items?.data?.[0]?.id;

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
        password: generatedPassword,
        first_location_name: locationName,
        first_location_address: locationAddress,
        first_team_name: teamName,
        stripe_customer_id: typeof session.customer === 'string' 
          ? session.customer 
          : session.customer?.id,
        subscription_id: subscriptionId,
        subscription_item_id: subscriptionItemId,
        signup_source: 'website_single_stage',
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

    // Send transactional welcome email via Loops.so
    try {
      const loopsResponse = await fetch('https://app.loops.so/api/v1/transactional', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        },
        body: JSON.stringify({
          transactionalId: 'clv2nh8kl00b947lgl0p2djdi',
          email: email,
          dataVariables: {
            password: generatedPassword,
          },
        }),
      });

      if (!loopsResponse.ok) {
        const loopsError = await loopsResponse.json().catch(() => ({}));
        console.error('Loops.so transactional email failed:', loopsError);
        // Don't fail the entire signup if email fails - account was created successfully
      } else {
        console.log('Welcome email sent successfully via Loops.so');
      }
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the entire signup if email fails
    }

    // Add user to mailing list via Loops.so
    try {
      const mailingListResponse = await fetch('https://app.loops.so/api/v1/contacts/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LOOPS_API_KEY}`,
        },
        body: JSON.stringify({
          email: email,
          mailingLists: {
            "cmey4x0l55x8j0iw3eyu97hp0": true
          },
        }),
      });

      if (!mailingListResponse.ok) {
        const mailingListError = await mailingListResponse.json().catch(() => ({}));
        console.error('Loops.so mailing list addition failed:', mailingListError);
        // Don't fail the entire signup if mailing list fails - account was created successfully
      } else {
        console.log('User added to mailing list successfully via Loops.so');
      }
    } catch (mailingListError) {
      console.error('Failed to add user to mailing list:', mailingListError);
      // Don't fail the entire signup if mailing list fails
    }

    return NextResponse.json({
      success: true,
      customerId: typeof session.customer === 'string' 
        ? session.customer 
        : session.customer?.id,
      subscriptionId: subscriptionId,
      subscriptionItemId: subscriptionItemId,
      bubbleUserId: bubbleData.response?.user_id,
      trialEndsAt: subscription?.trial_end || null,
      generatedPassword: generatedPassword,
      email: email,
      fullName: fullName,
      locationName: locationName,
      locationAddress: locationAddress,
      teamName: teamName,
    });
  } catch (error: unknown) {
    console.error('Single-stage checkout completion failed:', error);
    
    return NextResponse.json(
      { error: 'Failed to complete signup' },
      { status: 500 }
    );
  }
}