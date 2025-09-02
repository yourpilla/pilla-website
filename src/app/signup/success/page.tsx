'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function SignupSuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [completionStatus, setCompletionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [accountData, setAccountData] = useState<any>(null);

  useEffect(() => {
    async function completeSignup() {
      if (!sessionId) {
        setError('No session ID provided');
        setCompletionStatus('error');
        return;
      }

      try {
        const response = await fetch('/api/complete-checkout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to complete signup');
        }

        const data = await response.json();
        setAccountData(data);
        setCompletionStatus('success');
      } catch (err: unknown) {
        console.error('Signup completion error:', err);
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setCompletionStatus('error');
      }
    }

    completeSignup();
  }, [sessionId]);

  if (completionStatus === 'loading') {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center px-4">
        <div className="white-card max-w-md w-full p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
          <h2 className="h2 mb-4">Completing your signup...</h2>
          <p className="small-grey">
            Please wait while we finalize your account setup.
          </p>
        </div>
      </div>
    );
  }

  if (completionStatus === 'error') {
    return (
      <div className="min-h-screen bg-main flex items-center justify-center px-4">
        <div className="white-card max-w-md w-full p-8 text-center">
          <ExclamationCircleIcon className="w-12 h-12 text-red-600 mx-auto mb-6" />
          <h2 className="h2 mb-4">Signup Error</h2>
          <p className="small-grey mb-6">{error}</p>
          <a
            href="/signup"
            className="inline-block bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700"
          >
            Try Again
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-main py-6 sm:py-12 px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
            <CheckCircleIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Header */}
        <div className="mb-12">
          <h1 className="h1 mb-4 text-green-800">Welcome to Pilla! 🎉</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your account has been created successfully and your 7-day free trial has started.
          </p>
          <div className="white-card p-6 mb-8">
            <h2 className="small-blue mb-2">What happens next?</h2>
            <div className="text-left space-y-3 text-gray-600">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">1</div>
                <span>Download the Pilla mobile app using the links below</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">2</div>
                <span>Log in with the email and password you just created</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">3</div>
                <span>Start exploring templates, training materials, and management tools</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-semibold text-blue-600">4</div>
                <span>Enjoy your 7-day free trial - no charges until day 8</span>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mb-12">
          <h2 className="h2 mb-8">Download the Pilla App</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* iOS App */}
            <div className="white-card p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                <DevicePhoneMobileIcon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="small-blue mb-2">iOS App</h3>
              <p className="text-sm text-gray-600 mb-4">
                Available on the App Store for iPhone and iPad
              </p>
              <a 
                href="https://apps.apple.com/app/pilla-hospitality/id123456789" 
                className="inline-flex items-center justify-center w-full bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download for iOS
              </a>
            </div>

            {/* Android App */}
            <div className="white-card p-6">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                <DevicePhoneMobileIcon className="w-8 h-8 text-gray-600" />
              </div>
              <h3 className="small-blue mb-2">Android App</h3>
              <p className="text-sm text-gray-600 mb-4">
                Available on Google Play Store for Android devices
              </p>
              <a 
                href="https://play.google.com/store/apps/details?id=com.pilla.hospitality" 
                className="inline-flex items-center justify-center w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                Download for Android
              </a>
            </div>
          </div>

          {/* Web App Alternative */}
          <div className="white-card p-6 mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <ComputerDesktopIcon className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="small-blue mb-2">Prefer to use the web?</h3>
            <p className="text-sm text-gray-600 mb-4">
              You can also access Pilla directly in your browser
            </p>
            <a 
              href="https://yourpilla.com/login" 
              className="inline-flex items-center justify-center bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open Web App
            </a>
          </div>
        </div>

        {/* Support Information */}
        <div className="white-card p-6 mb-8">
          <h3 className="small-blue mb-4">Need Help Getting Started?</h3>
          <div className="space-y-4 text-sm">
            <div>
              <strong className="text-gray-900">Email Support:</strong>
              <br />
              <a href="mailto:support@yourpilla.com" className="text-blue-600 hover:underline">
                support@yourpilla.com
              </a>
            </div>
            <div>
              <strong className="text-gray-900">Phone Support:</strong>
              <br />
              <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                +1 (234) 567-890
              </a>
            </div>
            <div>
              <strong className="text-gray-900">Live Chat:</strong>
              <br />
              Available in the mobile app and web platform
            </div>
          </div>
        </div>

        {/* Trial Information */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Your 7-Day Free Trial</h3>
          <p className="text-blue-800 text-sm">
            You have full access to all Pilla features for the next 7 days. 
            Your trial will automatically convert to a paid subscription on day 8 unless you cancel. 
            You can manage your subscription anytime in the app settings.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/"
            className="inline-flex items-center justify-center bg-gray-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
          >
            Back to Homepage
          </Link>
          <Link 
            href="/blog"
            className="inline-flex items-center justify-center border border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
          >
            Read Our Blog
          </Link>
        </div>
      </div>
    </div>
  );
}