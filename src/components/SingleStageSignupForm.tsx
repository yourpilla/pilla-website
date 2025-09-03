'use client';

import { useState } from 'react';
import { validateFormField, parseApiError, retryApiCall } from '@/lib/error-utils';
import { ShieldCheckIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface FormState {
  isLoading: boolean;
  error: string | null;
  errorList?: string[];
  step: 'form' | 'processing' | 'success' | 'error';
}

export default function SingleStageSignupForm() {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [formState, setFormState] = useState<FormState>({
    isLoading: false,
    error: null,
    step: 'form',
  });

  const validateEmail = (email: string) => {
    const error = validateFormField('email', email);
    setValidationError(error || '');
    return !error;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Single-stage form submission started');

    // Validate email
    if (!validateEmail(email)) {
      setFormState(prev => ({ 
        ...prev, 
        error: 'Please enter a valid email address', 
        errorList: undefined 
      }));
      return;
    }

    setFormState({ isLoading: true, error: null, errorList: undefined, step: 'processing' });

    try {
      // Create Stripe Checkout session
      const { url } = await retryApiCall(async () => {
        const response = await fetch('/api/create-single-stage-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to create checkout session');
        }

        return response.json();
      });

      // Redirect to Stripe Checkout
      console.log('Redirecting to Stripe Checkout:', url);
      window.location.href = url;
    } catch (error: unknown) {
      console.error('Single-stage signup error:', error);
      setFormState({
        isLoading: false,
        error: parseApiError(error, 'Something went wrong. Please try again.'),
        errorList: undefined,
        step: 'error',
      });
    }
  };

  if (formState.step === 'processing') {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center px-4">
        <div className="white-card max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="h2 mb-4">Redirecting to checkout...</h2>
          <p className="small-grey">
            Please wait while we redirect you to our secure payment page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-main py-6 sm:py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="h1 mb-4">Start Your 7-Day Free Trial</h1>
          <p className="small-grey mb-6">
            Join thousands of hospitality professionals using Pilla to streamline their operations.
          </p>
          <p className="text-sm text-blue-600 mb-6">
            ✨ Single-step checkout - enter your email below and complete everything on the secure payment page!
          </p>
          
          {/* Trust signals */}
          <div className="flex items-center justify-center gap-4 sm:gap-6 text-sm text-gray-600 mb-8">
            <div className="flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-green-600" />
              <span>Secure SSL</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircleIcon className="w-5 h-5 text-green-600" />
              <span>7-Day Free Trial</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="white-card p-6 sm:p-8 space-y-6">
          {formState.error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <ExclamationCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-800 text-sm font-medium">Error</p>
                  <p className="text-red-700 text-sm mt-1">{formState.error}</p>
                  {formState.step === 'error' && (
                    <button
                      type="button"
                      onClick={() => setFormState(prev => ({ ...prev, error: null, errorList: undefined, step: 'form' }))}
                      className="mt-2 text-red-600 text-sm underline hover:no-underline"
                    >
                      Try again
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Enter your email address"
              required
            />
            {validationError && (
              <p className="mt-1 text-sm text-red-600">{validationError}</p>
            )}
          </div>

          {/* What happens next */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="small-blue mb-2">What happens next?</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>1. Click the button below to go to our secure checkout</p>
              <p>2. Enter your business details and payment information</p>
              <p>3. Get your account details and start your free trial</p>
              <p>4. We&apos;ll generate a secure password for you automatically</p>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={formState.isLoading || !email || validationError !== ''}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState.isLoading ? 'Processing...' : 'Continue to Secure Checkout'}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy. 
            You can cancel anytime during your trial period.
          </p>
        </form>
      </div>
    </div>
  );
}