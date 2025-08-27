import { analyticsKV } from './kv-store';

export interface PageViewData {
  pathname: string;
  clusterId: string;
  country: string;
  timestamp: number;
  ip: string;
  userAgent: string;
}

export interface ClusterViewData {
  clusterId: string;
  country: string;
  month: string; // YYYY-MM format
  viewCount: number;
  lastUpdated: number;
}

export interface SponsorData {
  clusterId: string;
  country: string;
  stripeCustomerId: string;
  ratePerView: number; // e.g., 0.30 for 30p
  active: boolean;
  createdAt: number;
  lastBilled?: number;
}

// Public API
export async function trackPageView(data: PageViewData): Promise<void> {
  // Run asynchronously to not block the request
  setImmediate(() => {
    analyticsKV.trackPageView(data).catch(error => {
      console.error('Async page view tracking failed:', error);
    });
  });
}

export async function getClusterViews(clusterId: string, country: string, month: string): Promise<number> {
  return analyticsKV.getClusterViews(clusterId, country, month);
}

export async function setSponsorData(clusterId: string, country: string, sponsor: SponsorData): Promise<void> {
  return analyticsKV.setSponsorData(clusterId, country, sponsor);
}

export async function getSponsorData(clusterId: string, country: string): Promise<SponsorData | null> {
  return analyticsKV.getSponsorData(clusterId, country);
}

export async function getMonthlyViewsForBilling(month: string): Promise<Array<{clusterId: string, country: string, views: number}>> {
  return analyticsKV.getMonthlyViewsForBilling(month);
}

export async function getAllSponsors(): Promise<Array<{clusterId: string, country: string, sponsor: SponsorData}>> {
  return analyticsKV.getAllSponsors();
}