/**
 * Knowledge Base Management for RAG System
 * Loads, indexes, and maintains in-memory knowledge base
 */

import { KnowledgeChunk, EmbeddingVector, KnowledgeBaseStats } from '../types/rag-types';
import { readMarkdownFilesFromDirectories, FileInfo } from './file-utils';
import { parseMarkdownFiles } from './knowledge-parser';
import { EmbeddingsGenerator, createEmbeddingsGenerator } from './embeddings';
import { LRUCache, createCache } from './cache';
import { getRAGConfig } from '../../config/rag-config';
import path from 'path';

/**
 * Knowledge Base
 * Main class for managing the RAG knowledge base
 */
export class KnowledgeBase {
  private chunks: Map<string, KnowledgeChunk> = new Map();
  private embeddings: Map<string, EmbeddingVector> = new Map();
  private embeddingsCache: LRUCache<number[]>;
  private embeddingsGenerator: EmbeddingsGenerator;
  private config = getRAGConfig();
  private isInitialized = false;
  private lastLoadTime: Date | null = null;

  constructor() {
    this.embeddingsCache = createCache(this.config.cache.maxSize);
    this.embeddingsGenerator = createEmbeddingsGenerator(
      undefined,
      this.config.embedding.modelName,
      this.config.embedding.dimension,
      this.config.embedding.batchSize
    );
  }

  /**
   * Initialize knowledge base by loading and indexing all markdown files
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('Knowledge base already initialized');
      return;
    }

    console.log('Initializing knowledge base...');
    const startTime = Date.now();

    try {
      // Get knowledge directory paths
      const knowledgeDirs = [
        path.join(process.cwd(), this.config.paths.fashionDir),
        path.join(process.cwd(), this.config.paths.occasionsDir),
        path.join(process.cwd(), this.config.paths.brandDir)
      ];

      // Read all markdown files
      console.log('Reading markdown files...');
      const fileInfos = await readMarkdownFilesFromDirectories(knowledgeDirs);
      console.log(`Found ${fileInfos.length} markdown files`);

      // Parse files into chunks
      console.log('Parsing markdown files into chunks...');
      const chunks = await parseMarkdownFiles(
        fileInfos,
        this.config.chunking.minChunkSize,
        this.config.chunking.maxChunkSize,
        this.config.chunking.overlapSize
      );
      console.log(`Created ${chunks.length} knowledge chunks`);

      // Store chunks
      for (const chunk of chunks) {
        this.chunks.set(chunk.id, chunk);
      }

      // Generate embeddings
      console.log('Generating embeddings...');
      const embeddingResult = await this.embeddingsGenerator.generateEmbeddings(chunks);
      console.log(`Generated ${embeddingResult.embeddings.length} embeddings in ${embeddingResult.processingTimeMs}ms`);

      // Store embeddings
      for (const embedding of embeddingResult.embeddings) {
        this.embeddings.set(embedding.chunkId, embedding);
      }

      this.isInitialized = true;
      this.lastLoadTime = new Date();

      const totalTime = Date.now() - startTime;
      console.log(`Knowledge base initialized in ${totalTime}ms`);
    } catch (error) {
      console.error('Error initializing knowledge base:', error);
      throw error;
    }
  }

  /**
   * Reload knowledge base (for dynamic updates)
   */
  async reload(): Promise<void> {
    console.log('Reloading knowledge base...');
    this.isInitialized = false;
    this.chunks.clear();
    this.embeddings.clear();
    this.embeddingsCache.clear();
    await this.initialize();
  }

  /**
   * Get chunk by ID
   */
  getChunk(chunkId: string): KnowledgeChunk | undefined {
    return this.chunks.get(chunkId);
  }

  /**
   * Get embedding by chunk ID
   */
  getEmbedding(chunkId: string): EmbeddingVector | undefined {
    return this.embeddings.get(chunkId);
  }

  /**
   * Get all chunks
   */
  getAllChunks(): KnowledgeChunk[] {
    return Array.from(this.chunks.values());
  }

  /**
   * Get all embeddings
   */
  getAllEmbeddings(): EmbeddingVector[] {
    return Array.from(this.embeddings.values());
  }

  /**
   * Get knowledge base statistics
   */
  getStats(): KnowledgeBaseStats {
    const chunks = Array.from(this.chunks.values());
    const documentFiles = new Set(chunks.map(c => c.metadata.sourceFile));
    const categoryCounts: Record<string, number> = {};

    for (const chunk of chunks) {
      const category = chunk.metadata.category;
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }

    return {
      totalDocuments: documentFiles.size,
      totalChunks: this.chunks.size,
      totalEmbeddings: this.embeddings.size,
      avgChunksPerDocument: documentFiles.size > 0 ? this.chunks.size / documentFiles.size : 0,
      cacheHitRate: 0, // Would need to track hits/misses
      lastUpdated: this.lastLoadTime || new Date(),
      documentsByCategory: categoryCounts
    };
  }

  /**
   * Check if initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * Generate query embedding with caching
   */
  async generateQueryEmbedding(query: string): Promise<number[]> {
    // Check cache first
    if (this.embeddingsCache.has(query)) {
      return this.embeddingsCache.get(query)!;
    }

    // Generate new embedding
    const embedding = await this.embeddingsGenerator.generateQueryEmbedding(query);

    // Cache it
    this.embeddingsCache.set(query, embedding);

    return embedding;
  }
}

// Singleton instance
let knowledgeBaseInstance: KnowledgeBase | null = null;

/**
 * Get knowledge base singleton instance
 */
export function getKnowledgeBase(): KnowledgeBase {
  if (!knowledgeBaseInstance) {
    knowledgeBaseInstance = new KnowledgeBase();
  }
  return knowledgeBaseInstance;
}
