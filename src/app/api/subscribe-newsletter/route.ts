import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Add user to mailing list via Loops.so
    const loopsResponse = await fetch('https://app.loops.so/api/v1/contacts/update', {
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

    if (!loopsResponse.ok) {
      const loopsError = await loopsResponse.json().catch(() => ({}));
      console.error('Loops.so newsletter subscription failed:', loopsError);
      
      return NextResponse.json(
        { error: 'Failed to subscribe to newsletter. Please try again.' },
        { status: 500 }
      );
    }

    console.log('Newsletter subscription successful for:', email);

    return NextResponse.json({
      success: true,
      message: 'Successfully subscribed to newsletter!'
    });

  } catch (error: unknown) {
    console.error('Newsletter subscription error:', error);
    
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}