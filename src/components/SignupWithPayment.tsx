'use client';

import SignupForm from './SignupForm';

export default function SignupWithPayment() {
  // No longer need Stripe Elements - using Checkout instead
  return <SignupForm />;
}