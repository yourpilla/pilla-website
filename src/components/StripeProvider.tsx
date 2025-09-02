'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, type StripeElementsOptions } from '@stripe/stripe-js';

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

console.log('Stripe publishable key status:', {
  exists: !!publishableKey,
  keyStart: publishableKey?.slice(0, 10),
  keyType: publishableKey?.startsWith('pk_test_') ? 'test' : publishableKey?.startsWith('pk_live_') ? 'live' : 'unknown'
});

if (!publishableKey) {
  console.error('Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY environment variable');
}

const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

interface StripeProviderProps {
  children: React.ReactNode;
  clientSecret?: string;
}

export default function StripeProvider({ children, clientSecret }: StripeProviderProps) {
  const options: StripeElementsOptions = clientSecret 
    ? {
        clientSecret,
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2563eb',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#dc2626',
            fontFamily: 'system-ui, sans-serif',
          },
        },
        loader: 'auto',
      }
    : {
        mode: 'setup',
        currency: 'gbp',
        appearance: {
          theme: 'stripe',
          variables: {
            colorPrimary: '#2563eb',
            colorBackground: '#ffffff',
            colorText: '#1f2937',
            colorDanger: '#dc2626',
            fontFamily: 'system-ui, sans-serif',
          },
        },
        loader: 'auto',
      };

  if (!stripePromise) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800 text-sm">
          Stripe configuration error. Please check environment variables.
        </p>
      </div>
    );
  }

  console.log('StripeProvider rendering with options:', options);

  return (
    <Elements 
      stripe={stripePromise} 
      options={options}
    >
      {children}
    </Elements>
  );
}