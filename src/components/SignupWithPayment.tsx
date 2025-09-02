'use client';

import { useState, useEffect } from 'react';
import StripeProvider from './StripeProvider';
import SignupForm from './SignupForm';

export default function SignupWithPayment() {
  // Don't initialize setup intent here - let SignupForm handle it
  return (
    <StripeProvider>
      <SignupForm />
    </StripeProvider>
  );
}