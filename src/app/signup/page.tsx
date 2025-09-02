import { Metadata } from 'next';
import SignupWithPayment from '@/components/SignupWithPayment';

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
  return <SignupWithPayment />;
}