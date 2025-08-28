import fs from 'fs';
import path from 'path';

// File system watcher for FAQ directory changes
class FAQWatcher {
  private watcher: fs.FSWatcher | null = null;
  private debounceTimer: NodeJS.Timeout | null = null;
  private readonly debounceMs = 5000; // Wait 5 seconds after last change
  private readonly answersDir = path.join(process.cwd(), 'content', 'answers');

  constructor() {
    this.startWatching();
  }

  private startWatching() {
    if (!fs.existsSync(this.answersDir)) {
      console.warn('FAQ directory not found:', this.answersDir);
      return;
    }

    console.log('🔍 Starting FAQ file watcher:', this.answersDir);

    this.watcher = fs.watch(this.answersDir, { recursive: false }, (eventType, filename) => {
      if (!filename || !filename.endsWith('.md')) {
        return;
      }

      console.log(`📄 FAQ file ${eventType}:`, filename);
      
      // Debounce multiple rapid file changes
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer);
      }

      this.debounceTimer = setTimeout(() => {
        this.triggerEmbeddingUpdate(eventType, filename);
      }, this.debounceMs);
    });

    this.watcher.on('error', (error) => {
      console.error('FAQ watcher error:', error);
      this.restartWatcher();
    });
  }

  private async triggerEmbeddingUpdate(eventType: string, filename: string) {
    try {
      console.log(`🚀 Triggering embedding update for ${filename} (${eventType})`);

      const baseUrl = process.env.VERCEL_URL 
        ? `https://${process.env.VERCEL_URL}`
        : process.env.NEXT_PUBLIC_SITE_URL
        ? `https://${process.env.NEXT_PUBLIC_SITE_URL}`
        : 'http://localhost:3000';

      const response = await fetch(`${baseUrl}/api/admin/generate-embeddings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': process.env.ADMIN_API_KEY || 'development'
        },
        body: JSON.stringify({ 
          forceRebuild: false,
          triggeredBy: 'file-watcher',
          changedFile: filename,
          eventType
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Auto-embedding completed for ${filename}:`, {
          processed: result.data.processed,
          newEmbeddings: result.data.newEmbeddings,
          updatedEmbeddings: result.data.updatedEmbeddings
        });
      } else {
        console.error(`❌ Auto-embedding failed for ${filename}:`, result.error);
      }

    } catch (error) {
      console.error(`💥 Failed to trigger embedding update for ${filename}:`, error);
    }
  }

  private restartWatcher() {
    console.log('🔄 Restarting FAQ watcher...');
    this.stop();
    setTimeout(() => {
      this.startWatching();
    }, 5000);
  }

  public stop() {
    if (this.watcher) {
      this.watcher.close();
      this.watcher = null;
    }
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    
    console.log('🛑 FAQ watcher stopped');
  }
}

// Singleton instance
let faqWatcher: FAQWatcher | null = null;

export function startFAQWatcher() {
  if (!faqWatcher && process.env.NODE_ENV === 'production') {
    faqWatcher = new FAQWatcher();
    
    // Graceful shutdown
    process.on('SIGINT', () => {
      faqWatcher?.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      faqWatcher?.stop();
      process.exit(0);
    });
  }
  
  return faqWatcher;
}

export function stopFAQWatcher() {
  if (faqWatcher) {
    faqWatcher.stop();
    faqWatcher = null;
  }
}