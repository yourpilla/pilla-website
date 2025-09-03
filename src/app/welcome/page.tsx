import { Suspense } from 'react';
import { Metadata } from 'next';
import SingleStageSignupSuccess from '@/components/SingleStageSignupSuccess';

export const metadata: Metadata = {
  title: 'Welcome to Pilla',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    noarchive: true,
    noimageindex: true,
    nosnippet: true,
  },
};

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-main flex items-center justify-center px-4">
      <div className="white-card max-w-md w-full p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-6"></div>
        <h2 className="h2 mb-4">Loading...</h2>
        <p className="small-grey">Please wait while we load your account details.</p>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <SingleStageSignupSuccess />
    </Suspense>
  );
}