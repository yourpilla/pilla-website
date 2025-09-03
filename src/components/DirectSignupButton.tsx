'use client';

import { useState } from 'react';
import { parseApiError, retryApiCall } from '@/lib/error-utils';
import { ShieldCheckIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function DirectSignupButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignup = async () => {
    console.log('Direct signup button clicked');
    setIsLoading(true);
    setError(null);

    try {
      // Create Stripe Checkout session directly
      const { url } = await retryApiCall(async () => {
        const response = await fetch('/api/create-single-stage-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({}), // No data needed - Stripe collects everything
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to create checkout session');
        }

        return response.json();
      });

      // Redirect to Stripe Checkout immediately
      console.log('Redirecting to Stripe Checkout:', url);
      window.location.href = url;
    } catch (error: unknown) {
      console.error('Direct signup error:', error);
      setError(parseApiError(error, 'Something went wrong. Please try again.'));
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center space-y-6">
      {/* Trust signals */}
      <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600 mb-6">
        <div className="flex items-center gap-2">
          <ShieldCheckIcon className="w-5 h-5 text-green-600" />
          <span>Secure Payment</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircleIcon className="w-5 h-5 text-green-600" />
          <span>7-Day Free Trial</span>
        </div>
      </div>

      {/* Error display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-700 text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-red-600 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      )}

      {/* Main signup button */}
      <button
        onClick={handleSignup}
        disabled={isLoading}
        className="bg-blue-600 text-white py-4 px-8 rounded-lg text-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? 'Redirecting...' : 'Start 7-Day Free Trial'}
      </button>

      {/* What happens next */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
        <h3 className="small-blue mb-2">What happens next?</h3>
        <div className="text-sm text-blue-800 space-y-1 text-left">
          <p>1. Secure checkout with Stripe (email, payment, business details)</p>
          <p>2. We create your account with a generated password</p>
          <p>3. Download the app and start your free trial</p>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        By signing up, you agree to our Terms of Service and Privacy Policy. 
        You can cancel anytime during your trial period.
      </p>
    </div>
  );
}