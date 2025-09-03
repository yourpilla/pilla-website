import { Metadata } from 'next';
import DirectSignupButton from '@/components/DirectSignupButton';

export const metadata: Metadata = {
  title: 'Sign Up - Start Your 7-Day Free Trial | Pilla',
  description: 'Join thousands of hospitality professionals using Pilla. One-click signup - complete everything securely with Stripe.',
  keywords: 'hospitality management, restaurant software, staff training, free trial, signup, one click',
  openGraph: {
    title: 'Sign Up - Start Your 7-Day Free Trial | Pilla',
    description: 'Join thousands of hospitality professionals using Pilla. One-click signup process.',
    type: 'website',
  },
};

export default function DirectSignupPage() {
  return (
    <div className="min-h-screen bg-main py-6 sm:py-12 px-4">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="h1 mb-4">Start Your 7-Day Free Trial</h1>
          <p className="small-grey mb-6">
            Join thousands of hospitality professionals using Pilla to streamline their operations.
          </p>
          <p className="text-sm text-blue-600 mb-8">
            ✨ One-click signup - complete everything on our secure checkout page!
          </p>
        </div>

        {/* Signup Button */}
        <div className="white-card p-6 sm:p-8">
          <DirectSignupButton />
        </div>
      </div>
    </div>
  );
}