// Initialize background services when the app starts
import { startFAQWatcher } from './faq-watcher';

let initialized = false;

export function initializeWatchers() {
  if (initialized || process.env.NODE_ENV !== 'production') {
    return;
  }

  console.log('🚀 Initializing background services...');

  try {
    // Start FAQ file watcher in production
    startFAQWatcher();
    console.log('✅ FAQ file watcher initialized');
    
    initialized = true;
    
  } catch (error) {
    console.error('❌ Failed to initialize watchers:', error);
  }
}

// Auto-initialize when this module is imported in production
if (typeof window === 'undefined' && process.env.NODE_ENV === 'production') {
  // Small delay to ensure app is fully loaded
  setTimeout(initializeWatchers, 2000);
}