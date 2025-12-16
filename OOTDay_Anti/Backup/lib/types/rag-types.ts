/**
 * TypeScript interfaces for RAG (Retrieval-Augmented Generation) system
 * Defines types for knowledge chunks, embeddings, and retrieval results
 */

/**
 * Metadata for knowledge document chunks
 */
export interface KnowledgeChunkMetadata {
  /** Source file path */
  sourceFile: string;
  /** Document title from frontmatter or filename */
  title: string;
  /** Category (fashion, occasions, brand) */
  category: string;
  /** Importance level (high, medium, low) */
  importance?: 'high' | 'medium' | 'low';
  /** Last updated timestamp from frontmatter */
  lastUpdated?: string;
  /** Section heading where chunk originated */
  section: string;
  /** Chunk position in document (0-indexed) */
  chunkIndex: number;
  /** Total chunks in source document */
  totalChunks: number;
}

/**
 * Individual knowledge chunk with content and metadata
 */
export interface KnowledgeChunk {
  /** Unique identifier for the chunk */
  id: string;
  /** Text content of the chunk */
  content: string;
  /** Metadata about the chunk */
  metadata: KnowledgeChunkMetadata;
  /** Token count estimate */
  tokenCount: number;
  /** File hash for cache invalidation */
  fileHash?: string;
}

/**
 * Embedding vector with associated chunk reference
 */
export interface EmbeddingVector {
  /** Reference to the knowledge chunk */
  chunkId: string;
  /** Embedding vector (array of numbers) */
  vector: number[];
  /** Dimension of the embedding (384 or 1536) */
  dimension: number;
  /** Embedding model used */
  model: string;
}

/**
 * Retrieved knowledge chunk with relevance score
 */
export interface RetrievedChunk {
  /** The knowledge chunk */
  chunk: KnowledgeChunk;
  /** Relevance score (cosine similarity, 0-1) */
  relevanceScore: number;
  /** Rank position in retrieval results */
  rank: number;
}

/**
 * RAG retrieval result
 */
export interface RAGRetrievalResult {
  /** Query that triggered the retrieval */
  query: string;
  /** Retrieved chunks with relevance scores */
  retrievedChunks: RetrievedChunk[];
  /** Total chunks searched */
  totalChunksSearched: number;
  /** Retrieval time in milliseconds */
  retrievalTimeMs: number;
  /** Whether retrieval was successful */
  success: boolean;
  /** Error message if retrieval failed */
  error?: string;
}

/**
 * Knowledge base statistics
 */
export interface KnowledgeBaseStats {
  /** Total number of documents loaded */
  totalDocuments: number;
  /** Total number of chunks */
  totalChunks: number;
  /** Total number of embeddings generated */
  totalEmbeddings: number;
  /** Average chunks per document */
  avgChunksPerDocument: number;
  /** Cache hit rate (0-1) */
  cacheHitRate: number;
  /** Last update timestamp */
  lastUpdated: Date;
  /** Documents by category */
  documentsByCategory: Record<string, number>;
}

/**
 * Cache entry for embeddings or chunks
 */
export interface CacheEntry<T> {
  /** Cached value */
  value: T;
  /** Timestamp when cached */
  cachedAt: Date;
  /** Access count for LRU eviction */
  accessCount: number;
  /** Last accessed timestamp */
  lastAccessed: Date;
}

/**
 * Configuration for RAG retrieval
 */
export interface RAGRetrievalConfig {
  /** Number of top chunks to retrieve */
  topK: number;
  /** Minimum relevance score threshold (0-1) */
  similarityThreshold: number;
  /** Whether to use cache */
  useCache: boolean;
  /** Maximum cache size */
  maxCacheSize: number;
}

/**
 * Markdown frontmatter structure
 */
export interface MarkdownFrontmatter {
  title?: string;
  category?: string;
  importance?: 'high' | 'medium' | 'low';
  last_updated?: string;
  tags?: string[];
  [key: string]: any;
}

/**
 * Parsed markdown document
 */
export interface ParsedMarkdownDocument {
  /** Frontmatter metadata */
  frontmatter: MarkdownFrontmatter;
  /** Document content (without frontmatter) */
  content: string;
  /** Source file path */
  filePath: string;
  /** Extracted sections with headings */
  sections: MarkdownSection[];
}

/**
 * Markdown section with heading
 */
export interface MarkdownSection {
  /** Section heading text */
  heading: string;
  /** Section heading level (1-6) */
  level: number;
  /** Section content */
  content: string;
  /** Position in document */
  position: number;
}

/**
 * Query intent extracted from user query
 */
export interface QueryIntent {
  /** Main intent (general_fashion, occasion_specific, style_advice, etc.) */
  intent: string;
  /** Extracted entities (occasion, style, color, etc.) */
  entities: Record<string, string>;
  /** Detected language (th, en) */
  language: string;
  /** Confidence score (0-1) */
  confidence: number;
}
