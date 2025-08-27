'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Only track on blog and FAQ pages
    const isTrackablePage = pathname.startsWith('/blog/') || pathname.startsWith('/answers/');
    
    if (isTrackablePage) {
      // Small delay to ensure page has loaded
      setTimeout(() => {
        trackPageView();
      }, 100);
    }
  }, [pathname]);

  const trackPageView = async () => {
    try {
      let clusterId: string | null = null;
      let faqSlug: string | null = null;

      if (pathname.startsWith('/blog/')) {
        clusterId = pathname.replace('/blog/', '').replace(/\/$/, '');
      } else if (pathname.startsWith('/answers/')) {
        faqSlug = pathname.replace('/answers/', '').replace(/\/$/, '');
      }

      const trackingData = {
        pathname,
        country: 'CLIENT', // Will be detected server-side from IP
        timestamp: Date.now(),
        ip: 'client',
        userAgent: navigator.userAgent,
        clusterId,
        faqSlug
      };

      // Send tracking data to API
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trackingData)
      });

      if (!response.ok) {
        console.error('Failed to track page view:', response.statusText);
      }
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  return null; // This component renders nothing
}