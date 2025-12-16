/**
 * RAG (Retrieval-Augmented Generation) System Configuration
 * Configures embedding model, retrieval parameters, and cache settings
 */

export interface RAGConfig {
  /** Enable/disable RAG system */
  enabled: boolean;

  /** Embedding model configuration */
  embedding: {
    /** Embedding model to use (openai or local) */
    provider: 'openai' | 'local';
    /** Model name for OpenAI (text-embedding-3-small) */
    modelName: string;
    /** Embedding dimension (384 for local, 1536 for OpenAI) */
    dimension: number;
    /** Batch size for embedding generation */
    batchSize: number;
  };

  /** Retrieval configuration */
  retrieval: {
    /** Number of top chunks to retrieve */
    topK: number;
    /** Minimum cosine similarity threshold (0-1) */
    similarityThreshold: number;
    /** Whether to re-rank results */
    rerank: boolean;
  };

  /** Cache configuration */
  cache: {
    /** Enable/disable caching */
    enabled: boolean;
    /** Maximum cache entries (LRU eviction) */
    maxSize: number;
    /** Cache TTL in milliseconds (0 = no expiry) */
    ttlMs: number;
  };

  /** Knowledge base paths */
  paths: {
    /** Root directory for knowledge base */
    knowledgeRoot: string;
    /** Fashion documents directory */
    fashionDir: string;
    /** Occasions documents directory */
    occasionsDir: string;
    /** Brand documents directory */
    brandDir: string;
  };

  /** Chunking configuration */
  chunking: {
    /** Minimum chunk size in tokens */
    minChunkSize: number;
    /** Maximum chunk size in tokens */
    maxChunkSize: number;
    /** Overlap between chunks in tokens */
    overlapSize: number;
  };

  /** Performance settings */
  performance: {
    /** Maximum retrieval time in ms (timeout) */
    maxRetrievalTimeMs: number;
    /** Enable parallel processing */
    enableParallel: boolean;
  };
}

/**
 * Default RAG configuration
 */
export const defaultRAGConfig: RAGConfig = {
  enabled: process.env.RAG_ENABLED === 'true' || true,

  embedding: {
    provider: 'openai',
    modelName: 'text-embedding-3-small',
    dimension: 1536,
    batchSize: 10
  },

  retrieval: {
    topK: parseInt(process.env.RAG_RETRIEVAL_TOP_K || '5', 10),
    similarityThreshold: parseFloat(process.env.RAG_SIMILARITY_THRESHOLD || '0.7'),
    rerank: false
  },

  cache: {
    enabled: true,
    maxSize: 100,
    ttlMs: 0 // No expiry, cache until manual reload
  },

  paths: {
    knowledgeRoot: '../knowledge',
    fashionDir: '../knowledge/fashion',
    occasionsDir: '../knowledge/occasions',
    brandDir: '../knowledge/brand'
  },

  chunking: {
    minChunkSize: 200,
    maxChunkSize: 500,
    overlapSize: 50
  },

  performance: {
    maxRetrievalTimeMs: 200,
    enableParallel: true
  }
};

/**
 * Get RAG configuration with environment variable overrides
 */
export function getRAGConfig(): RAGConfig {
  return {
    ...defaultRAGConfig,
    enabled: process.env.RAG_ENABLED === 'true' || defaultRAGConfig.enabled,
    retrieval: {
      ...defaultRAGConfig.retrieval,
      topK: parseInt(process.env.RAG_RETRIEVAL_TOP_K || String(defaultRAGConfig.retrieval.topK), 10),
      similarityThreshold: parseFloat(
        process.env.RAG_SIMILARITY_THRESHOLD || String(defaultRAGConfig.retrieval.similarityThreshold)
      )
    }
  };
}
