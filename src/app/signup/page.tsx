import { Metadata } from 'next';
import StripeProvider from '@/components/StripeProvider';
import SignupForm from '@/components/SignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - Start Your 7-Day Free Trial | Pilla',
  description: 'Join thousands of hospitality professionals using Pilla to streamline their operations. Start your 7-day free trial today - no commitment required.',
  keywords: 'hospitality management, restaurant software, staff training, free trial, signup',
  openGraph: {
    title: 'Sign Up - Start Your 7-Day Free Trial | Pilla',
    description: 'Join thousands of hospitality professionals using Pilla to streamline their operations. Start your 7-day free trial today.',
    type: 'website',
  },
};

export default function SignupPage() {
  return (
    <StripeProvider>
      <SignupForm />
    </StripeProvider>
  );
}