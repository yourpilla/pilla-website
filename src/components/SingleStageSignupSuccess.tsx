'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircleIcon, DevicePhoneMobileIcon, ComputerDesktopIcon, ExclamationCircleIcon, EyeIcon, EyeSlashIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

interface AccountData {
  customerId: string;
  subscriptionId: string;
  subscriptionItemId: string;
  bubbleUserId: string;
  trialEndsAt: number | null;
  generatedPassword: string;
  email: string;
  fullName: string;
  locationName: string;
  locationAddress: string;
  teamName: string;
}

export default function SingleStageSignupSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [completionStatus, setCompletionStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordCopied, setPasswordCopied] = useState(false);

  useEffect(() => {
    async function completeSignup() {
      if (!sessionId) {
        setError('No session ID provided');
        setCompletionStatus('error');
        return;
      }

      try {
        const response = await fetch('/api/complete-single-stage-checkout', {
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
        console.error('Single-stage signup completion error:', err);
        setError(err instanceof Error ? err.message : 'Something went wrong');
        setCompletionStatus('error');
      }
    }

    completeSignup();
  }, [sessionId]);

  const copyPassword = async () => {
    if (accountData?.generatedPassword) {
      try {
        await navigator.clipboard.writeText(accountData.generatedPassword);
        setPasswordCopied(true);
        setTimeout(() => setPasswordCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy password:', err);
      }
    }
  };

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
            href="/signup/single-stage"
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

        {/* Header */}
        <div className="mb-12">
          <h1 className="h1 mb-4 text-green-800">Welcome to Pilla! 🎉</h1>
          <p className="text-lg text-gray-700 mb-6">
            Your account has been created successfully and your 7-day free trial has started.
          </p>

          {/* Account Details */}
          {accountData && (
            <div className="white-card pt-8">
              <div className="space-y-4 text-sm">
                <div>
                  <strong className="text-gray-900">Email:</strong>
                  <p className="text-gray-600">{accountData.email}</p>
                </div>
                
                {/* Generated Password */}
                <div>
                  <strong className="text-gray-900 block mb-2">Your Generated Password:</strong>
                  <div className="flex items-center gap-2 mb-2">
                    <code className="bg-white px-3 py-2 rounded border text-lg font-mono flex-1">
                      {showPassword ? accountData.generatedPassword : '••••••••••••'}
                    </code>
                    <button
                      onClick={() => setShowPassword(!showPassword)}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={copyPassword}
                      className="p-2 text-gray-500 hover:text-gray-700"
                      title="Copy password"
                    >
                      <ClipboardDocumentIcon className="w-5 h-5" />
                    </button>
                  </div>
                  {passwordCopied && (
                    <p className="text-green-600 text-xs">Password copied to clipboard!</p>
                  )}
                  <p className="text-gray-600 text-xs mt-2">
                    <strong>Important:</strong> Save this password now! You can change it after logging in.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* App Download Section */}
        <div className="mb-12">
          <h2 className="h2 mb-8">Download the Pilla App</h2>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
            {/* iOS App */}
            <a 
              href="https://apps.apple.com/app/pilla-hospitality/id123456789" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="/platform-logos/Download_on_the_App_Store_Badge_US-UK_RGB_blk_092917.svg"
                alt="Download on the App Store"
                className="h-16 w-auto hover:scale-105 transition-transform"
              />
            </a>

            {/* Android App */}
            <a 
              href="https://play.google.com/store/apps/details?id=com.pilla.hospitality" 
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src="/platform-logos/GetItOnGooglePlay_Badge_Web_color_English.png"
                alt="Get it on Google Play"
                className="h-16 w-auto hover:scale-105 transition-transform"
              />
            </a>
          </div>

        </div>

        {/* Support Information */}
        <div className="white-card py-8">
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


        {/* Navigation */}
        <div className="flex justify-center mt-8">
          <Link 
            href="/blog"
            className="btn"
          >
            Check out our Guides
          </Link>
        </div>
      </div>
    </div>
  );
}