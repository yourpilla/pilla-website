# Setting Up Redis Storage for Analytics & Sponsorship

## Upstash Redis via Vercel (Recommended)

1. **Create Redis via Vercel Integration:**
   - Go to your Vercel project dashboard
   - Navigate to "Integrations" tab
   - Search for "Upstash Redis"
   - Click "Add Integration"
   - Choose your project and create database

2. **Install Upstash Redis package:**
   ```bash
   npm install @upstash/redis
   ```

3. **Environment variables added automatically:**
   Vercel will automatically add these to your project:
   ```
   UPSTASH_REDIS_REST_URL=https://xxxxx.upstash.io
   UPSTASH_REDIS_REST_TOKEN=xxxxx
   ```

4. **Update KV implementation:**
   Replace the mock implementation in `src/lib/kv-store.ts`:
   
   ```typescript
   import { kv } from '@vercel/kv';
   
   class VercelKVStore implements KVStore {
     constructor() {
       this.kv = kv;
     }
     
     async get(key: string): Promise<string | null> {
       try {
         return await this.kv.get(key);
       } catch (error) {
         console.error(`KV get error for key ${key}:`, error);
         return null;
       }
     }
     
     // ... rest of the implementation
   }
   ```

## Alternative: Redis Setup

If you prefer Redis, you can use Upstash Redis:

1. **Install Redis client:**
   ```bash
   npm install @upstash/redis
   ```

2. **Create Redis database at Upstash.com**

3. **Add environment variables:**
   ```
   REDIS_URL=https://xxxxx.upstash.io
   REDIS_TOKEN=xxxxx
   ```

## Testing the Setup

1. **Check middleware is working:**
   - Visit a blog page like `/blog/coffee-machine-risk-assessment`
   - Check server logs for tracking messages
   
2. **Verify KV storage:**
   - Use Vercel KV dashboard to see stored keys
   - Keys should follow pattern: `views:cluster-id:country:YYYY-MM`

## Data Structure

### View Tracking Keys:
- `views:{clusterId}:{country}:{YYYY-MM}` → integer count
- `pageview:{clusterId}:{timestamp}:{random}` → PageViewData JSON (TTL: 90 days)

### Sponsor Data Keys:
- `sponsor:{clusterId}:{country}` → SponsorData JSON

### Example KV Data:
```
views:coffee-machine-risk-assessment:GB:2025-01 → "45"
views:coffee-machine-risk-assessment:US:2025-01 → "23"
sponsor:coffee-machine-risk-assessment:GB → {"stripeCustomerId":"cus_xxx", "ratePerView":0.30, "active":true}
```