/**
 * Knowledge Parser for RAG System
 * Parses markdown documents into structured chunks with metadata
 */

import matter from 'gray-matter';
import {
  KnowledgeChunk,
  KnowledgeChunkMetadata,
  MarkdownFrontmatter,
  ParsedMarkdownDocument,
  MarkdownSection
} from '../types/rag-types';
import { FileInfo } from './file-utils';

/**
 * Parse markdown file with frontmatter
 * @param content - Markdown file content
 * @param filePath - Source file path
 * @returns Parsed markdown document
 */
export function parseMarkdown(content: string, filePath: string): ParsedMarkdownDocument {
  // Parse frontmatter using gray-matter
  const { data, content: markdownContent } = matter(content);

  // Extract sections from markdown
  const sections = extractSections(markdownContent);

  return {
    frontmatter: data as MarkdownFrontmatter,
    content: markdownContent,
    filePath,
    sections
  };
}

/**
 * Extract sections from markdown content based on ## headings
 * @param content - Markdown content
 * @returns Array of sections with headings
 */
export function extractSections(content: string): MarkdownSection[] {
  const sections: MarkdownSection[] = [];
  const lines = content.split('\n');

  let currentSection: MarkdownSection | null = null;
  let currentContent: string[] = [];
  let position = 0;

  for (const line of lines) {
    // Match headings (##, ###, etc.)
    const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);

    if (headingMatch) {
      // Save previous section if exists
      if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        sections.push(currentSection);
      }

      // Start new section
      const level = headingMatch[1].length;
      const heading = headingMatch[2].trim();

      currentSection = {
        heading,
        level,
        content: '',
        position: position++
      };
      currentContent = [];
    } else if (currentSection) {
      // Add line to current section
      currentContent.push(line);
    } else {
      // Content before first heading (introduction)
      if (!currentSection && line.trim()) {
        currentSection = {
          heading: 'Introduction',
          level: 2,
          content: '',
          position: position++
        };
      }
      if (currentSection) {
        currentContent.push(line);
      }
    }
  }

  // Save last section
  if (currentSection) {
    currentSection.content = currentContent.join('\n').trim();
    sections.push(currentSection);
  }

  return sections;
}

/**
 * Create chunks from parsed markdown document
 * @param document - Parsed markdown document
 * @param fileInfo - File information for metadata
 * @param minChunkSize - Minimum chunk size in tokens (default: 200)
 * @param maxChunkSize - Maximum chunk size in tokens (default: 500)
 * @param overlapSize - Overlap between chunks in tokens (default: 50)
 * @returns Array of knowledge chunks
 */
export function createChunksFromDocument(
  document: ParsedMarkdownDocument,
  fileInfo: FileInfo,
  minChunkSize: number = 200,
  maxChunkSize: number = 500,
  overlapSize: number = 50
): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];
  const category = getCategoryFromFilePath(fileInfo.relativePath);

  // Process each section
  for (const section of document.sections) {
    const sectionChunks = createChunksFromSection(
      section,
      document.frontmatter,
      fileInfo,
      category,
      minChunkSize,
      maxChunkSize,
      overlapSize
    );
    chunks.push(...sectionChunks);
  }

  return chunks;
}

/**
 * Create chunks from a markdown section
 * @param section - Markdown section
 * @param frontmatter - Document frontmatter
 * @param fileInfo - File information
 * @param category - Document category
 * @param minChunkSize - Minimum chunk size
 * @param maxChunkSize - Maximum chunk size
 * @param overlapSize - Overlap size
 * @returns Array of knowledge chunks
 */
function createChunksFromSection(
  section: MarkdownSection,
  frontmatter: MarkdownFrontmatter,
  fileInfo: FileInfo,
  category: string,
  minChunkSize: number,
  maxChunkSize: number,
  overlapSize: number
): KnowledgeChunk[] {
  const chunks: KnowledgeChunk[] = [];

  // Estimate token count (rough approximation: 1 token ≈ 4 characters)
  const sectionTokens = estimateTokenCount(section.content);

  if (sectionTokens <= maxChunkSize) {
    // Section fits in one chunk
    const chunk = createChunk(
      section.heading,
      section.content,
      frontmatter,
      fileInfo,
      category,
      section.position,
      0,
      1
    );
    chunks.push(chunk);
  } else {
    // Split section into multiple chunks with overlap
    const sentences = splitIntoSentences(section.content);
    let currentChunk: string[] = [];
    let currentTokenCount = 0;
    let chunkIndex = 0;

    for (let i = 0; i < sentences.length; i++) {
      const sentence = sentences[i];
      const sentenceTokens = estimateTokenCount(sentence);

      if (currentTokenCount + sentenceTokens > maxChunkSize && currentChunk.length > 0) {
        // Create chunk from accumulated sentences
        const chunkContent = currentChunk.join(' ');
        const chunk = createChunk(
          section.heading,
          chunkContent,
          frontmatter,
          fileInfo,
          category,
          section.position,
          chunkIndex,
          -1 // Total chunks unknown yet
        );
        chunks.push(chunk);

        // Start new chunk with overlap
        const overlapSentences = getOverlapSentences(currentChunk, overlapSize);
        currentChunk = overlapSentences;
        currentTokenCount = estimateTokenCount(overlapSentences.join(' '));
        chunkIndex++;
      }

      currentChunk.push(sentence);
      currentTokenCount += sentenceTokens;
    }

    // Add remaining chunk
    if (currentChunk.length > 0) {
      const chunkContent = currentChunk.join(' ');
      const chunk = createChunk(
        section.heading,
        chunkContent,
        frontmatter,
        fileInfo,
        category,
        section.position,
        chunkIndex,
        chunkIndex + 1
      );
      chunks.push(chunk);
    }

    // Update total chunks count
    const totalChunks = chunks.filter(c =>
      c.metadata.section === section.heading &&
      c.metadata.sourceFile === fileInfo.relativePath
    ).length;

    chunks.forEach(chunk => {
      if (chunk.metadata.section === section.heading &&
          chunk.metadata.sourceFile === fileInfo.relativePath) {
        chunk.metadata.totalChunks = totalChunks;
      }
    });
  }

  return chunks;
}

/**
 * Create a knowledge chunk
 */
function createChunk(
  sectionHeading: string,
  content: string,
  frontmatter: MarkdownFrontmatter,
  fileInfo: FileInfo,
  category: string,
  sectionPosition: number,
  chunkIndex: number,
  totalChunks: number
): KnowledgeChunk {
  const metadata: KnowledgeChunkMetadata = {
    sourceFile: fileInfo.relativePath,
    title: frontmatter.title || fileInfo.fileName.replace('.md', ''),
    category,
    importance: frontmatter.importance || 'medium',
    lastUpdated: frontmatter.last_updated || fileInfo.modifiedTime.toISOString(),
    section: sectionHeading,
    chunkIndex,
    totalChunks
  };

  const chunkId = generateChunkId(fileInfo.relativePath, sectionPosition, chunkIndex);
  const tokenCount = estimateTokenCount(content);

  return {
    id: chunkId,
    content: content.trim(),
    metadata,
    tokenCount,
    fileHash: fileInfo.hash
  };
}

/**
 * Generate unique chunk ID
 */
function generateChunkId(filePath: string, sectionPosition: number, chunkIndex: number): string {
  const sanitizedPath = filePath.replace(/[^a-zA-Z0-9]/g, '_');
  return `${sanitizedPath}_s${sectionPosition}_c${chunkIndex}`;
}

/**
 * Estimate token count (rough approximation: 1 token ≈ 4 characters)
 * @param text - Text to estimate
 * @returns Estimated token count
 */
export function estimateTokenCount(text: string): number {
  // Simple heuristic: 1 token ≈ 4 characters
  // This is a rough estimate; actual tokenization depends on the model
  return Math.ceil(text.length / 4);
}

/**
 * Split text into sentences
 * @param text - Text to split
 * @returns Array of sentences
 */
function splitIntoSentences(text: string): string[] {
  // Split on sentence boundaries (., !, ?, Thai sentence endings)
  const sentences = text
    .split(/([.!?\u0E2F\u0E46]+\s+)/)
    .filter(s => s.trim().length > 0);

  // Rejoin punctuation with sentences
  const result: string[] = [];
  for (let i = 0; i < sentences.length; i += 2) {
    const sentence = sentences[i] + (sentences[i + 1] || '');
    if (sentence.trim()) {
      result.push(sentence.trim());
    }
  }

  return result;
}

/**
 * Get overlap sentences for chunk overlap
 * @param sentences - Array of sentences
 * @param overlapSize - Desired overlap size in tokens
 * @returns Array of overlap sentences
 */
function getOverlapSentences(sentences: string[], overlapSize: number): string[] {
  const overlap: string[] = [];
  let tokenCount = 0;

  // Take sentences from the end
  for (let i = sentences.length - 1; i >= 0; i--) {
    const sentence = sentences[i];
    const sentenceTokens = estimateTokenCount(sentence);

    if (tokenCount + sentenceTokens > overlapSize && overlap.length > 0) {
      break;
    }

    overlap.unshift(sentence);
    tokenCount += sentenceTokens;
  }

  return overlap;
}

/**
 * Extract category from file path
 * @param relativePath - Relative file path
 * @returns Category name
 */
function getCategoryFromFilePath(relativePath: string): string {
  const parts = relativePath.split('/');
  if (parts.length > 0) {
    const category = parts[0].toLowerCase();
    if (['fashion', 'occasions', 'brand'].includes(category)) {
      return category;
    }
  }
  return 'unknown';
}

/**
 * Parse multiple markdown files
 * @param fileInfos - Array of file information
 * @returns Array of knowledge chunks from all files
 */
export async function parseMarkdownFiles(
  fileInfos: FileInfo[],
  minChunkSize: number = 200,
  maxChunkSize: number = 500,
  overlapSize: number = 50
): Promise<KnowledgeChunk[]> {
  const allChunks: KnowledgeChunk[] = [];

  const { readFileContent } = await import('./file-utils');

  for (const fileInfo of fileInfos) {
    try {
      // Read file content
      const content = await readFileContent(fileInfo.filePath);

      // Parse markdown
      const document = parseMarkdown(content, fileInfo.filePath);

      // Create chunks
      const chunks = createChunksFromDocument(
        document,
        fileInfo,
        minChunkSize,
        maxChunkSize,
        overlapSize
      );

      allChunks.push(...chunks);
    } catch (error) {
      console.error(`Error parsing file ${fileInfo.filePath}:`, error);
      // Continue with other files even if one fails
    }
  }

  return allChunks;
}
