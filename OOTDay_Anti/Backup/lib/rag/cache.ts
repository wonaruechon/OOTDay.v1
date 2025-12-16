/**
 * LRU Cache Implementation for RAG System
 * Caches embeddings and knowledge chunks for fast retrieval
 */

import { CacheEntry } from '../types/rag-types';

/**
 * LRU Cache
 * Implements Least Recently Used cache eviction policy
 */
export class LRUCache<T> {
  private maxSize: number;
  private cache: Map<string, CacheEntry<T>>;

  constructor(maxSize: number = 100) {
    this.maxSize = maxSize;
    this.cache = new Map();
  }

  /**
   * Get value from cache
   * @param key - Cache key
   * @returns Cached value or undefined
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      return undefined;
    }

    // Update access metadata
    entry.accessCount++;
    entry.lastAccessed = new Date();

    // Move to end (most recently used)
    this.cache.delete(key);
    this.cache.set(key, entry);

    return entry.value;
  }

  /**
   * Set value in cache
   * @param key - Cache key
   * @param value - Value to cache
   */
  set(key: string, value: T): void {
    // Remove if already exists
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // Evict least recently used if at capacity
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    // Add new entry
    const entry: CacheEntry<T> = {
      value,
      cachedAt: new Date(),
      accessCount: 0,
      lastAccessed: new Date()
    };

    this.cache.set(key, entry);
  }

  /**
   * Check if key exists in cache
   * @param key - Cache key
   * @returns True if key exists
   */
  has(key: string): boolean {
    return this.cache.has(key);
  }

  /**
   * Delete value from cache
   * @param key - Cache key
   * @returns True if deleted
   */
  delete(key: string): boolean {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  clear(): void {
    this.cache.clear();
  }

  /**
   * Get cache size
   * @returns Number of entries in cache
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Get all cache keys
   * @returns Array of cache keys
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get cache statistics
   * @returns Cache stats object
   */
  getStats() {
    const entries = Array.from(this.cache.values());
    const totalAccesses = entries.reduce((sum, entry) => sum + entry.accessCount, 0);
    const avgAccessCount = entries.length > 0 ? totalAccesses / entries.length : 0;

    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      totalAccesses,
      avgAccessCount,
      hitRate: 0 // Would need to track hits/misses separately
    };
  }

  /**
   * Get cache entries sorted by access count
   * @returns Array of [key, entry] tuples sorted by access count
   */
  getMostAccessed(limit: number = 10): Array<[string, CacheEntry<T>]> {
    const entries = Array.from(this.cache.entries());
    return entries
      .sort((a, b) => b[1].accessCount - a[1].accessCount)
      .slice(0, limit);
  }

  /**
   * Get cache entries sorted by last accessed time
   * @returns Array of [key, entry] tuples sorted by last accessed
   */
  getRecentlyUsed(limit: number = 10): Array<[string, CacheEntry<T>]> {
    const entries = Array.from(this.cache.entries());
    return entries
      .sort((a, b) => b[1].lastAccessed.getTime() - a[1].lastAccessed.getTime())
      .slice(0, limit);
  }
}

/**
 * Create LRU cache instance
 * @param maxSize - Maximum cache size
 * @returns LRUCache instance
 */
export function createCache<T>(maxSize: number = 100): LRUCache<T> {
  return new LRUCache<T>(maxSize);
}
