import fs from 'fs';
import path from 'path';

// File system watcher for content directory changes (FAQs and blogs)
class ContentWatcher {
  private watchers: fs.FSWatcher[] = [];
  private debounceTimer: NodeJS.Timeout | null = null;
  private readonly debounceMs = 5000; // Wait 5 seconds after last change
  private readonly answersDir = path.join(process.cwd(), 'content', 'answers');
  private readonly blogDir = path.join(process.cwd(), 'content', 'blog');

  constructor() {
    this.startWatching();
  }

  private startWatching() {
    const directories = [
      { path: this.answersDir, type: 'answers' },
      { path: this.blogDir, type: 'blog' }
    ].filter(dir => fs.existsSync(dir.path));

    if (directories.length === 0) {
      console.warn('No content directories found');
      return;
    }

    console.log(`🔍 Starting content file watcher for: ${directories.map(d => d.type).join(', ')}`);

    // Watch each directory
    for (const { path: dirPath, type } of directories) {
      const watcher = fs.watch(dirPath, { recursive: false }, (eventType, filename) => {
        if (!filename || !filename.endsWith('.md')) {
          return;
        }

        console.log(`📄 ${type} file ${eventType}:`, filename);
        
        // Debounce multiple rapid file changes
        if (this.debounceTimer) {
          clearTimeout(this.debounceTimer);
        }

        this.debounceTimer = setTimeout(() => {
          this.triggerEmbeddingUpdate(eventType, filename, type);
        }, this.debounceMs);
      });

      watcher.on('error', (error) => {
        console.error(`${type} watcher error:`, error);
        this.restartWatcher();
      });

      this.watchers.push(watcher);
    }
  }

  private async triggerEmbeddingUpdate(eventType: string, filename: string, contentType: string) {
    try {
      console.log(`🚀 Triggering embedding update for ${filename} (${eventType}, ${contentType})`);

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
          contentType,
          eventType
        })
      });

      const result = await response.json();

      if (result.success) {
        console.log(`✅ Auto-embedding completed for ${filename} (${contentType}):`, {
          processed: result.data.processed,
          newEmbeddings: result.data.newEmbeddings,
          updatedEmbeddings: result.data.updatedEmbeddings
        });
      } else {
        console.error(`❌ Auto-embedding failed for ${filename} (${contentType}):`, result.error);
      }

    } catch (error) {
      console.error(`💥 Failed to trigger embedding update for ${filename} (${contentType}):`, error);
    }
  }

  private restartWatcher() {
    console.log('🔄 Restarting content watcher...');
    this.stop();
    setTimeout(() => {
      this.startWatching();
    }, 5000);
  }

  public stop() {
    // Close all watchers
    for (const watcher of this.watchers) {
      watcher.close();
    }
    this.watchers = [];
    
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    
    console.log('🛑 Content watcher stopped');
  }
}

// Singleton instance
let contentWatcher: ContentWatcher | null = null;

export function startFAQWatcher() {
  if (!contentWatcher && process.env.NODE_ENV === 'production') {
    contentWatcher = new ContentWatcher();
    
    // Graceful shutdown
    process.on('SIGINT', () => {
      contentWatcher?.stop();
      process.exit(0);
    });
    
    process.on('SIGTERM', () => {
      contentWatcher?.stop();
      process.exit(0);
    });
  }
  
  return contentWatcher;
}

export function stopFAQWatcher() {
  if (contentWatcher) {
    contentWatcher.stop();
    contentWatcher = null;
  }
}