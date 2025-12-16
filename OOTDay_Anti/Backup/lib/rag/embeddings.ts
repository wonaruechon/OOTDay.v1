/**
 * Embeddings Generation for RAG System
 * Handles embedding generation using OpenAI API with batching support
 */

import { EmbeddingVector, KnowledgeChunk } from '../types/rag-types';

/**
 * OpenAI Embedding Response
 */
interface OpenAIEmbeddingResponse {
  object: string;
  data: Array<{
    object: string;
    embedding: number[];
    index: number;
  }>;
  model: string;
  usage: {
    prompt_tokens: number;
    total_tokens: number;
  };
}

/**
 * Embedding generation result
 */
export interface EmbeddingGenerationResult {
  embeddings: EmbeddingVector[];
  totalTokensUsed: number;
  model: string;
  processingTimeMs: number;
}

/**
 * Embeddings Generator
 * Generates embeddings using OpenAI API
 */
export class EmbeddingsGenerator {
  private apiKey: string;
  private modelName: string;
  private dimension: number;
  private baseUrl: string = 'https://api.openai.com/v1';
  private batchSize: number;

  constructor(
    apiKey?: string,
    modelName: string = 'text-embedding-3-small',
    dimension: number = 1536,
    batchSize: number = 10
  ) {
    this.apiKey = apiKey || process.env.OPENAI_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('OpenAI API key is required. Set OPENAI_API_KEY in .env.local');
    }

    this.modelName = modelName;
    this.dimension = dimension;
    this.batchSize = batchSize;
  }

  /**
   * Generate embeddings for knowledge chunks
   * @param chunks - Array of knowledge chunks
   * @returns Embedding generation result with vectors
   */
  async generateEmbeddings(chunks: KnowledgeChunk[]): Promise<EmbeddingGenerationResult> {
    const startTime = Date.now();
    const allEmbeddings: EmbeddingVector[] = [];
    let totalTokensUsed = 0;

    // Process chunks in batches
    for (let i = 0; i < chunks.length; i += this.batchSize) {
      const batch = chunks.slice(i, i + this.batchSize);
      const texts = batch.map(chunk => chunk.content);

      try {
        const response = await this.callOpenAIEmbeddings(texts);

        // Create embedding vectors
        for (let j = 0; j < response.data.length; j++) {
          const embedding = response.data[j];
          const chunk = batch[j];

          const embeddingVector: EmbeddingVector = {
            chunkId: chunk.id,
            vector: embedding.embedding,
            dimension: this.dimension,
            model: response.model
          };

          allEmbeddings.push(embeddingVector);
        }

        totalTokensUsed += response.usage.total_tokens;

        // Small delay to avoid rate limiting
        if (i + this.batchSize < chunks.length) {
          await this.delay(100);
        }
      } catch (error) {
        console.error(`Error generating embeddings for batch ${i}:`, error);
        throw error;
      }
    }

    const processingTimeMs = Date.now() - startTime;

    return {
      embeddings: allEmbeddings,
      totalTokensUsed,
      model: this.modelName,
      processingTimeMs
    };
  }

  /**
   * Generate embedding for a single text query
   * @param text - Text to embed
   * @returns Embedding vector
   */
  async generateQueryEmbedding(text: string): Promise<number[]> {
    try {
      const response = await this.callOpenAIEmbeddings([text]);
      return response.data[0].embedding;
    } catch (error) {
      console.error('Error generating query embedding:', error);
      throw error;
    }
  }

  /**
   * Call OpenAI Embeddings API
   * @param texts - Array of texts to embed
   * @returns OpenAI API response
   */
  private async callOpenAIEmbeddings(texts: string[]): Promise<OpenAIEmbeddingResponse> {
    const response = await fetch(`${this.baseUrl}/embeddings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.modelName,
        input: texts,
        dimensions: this.dimension // Optional: specify embedding dimensions
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        error: { message: response.statusText }
      }));

      if (response.status === 401) {
        throw new Error('Invalid OpenAI API key. Please check your OPENAI_API_KEY in .env.local');
      }

      if (response.status === 429) {
        throw new Error('OpenAI API rate limit exceeded. Please try again later.');
      }

      throw new Error(
        `OpenAI API error: ${errorData.error?.message || response.statusText}`
      );
    }

    return await response.json();
  }

  /**
   * Delay utility for rate limiting
   * @param ms - Milliseconds to delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

/**
 * Create embeddings generator instance
 * @param apiKey - OpenAI API key (optional, reads from env)
 * @param modelName - Embedding model name
 * @param dimension - Embedding dimension
 * @param batchSize - Batch size for processing
 * @returns EmbeddingsGenerator instance
 */
export function createEmbeddingsGenerator(
  apiKey?: string,
  modelName?: string,
  dimension?: number,
  batchSize?: number
): EmbeddingsGenerator {
  return new EmbeddingsGenerator(apiKey, modelName, dimension, batchSize);
}
