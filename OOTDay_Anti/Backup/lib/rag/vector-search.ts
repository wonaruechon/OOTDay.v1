/**
 * Vector Search Implementation for RAG System
 * Implements cosine similarity calculation and semantic search
 */

import { EmbeddingVector, RetrievedChunk, KnowledgeChunk } from '../types/rag-types';

/**
 * Calculate cosine similarity between two vectors
 * @param vectorA - First vector
 * @param vectorB - Second vector
 * @returns Cosine similarity score (0-1)
 */
export function cosineSimilarity(vectorA: number[], vectorB: number[]): number {
  if (vectorA.length !== vectorB.length) {
    throw new Error('Vectors must have the same dimension');
  }

  let dotProduct = 0;
  let normA = 0;
  let normB = 0;

  for (let i = 0; i < vectorA.length; i++) {
    dotProduct += vectorA[i] * vectorB[i];
    normA += vectorA[i] * vectorA[i];
    normB += vectorB[i] * vectorB[i];
  }

  const magnitude = Math.sqrt(normA) * Math.sqrt(normB);

  if (magnitude === 0) {
    return 0;
  }

  return dotProduct / magnitude;
}

/**
 * Search result with similarity score
 */
export interface SearchResult {
  chunkId: string;
  similarityScore: number;
}

/**
 * Perform semantic search using cosine similarity
 * @param queryVector - Query embedding vector
 * @param embeddings - Array of knowledge embeddings
 * @param topK - Number of top results to return
 * @param threshold - Minimum similarity threshold (0-1)
 * @returns Array of search results sorted by similarity
 */
export function semanticSearch(
  queryVector: number[],
  embeddings: EmbeddingVector[],
  topK: number = 5,
  threshold: number = 0.7
): SearchResult[] {
  const results: SearchResult[] = [];

  // Calculate similarity for each embedding
  for (const embedding of embeddings) {
    const similarity = cosineSimilarity(queryVector, embedding.vector);

    // Only include if above threshold
    if (similarity >= threshold) {
      results.push({
        chunkId: embedding.chunkId,
        similarityScore: similarity
      });
    }
  }

  // Sort by similarity (descending) and take top K
  return results
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, topK);
}

/**
 * Convert search results to retrieved chunks
 * @param searchResults - Array of search results
 * @param chunksMap - Map of chunk ID to knowledge chunk
 * @returns Array of retrieved chunks with metadata
 */
export function convertToRetrievedChunks(
  searchResults: SearchResult[],
  chunksMap: Map<string, KnowledgeChunk>
): RetrievedChunk[] {
  const retrievedChunks: RetrievedChunk[] = [];

  for (let i = 0; i < searchResults.length; i++) {
    const result = searchResults[i];
    const chunk = chunksMap.get(result.chunkId);

    if (chunk) {
      retrievedChunks.push({
        chunk,
        relevanceScore: result.similarityScore,
        rank: i + 1
      });
    }
  }

  return retrievedChunks;
}

/**
 * Re-rank search results using additional criteria
 * @param results - Initial search results
 * @param chunksMap - Map of chunk ID to knowledge chunk
 * @returns Re-ranked search results
 */
export function rerankResults(
  results: SearchResult[],
  chunksMap: Map<string, KnowledgeChunk>
): SearchResult[] {
  // Simple re-ranking based on importance and recency
  const scoredResults = results.map(result => {
    const chunk = chunksMap.get(result.chunkId);
    let adjustedScore = result.similarityScore;

    if (chunk) {
      // Boost score based on importance
      if (chunk.metadata.importance === 'high') {
        adjustedScore *= 1.2;
      } else if (chunk.metadata.importance === 'low') {
        adjustedScore *= 0.9;
      }

      // Small boost for more recent documents
      if (chunk.metadata.lastUpdated) {
        const lastUpdated = new Date(chunk.metadata.lastUpdated);
        const ageInDays = (Date.now() - lastUpdated.getTime()) / (1000 * 60 * 60 * 24);
        if (ageInDays < 30) {
          adjustedScore *= 1.1; // Boost recent documents
        }
      }
    }

    return {
      ...result,
      similarityScore: Math.min(adjustedScore, 1.0) // Cap at 1.0
    };
  });

  // Re-sort by adjusted scores
  return scoredResults.sort((a, b) => b.similarityScore - a.similarityScore);
}

/**
 * Filter results by category
 * @param results - Search results
 * @param chunksMap - Map of chunk ID to knowledge chunk
 * @param categories - Array of categories to include
 * @returns Filtered search results
 */
export function filterByCategory(
  results: SearchResult[],
  chunksMap: Map<string, KnowledgeChunk>,
  categories: string[]
): SearchResult[] {
  return results.filter(result => {
    const chunk = chunksMap.get(result.chunkId);
    return chunk && categories.includes(chunk.metadata.category);
  });
}

/**
 * Normalize vector to unit length
 * @param vector - Vector to normalize
 * @returns Normalized vector
 */
export function normalizeVector(vector: number[]): number[] {
  const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));

  if (magnitude === 0) {
    return vector;
  }

  return vector.map(val => val / magnitude);
}

/**
 * Calculate average vector from multiple vectors
 * @param vectors - Array of vectors
 * @returns Average vector
 */
export function averageVectors(vectors: number[][]): number[] {
  if (vectors.length === 0) {
    throw new Error('Cannot average empty array of vectors');
  }

  const dimension = vectors[0].length;
  const avgVector = new Array(dimension).fill(0);

  for (const vector of vectors) {
    for (let i = 0; i < dimension; i++) {
      avgVector[i] += vector[i];
    }
  }

  return avgVector.map(val => val / vectors.length);
}
