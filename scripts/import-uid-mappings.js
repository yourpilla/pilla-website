const fs = require('fs');
const path = require('path');
const { Redis } = require('@upstash/redis');

// Initialize Redis client
const redis = new Redis({
  url: process.env.KV_REST_API_URL,
  token: process.env.KV_REST_API_TOKEN,
});

async function importUIDMappings() {
  console.log('🚀 Starting UID-to-name mapping import to Redis...\n');

  const dataDir = path.join(__dirname, '..', 'data');
  
  const files = [
    { filename: 'export_All-Users-modified--_2025-09-05_11-17-03.csv', type: 'user' },
    { filename: 'export_All-teams-modified_2025-09-05_11-15-27.csv', type: 'team' },
    { filename: 'export_All-sites-modified_2025-09-05_11-16-18.csv', type: 'site' }
  ];

  let totalMappings = 0;

  for (const { filename, type } of files) {
    const filePath = path.join(dataDir, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  Warning: ${filename} not found, skipping...`);
      continue;
    }

    console.log(`📂 Processing ${filename}...`);
    
    try {
      const csvContent = fs.readFileSync(filePath, 'utf8');
      const lines = csvContent.trim().split('\n');
      
      // Skip header row
      const dataLines = lines.slice(1);
      
      let successCount = 0;
      let errorCount = 0;
      
      for (const line of dataLines) {
        if (!line.trim()) continue; // Skip empty lines
        
        const [name, uid] = line.split(',').map(item => item.trim().replace(/^"(.*)"$/, '$1'));
        
        if (!name || !uid) {
          console.log(`❌ Invalid line in ${filename}: ${line}`);
          errorCount++;
          continue;
        }
        
        try {
          const redisKey = `${type}:${uid}`;
          await redis.set(redisKey, name);
          successCount++;
          console.log(`✅ ${redisKey} → "${name}"`);
        } catch (error) {
          console.log(`❌ Failed to set ${type}:${uid} → "${name}": ${error.message}`);
          errorCount++;
        }
      }
      
      console.log(`📊 ${filename}: ${successCount} imported, ${errorCount} errors\n`);
      totalMappings += successCount;
      
    } catch (error) {
      console.log(`❌ Error processing ${filename}: ${error.message}\n`);
    }
  }
  
  console.log(`🎉 Import complete! Total mappings imported: ${totalMappings}`);
  
  // Test a few random mappings
  console.log('\n🧪 Testing random mappings...');
  try {
    const testKeys = await redis.keys('*');
    const sampleKeys = testKeys.slice(0, 3); // Test first 3 keys
    
    for (const key of sampleKeys) {
      const value = await redis.get(key);
      console.log(`✅ ${key} → "${value}"`);
    }
  } catch (error) {
    console.log(`❌ Error testing mappings: ${error.message}`);
  }
}

// Run the import
importUIDMappings().catch(console.error);