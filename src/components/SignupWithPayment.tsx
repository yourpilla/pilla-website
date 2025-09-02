'use client';

import { useState, useEffect } from 'react';
import StripeProvider from './StripeProvider';
import SignupForm from './SignupForm';

export default function SignupWithPayment() {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create setup intent when component mounts
    const initializeSetupIntent = async () => {
      try {
        const response = await fetch('/api/create-setup-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'temp@example.com', // Will be updated in form
            fullName: 'Temp User', // Will be updated in form
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to initialize payment form');
        }

        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
      } catch (err) {
        console.error('Setup intent initialization error:', err);
        setError('Failed to initialize payment form. Please refresh and try again.');
      } finally {
        setLoading(false);
      }
    };

    initializeSetupIntent();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center px-4">
        <div className="white-card max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="h2 mb-4">Loading payment form...</h2>
          <p className="small-grey">Please wait while we prepare your signup form.</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center px-4">
        <div className="white-card max-w-md w-full p-8 text-center">
          <h2 className="h2 mb-4 text-red-600">Error</h2>
          <p className="small-grey mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <StripeProvider clientSecret={clientSecret!}>
      <SignupForm />
    </StripeProvider>
  );
}