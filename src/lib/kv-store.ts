// KV Store implementation for Vercel KV
// This can be easily swapped out for Redis or other KV stores

import { PageViewData, SponsorData } from './analytics';

interface KVStore {
  get(key: string): Promise<string | null>;
  set(key: string, value: string, ttl?: number): Promise<void>;
  incr(key: string): Promise<number>;
  scan(pattern: string): Promise<string[]>;
  del(key: string): Promise<void>;
}

class VercelKVStore implements KVStore {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private kv: any;

  constructor() {
    // Use real Vercel KV in production, mock in development
    if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
      // Import Vercel KV dynamically
      import('@vercel/kv').then(({ kv }) => {
        this.kv = kv;
      });
    } else {
      console.log('Using mock KV store (development mode)');
      this.kv = this.createMockKV();
    }
  }

  private createMockKV() {
    // Mock implementation for development
    const store = new Map<string, { value: string, expires?: number }>();
    
    return {
      async get(key: string): Promise<string | null> {
        const item = store.get(key);
        if (!item) return null;
        if (item.expires && Date.now() > item.expires) {
          store.delete(key);
          return null;
        }
        return item.value;
      },
      
      async set(key: string, value: string, ttl?: number): Promise<void> {
        const expires = ttl ? Date.now() + (ttl * 1000) : undefined;
        store.set(key, { value, expires });
      },
      
      async incr(key: string): Promise<number> {
        const current = await this.get(key);
        const newValue = (current ? parseInt(current, 10) : 0) + 1;
        await this.set(key, newValue.toString());
        return newValue;
      },
      
      async scan(pattern: string): Promise<string[]> {
        // Simple pattern matching for mock
        const regex = new RegExp(pattern.replace('*', '.*'));
        return Array.from(store.keys()).filter(key => regex.test(key));
      },
      
      async del(key: string): Promise<void> {
        store.delete(key);
      }
    };
  }

  async get(key: string): Promise<string | null> {
    try {
      return await this.kv.get(key);
    } catch (error) {
      console.error(`KV get error for key ${key}:`, error);
      return null;
    }
  }

  async set(key: string, value: string, ttl?: number): Promise<void> {
    try {
      if (ttl) {
        await this.kv.set(key, value, { ex: ttl });
      } else {
        await this.kv.set(key, value);
      }
    } catch (error) {
      console.error(`KV set error for key ${key}:`, error);
    }
  }

  async incr(key: string): Promise<number> {
    try {
      return await this.kv.incr(key);
    } catch (error) {
      console.error(`KV incr error for key ${key}:`, error);
      return 0;
    }
  }

  async scan(pattern: string): Promise<string[]> {
    try {
      return await this.kv.scan(pattern);
    } catch (error) {
      console.error(`KV scan error for pattern ${pattern}:`, error);
      return [];
    }
  }

  async del(key: string): Promise<void> {
    try {
      await this.kv.del(key);
    } catch (error) {
      console.error(`KV del error for key ${key}:`, error);
    }
  }
}

// Factory function to create the appropriate KV store
function createKVStore(): KVStore {
  // In production, check environment and return appropriate store
  // For now, always return VercelKVStore
  return new VercelKVStore();
}

export const kvStore = createKVStore();

// High-level functions for analytics
export class AnalyticsKV {
  private store: KVStore;

  constructor(store: KVStore) {
    this.store = store;
  }

  async trackPageView(data: PageViewData): Promise<void> {
    const month = new Date(data.timestamp).toISOString().substring(0, 7); // YYYY-MM
    const viewKey = `views:${data.clusterId}:${data.country}:${month}`;
    
    try {
      // Increment the view counter
      await this.store.incr(viewKey);
      
      // Store individual page view for debugging (with TTL)
      const individualViewKey = `pageview:${data.clusterId}:${data.timestamp}:${Math.random().toString(36).substr(2, 9)}`;
      await this.store.set(individualViewKey, JSON.stringify(data), 90 * 24 * 60 * 60); // 90 days TTL
      
    } catch (error) {
      console.error('Failed to track page view in KV:', error);
    }
  }

  async getClusterViews(clusterId: string, country: string, month: string): Promise<number> {
    const key = `views:${clusterId}:${country}:${month}`;
    
    try {
      const result = await this.store.get(key);
      return result ? parseInt(result, 10) : 0;
    } catch (error) {
      console.error('Failed to get cluster views from KV:', error);
      return 0;
    }
  }

  async setSponsorData(clusterId: string, country: string, sponsor: SponsorData): Promise<void> {
    const key = `sponsor:${clusterId}:${country}`;
    
    try {
      await this.store.set(key, JSON.stringify(sponsor));
    } catch (error) {
      console.error('Failed to set sponsor data in KV:', error);
    }
  }

  async getSponsorData(clusterId: string, country: string): Promise<SponsorData | null> {
    const key = `sponsor:${clusterId}:${country}`;
    
    try {
      const result = await this.store.get(key);
      return result ? JSON.parse(result) : null;
    } catch (error) {
      console.error('Failed to get sponsor data from KV:', error);
      return null;
    }
  }

  async getMonthlyViewsForBilling(month: string): Promise<Array<{clusterId: string, country: string, views: number}>> {
    try {
      const pattern = `views:*:*:${month}`;
      const keys = await this.store.scan(pattern);
      
      const results = [];
      for (const key of keys) {
        const viewCount = await this.store.get(key);
        if (viewCount) {
          const [, clusterId, country] = key.split(':');
          results.push({
            clusterId,
            country,
            views: parseInt(viewCount, 10)
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error('Failed to get monthly views for billing from KV:', error);
      return [];
    }
  }

  async getAllSponsors(): Promise<Array<{clusterId: string, country: string, sponsor: SponsorData}>> {
    try {
      const pattern = 'sponsor:*';
      const keys = await this.store.scan(pattern);
      
      const results = [];
      for (const key of keys) {
        const sponsorData = await this.store.get(key);
        if (sponsorData) {
          const [, clusterId, country] = key.split(':');
          results.push({
            clusterId,
            country,
            sponsor: JSON.parse(sponsorData)
          });
        }
      }
      
      return results;
    } catch (error) {
      console.error('Failed to get all sponsors from KV:', error);
      return [];
    }
  }
}

export const analyticsKV = new AnalyticsKV(kvStore);