// Database abstraction layer with caching support
import fs from 'fs/promises';
import path from 'path';

// In-memory cache for development
const cache = new Map();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// Database service class
class DatabaseService {
  constructor() {
    this.dataDir = path.join(process.cwd(), 'data');
    this.ensureDataDirectory();
  }

  async ensureDataDirectory() {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  // Generic file operations with caching
  async readFile(filename) {
    const cacheKey = `file:${filename}`;
    const cached = cache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }

    try {
      const filePath = path.join(this.dataDir, filename);
      const data = await fs.readFile(filePath, 'utf-8');
      const parsed = JSON.parse(data);
      
      cache.set(cacheKey, {
        data: parsed,
        timestamp: Date.now()
      });
      
      return parsed;
    } catch (error) {
      if (error.code === 'ENOENT') {
        return null;
      }
      throw error;
    }
  }

  async writeFile(filename, data) {
    const filePath = path.join(this.dataDir, filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
    
    // Update cache
    const cacheKey = `file:${filename}`;
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    return true;
  }

  async deleteFile(filename) {
    const filePath = path.join(this.dataDir, filename);
    await fs.unlink(filePath);
    
    // Remove from cache
    const cacheKey = `file:${filename}`;
    cache.delete(cacheKey);
    
    return true;
  }

  // Contact form data operations
  async saveContactSubmission(data) {
    const timestamp = new Date().toISOString();
    const submission = {
      id: Date.now().toString(),
      ...data,
      timestamp,
      status: 'new'
    };

    const contacts = await this.readFile('contacts.json') || [];
    contacts.push(submission);
    
    await this.writeFile('contacts.json', contacts);
    
    return submission;
  }

  async getContactSubmissions(limit = 50, offset = 0) {
    const contacts = await this.readFile('contacts.json') || [];
    return contacts
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(offset, offset + limit);
  }

  async updateContactStatus(id, status) {
    const contacts = await this.readFile('contacts.json') || [];
    const contact = contacts.find(c => c.id === id);
    
    if (!contact) {
      throw new Error('Contact submission not found');
    }
    
    contact.status = status;
    contact.updatedAt = new Date().toISOString();
    
    await this.writeFile('contacts.json', contacts);
    return contact;
  }

  // Site content operations
  async saveSiteContent(data) {
    try {
      // Database logging disabled for production
    // console.log('Database: Saving site content:', data);
      
      await this.writeFile('site-content.json', data);
              // console.log('Database: Saved to data/site-content.json');
      
      // Also save to public directory for static access
      const publicPath = path.join(process.cwd(), 'public', 'siteContent.json');
      await fs.writeFile(publicPath, JSON.stringify(data, null, 2));
              // console.log('Database: Saved to public/siteContent.json');
      
      return true;
    } catch (error) {
      console.error('Database: Error saving site content:', error);
      throw error;
    }
  }

  async getSiteContent() {
    return await this.readFile('site-content.json');
  }

  // Analytics and logging
  async logAnalytics(event, data = {}) {
    const analytics = await this.readFile('analytics.json') || [];
    const entry = {
      id: Date.now().toString(),
      event,
      data,
      timestamp: new Date().toISOString(),
      userAgent: data.userAgent,
      ip: data.ip
    };
    
    analytics.push(entry);
    
    // Keep only last 1000 entries
    if (analytics.length > 1000) {
      analytics.splice(0, analytics.length - 1000);
    }
    
    await this.writeFile('analytics.json', analytics);
    return entry;
  }

  async getAnalytics(limit = 100) {
    const analytics = await this.readFile('analytics.json') || [];
    return analytics
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, limit);
  }

  // Backup operations
  async createBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(this.dataDir, 'backups');
    
    try {
      await fs.access(backupDir);
    } catch {
      await fs.mkdir(backupDir, { recursive: true });
    }

    const files = await fs.readdir(this.dataDir);
    const backupData = {};

    for (const file of files) {
      if (file.endsWith('.json')) {
        try {
          const data = await this.readFile(file);
          backupData[file] = data;
        } catch (error) {
          console.error(`Failed to backup ${file}:`, error);
        }
      }
    }

    const backupPath = path.join(backupDir, `backup-${timestamp}.json`);
    await fs.writeFile(backupPath, JSON.stringify(backupData, null, 2));
    
    return backupPath;
  }

  async restoreBackup(backupPath) {
    const backupData = JSON.parse(await fs.readFile(backupPath, 'utf-8'));
    
    for (const [filename, data] of Object.entries(backupData)) {
      await this.writeFile(filename, data);
    }
    
    return true;
  }

  // Cache management
  clearCache() {
    cache.clear();
    return true;
  }

  getCacheStats() {
    return {
      size: cache.size,
      entries: Array.from(cache.keys())
    };
  }

  // Health check
  async healthCheck() {
    try {
      await this.ensureDataDirectory();
      const testData = { test: true, timestamp: Date.now() };
      await this.writeFile('health-check.json', testData);
      const readData = await this.readFile('health-check.json');
      await this.deleteFile('health-check.json');
      
      return {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        cacheSize: cache.size
      };
    } catch (error) {
      return {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  }
}

// Export singleton instance
export const databaseService = new DatabaseService(); 