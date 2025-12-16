/**
 * RAG Retrieval Logic
 * Extracts query intent, searches knowledge base, ranks and returns top chunks
 */

import { RAGRetrievalResult, RetrievedChunk, QueryIntent } from '../types/rag-types';
import { getKnowledgeBase } from './knowledge-base';
import { semanticSearch, convertToRetrievedChunks, rerankResults } from './vector-search';
import { getRAGConfig } from '../../config/rag-config';

/**
 * Extract query intent from user query
 * @param query - User query text
 * @returns Query intent with entities
 */
export function extractQueryIntent(query: string): QueryIntent {
  const queryLower = query.toLowerCase();

  // Detect language
  const hasThai = /[\u0E00-\u0E7F]/.test(query);
  const language = hasThai ? 'th' : 'en';

  // Extract occasion if mentioned
  const occasions = ['งานแต่งงาน', 'wedding', 'ออฟฟิศ', 'work', 'office', 'ปาร์ตี้', 'party', 'เดท', 'date', 'กีฬา', 'sport'];
  let detectedOccasion = '';
  for (const occasion of occasions) {
    if (queryLower.includes(occasion.toLowerCase())) {
      detectedOccasion = occasion;
      break;
    }
  }

  // Determine intent
  let intent = 'general_fashion';
  if (detectedOccasion) {
    intent = 'occasion_specific';
  } else if (queryLower.includes('สี') || queryLower.includes('color') || queryLower.includes('แมทช์') || queryLower.includes('match')) {
    intent = 'color_matching';
  } else if (queryLower.includes('สไตล์') || queryLower.includes('style')) {
    intent = 'style_advice';
  }

  return {
    intent,
    entities: {
      occasion: detectedOccasion
    },
    language,
    confidence: detectedOccasion ? 0.9 : 0.6
  };
}

/**
 * Retrieve relevant knowledge chunks for a query
 * @param query - User query text
 * @returns RAG retrieval result with retrieved chunks
 */
export async function retrieveKnowledge(query: string): Promise<RAGRetrievalResult> {
  const startTime = Date.now();
  const config = getRAGConfig();

  try {
    // Get knowledge base
    const kb = getKnowledgeBase();

    // Check if initialized
    if (!kb.isReady()) {
      await kb.initialize();
    }

    // Extract query intent
    const queryIntent = extractQueryIntent(query);

    // Generate query embedding
    const queryEmbedding = await kb.generateQueryEmbedding(query);

    // Get all embeddings
    const allEmbeddings = kb.getAllEmbeddings();

    // Perform semantic search
    const searchResults = semanticSearch(
      queryEmbedding,
      allEmbeddings,
      config.retrieval.topK,
      config.retrieval.similarityThreshold
    );

    // Convert to retrieved chunks
    const chunksMap = new Map();
    for (const chunk of kb.getAllChunks()) {
      chunksMap.set(chunk.id, chunk);
    }

    let retrievedChunks = convertToRetrievedChunks(searchResults, chunksMap);

    // Re-rank if enabled
    if (config.retrieval.rerank) {
      const rerankedResults = rerankResults(searchResults, chunksMap);
      retrievedChunks = convertToRetrievedChunks(rerankedResults, chunksMap);
    }

    const retrievalTimeMs = Date.now() - startTime;

    return {
      query,
      retrievedChunks,
      totalChunksSearched: allEmbeddings.length,
      retrievalTimeMs,
      success: true
    };
  } catch (error) {
    console.error('Error retrieving knowledge:', error);

    return {
      query,
      retrievedChunks: [],
      totalChunksSearched: 0,
      retrievalTimeMs: Date.now() - startTime,
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

/**
 * Format retrieved chunks into context string for LLM prompt
 * @param retrievedChunks - Retrieved chunks
 * @returns Formatted context string
 */
export function formatRetrievedContext(retrievedChunks: RetrievedChunk[]): string {
  if (retrievedChunks.length === 0) {
    return '';
  }

  const contextParts: string[] = [];

  contextParts.push('# ข้อมูลความรู้ที่เกี่ยวข้อง (Relevant Knowledge):');
  contextParts.push('');

  for (const retrieved of retrievedChunks) {
    const { chunk, relevanceScore, rank } = retrieved;
    contextParts.push(`## ${rank}. ${chunk.metadata.title} - ${chunk.metadata.section}`);
    contextParts.push(`(Relevance: ${(relevanceScore * 100).toFixed(1)}%, Category: ${chunk.metadata.category})`);
    contextParts.push('');
    contextParts.push(chunk.content);
    contextParts.push('');
    contextParts.push('---');
    contextParts.push('');
  }

  return contextParts.join('\n');
}
