# Setting Up KV Storage for Analytics & Sponsorship

## Vercel KV Setup (Recommended)

1. **Install Vercel KV package:**
   ```bash
   npm install @vercel/kv
   ```

2. **Create KV database in Vercel Dashboard:**
   - Go to your Vercel project dashboard
   - Navigate to "Storage" tab
   - Click "Create Database" → "KV"
   - Choose a database name (e.g., "pilla-analytics")

3. **Add environment variables:**
   Vercel will automatically provide these when you create the KV database:
   ```
   KV_REST_API_URL=https://xxxxx.upstash.io
   KV_REST_API_TOKEN=xxxxx
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