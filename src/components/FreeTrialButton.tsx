'use client';

import { useState } from 'react';

interface FreeTrialButtonProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  disabled?: boolean;
  showLoadingState?: boolean;
  useCustomStyles?: boolean; // New prop to control styling
}

export default function FreeTrialButton({ 
  text = "Start Free Trial",
  size = "md",
  variant = "primary", 
  className = "",
  disabled = false,
  showLoadingState = true,
  useCustomStyles = true
}: FreeTrialButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStartTrial = async () => {
    if (disabled || isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Call the same API that the direct signup uses
      const response = await fetch('/api/create-single-stage-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const data = await response.json();
      
      // Redirect to Stripe checkout
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error) {
      console.error('Failed to start trial:', error);
      setIsLoading(false);
      // Could add error toast/notification here
      alert('Failed to start trial. Please try again.');
    }
  };

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border-blue-600',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white border-gray-600', 
    outline: 'bg-white hover:bg-gray-50 text-blue-600 border-blue-600 border-2'
  };

  // Use custom styles or rely on external CSS classes (like .btn)
  const buttonClasses = useCustomStyles 
    ? `inline-flex items-center justify-center font-semibold rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${sizeClasses[size]} ${variantClasses[variant]} ${className}`
    : `inline-flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed ${className}`;

  return (
    <button
      onClick={handleStartTrial}
      disabled={disabled || isLoading}
      className={buttonClasses}
    >
      {showLoadingState && isLoading ? (
        <>
          <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
          Starting...
        </>
      ) : (
        text
      )}
    </button>
  );
}