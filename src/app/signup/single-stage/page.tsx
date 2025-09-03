import { Metadata } from 'next';
import SingleStageSignupForm from '@/components/SingleStageSignupForm';

export const metadata: Metadata = {
  title: 'Sign Up - Start Your 7-Day Free Trial | Pilla',
  description: 'Join thousands of hospitality professionals using Pilla. Single-step checkout process - enter your email and complete everything securely with Stripe.',
  keywords: 'hospitality management, restaurant software, staff training, free trial, signup, single step',
  openGraph: {
    title: 'Sign Up - Start Your 7-Day Free Trial | Pilla',
    description: 'Join thousands of hospitality professionals using Pilla. Single-step checkout process.',
    type: 'website',
  },
};

export default function SingleStageSignupPage() {
  return <SingleStageSignupForm />;
}