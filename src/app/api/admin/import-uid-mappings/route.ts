import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import * as fs from 'fs';
import * as path from 'path';

export async function POST() {
  try {
    console.log('🚀 Starting UID-to-name mapping import to Redis...');

    // Initialize Redis client
    if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
      throw new Error('Redis environment variables not configured');
    }

    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });

    const files = [
      { filename: 'export_All-Users-modified--_2025-09-05_11-17-03.csv', type: 'user' },
      { filename: 'export_All-teams-modified_2025-09-05_11-15-27.csv', type: 'team' },
      { filename: 'export_All-sites-modified_2025-09-05_11-16-18.csv', type: 'site' }
    ];

    let totalMappings = 0;
    const results: Array<{
      filename: string;
      type?: string;
      status: string;
      imported?: number;
      errors?: number;
      totalLines?: number;
      count?: number;
    }> = [];

    for (const { filename, type } of files) {
      const filePath = path.join(process.cwd(), 'data', filename);
      
      if (!fs.existsSync(filePath)) {
        console.log(`⚠️  Warning: ${filename} not found, skipping...`);
        results.push({ filename, status: 'not_found', count: 0 });
        continue;
      }

      console.log(`📂 Processing ${filename}...`);
      
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
          
          if (successCount <= 5) {
            console.log(`✅ ${redisKey} → "${name}"`);
          }
        } catch (error) {
          console.log(`❌ Failed to set ${type}:${uid} → "${name}": ${error}`);
          errorCount++;
        }
      }
      
      console.log(`📊 ${filename}: ${successCount} imported, ${errorCount} errors`);
      results.push({ 
        filename, 
        type,
        status: 'processed', 
        imported: successCount, 
        errors: errorCount,
        totalLines: dataLines.length
      });
      totalMappings += successCount;
    }
    
    console.log(`🎉 Import complete! Total mappings imported: ${totalMappings}`);
    
    // Test a few mappings
    const testResults = [];
    try {
      const testKeys = await redis.keys('*:*'); // Get keys with colons (our format)
      const sampleKeys = testKeys.slice(0, 5); // Test first 5 keys
      
      for (const key of sampleKeys) {
        const value = await redis.get(key);
        testResults.push({ key, value });
      }
    } catch (error) {
      console.log(`❌ Error testing mappings: ${error}`);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${totalMappings} UID mappings to Redis`,
      results: results,
      totalMappings: totalMappings,
      testMappings: testResults
    });

  } catch (error) {
    console.error('Import failed:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error',
        message: 'Failed to import UID mappings'
      },
      { status: 500 }
    );
  }
}