'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { type SignupFormData, type SignupFormState } from '@/types/signup';
import { parseStripeError, parseApiError, retryApiCall, validateFormField } from '@/lib/error-utils';
import { ShieldCheckIcon, CheckCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
};

export default function SignupForm() {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  
  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    email: '',
    password: '',
    firstLocationName: '',
    firstTeamName: '',
  });
  
  const [formState, setFormState] = useState<SignupFormState>({
    isLoading: false,
    error: null,
    step: 'form',
  });
  
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validateField = (name: string, value: string) => {
    const error = validateFormField(name, value);
    setValidationErrors(prev => ({ 
      ...prev, 
      [name]: error || '' 
    }));
    return !error;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      setFormState(prev => ({ ...prev, error: 'Payment system not loaded. Please refresh the page.', errorList: undefined }));
      return;
    }

    // Validate all form fields
    const errors: Record<string, string> = {};
    let hasErrors = false;
    
    Object.keys(formData).forEach(key => {
      const error = validateFormField(key, (formData as Record<string, string>)[key]);
      if (error) {
        errors[key] = error;
        hasErrors = true;
      }
    });
    
    if (hasErrors) {
      setValidationErrors(errors);
      
      // Create a helpful error message with specific issues
      const errorList = Object.values(errors).filter(Boolean);
      const errorMessage = errorList.length === 1 
        ? errorList[0] 
        : 'Please fix these validation errors:';
      
      setFormState(prev => ({ 
        ...prev, 
        error: errorMessage,
        errorList: errorList.length > 1 ? errorList : undefined
      }));
      return;
    }

    setFormState({ isLoading: true, error: null, errorList: undefined, step: 'processing' });

    try {
      // Step 1: Create payment intent with retry logic
      const { clientSecret, customerId, subscriptionId } = await retryApiCall(async () => {
        const paymentResponse = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: formData.email,
            fullName: formData.fullName,
          }),
        });

        if (!paymentResponse.ok) {
          const errorData = await paymentResponse.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to create payment intent');
        }

        return paymentResponse.json();
      });

      // Step 2: Confirm payment (only if clientSecret exists - trial subscriptions may not have one)
      if (clientSecret) {
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error('Payment form not loaded');
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
            },
          },
        });

        if (stripeError) {
          throw new Error(parseStripeError(stripeError));
        }

        if (paymentIntent?.status !== 'succeeded') {
          throw new Error('Payment was not completed successfully. Please try again.');
        }
      } else {
        // No immediate payment required for trial subscription
        console.log('No payment required for trial subscription');
      }

      // Step 3: Create Bubble account with retry logic
        await retryApiCall(async () => {
          const bubbleResponse = await fetch('/api/bubble/create-account', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              ...formData,
              stripe_customer_id: customerId,
              subscription_id: subscriptionId,
            }),
          });

          if (!bubbleResponse.ok) {
            const errorData = await bubbleResponse.json().catch(() => ({}));
            throw new Error(parseApiError(errorData, 'Failed to create account. Please contact support.'));
          }

          return bubbleResponse.json();
        });

        // Success - redirect to success page
        setFormState({ isLoading: false, error: null, errorList: undefined, step: 'success' });
        router.push('/signup/success');
    } catch (error: unknown) {
      console.error('Signup error:', error);
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
          <h2 className="h2 mb-4">Creating your account...</h2>
          <p className="small-grey">
            Please don&apos;t close this window. We&apos;re setting up your Pilla account and processing your payment.
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
                  {formState.errorList && (
                    <ul className="text-red-700 text-sm mt-2 ml-2 space-y-1">
                      {formState.errorList.map((error, index) => (
                        <li key={index} className="flex items-start gap-1">
                          <span className="text-red-500">•</span>
                          <span>{error}</span>
                        </li>
                      ))}
                    </ul>
                  )}
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

          {/* Personal Information */}
          <div>
            <h3 className="small-blue mb-4">Personal Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your full name"
                />
                {validationErrors.fullName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.fullName}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Enter your email address"
                />
                {validationErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Create a secure password"
                />
                {validationErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.password}</p>
                )}
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div>
            <h3 className="small-blue mb-4">Business Information</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="firstLocationName" className="block text-sm font-medium text-gray-700 mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  id="firstLocationName"
                  name="firstLocationName"
                  value={formData.firstLocationName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="e.g., Downtown Restaurant"
                />
                {validationErrors.firstLocationName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstLocationName}</p>
                )}
              </div>

              <div>
                <label htmlFor="firstTeamName" className="block text-sm font-medium text-gray-700 mb-1">
                  Team Name
                </label>
                <input
                  type="text"
                  id="firstTeamName"
                  name="firstTeamName"
                  value={formData.firstTeamName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="e.g., Kitchen Staff"
                />
                {validationErrors.firstTeamName && (
                  <p className="mt-1 text-sm text-red-600">{validationErrors.firstTeamName}</p>
                )}
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div>
            <h3 className="small-blue mb-4">Payment Information</h3>
            <p className="text-sm text-gray-600 mb-4">
              Your trial is free for 7 days. You&apos;ll only be charged if you continue after the trial period.
            </p>
            
            <div className="p-4 border border-gray-300 rounded-lg bg-white">
              <CardElement options={cardElementOptions} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!stripe || formState.isLoading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState.isLoading ? 'Processing...' : 'Start 7-Day Free Trial'}
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