/**
 * Knowledge Uploader Service
 * Handles uploading, validation, and storage of knowledge documents
 */

import { writeFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { getKnowledgeBase } from './rag/knowledge-base';

export interface UploadedFile {
  filename: string;
  content: string;
  category: 'fashion' | 'occasions' | 'brand' | 'custom';
  size: number;
  mimeType: string;
}

export interface UploadResult {
  success: boolean;
  filename: string;
  category: string;
  path: string;
  error?: string;
  message?: string;
}

export interface KnowledgeDocument {
  id: string;
  filename: string;
  category: string;
  uploadedAt: Date;
  size: number;
  path: string;
}

/**
 * Validate uploaded file
 */
export function validateKnowledgeFile(file: UploadedFile): { valid: boolean; error?: string } {
  // Check file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { valid: false, error: 'File size exceeds 5MB limit' };
  }

  // Check file type (only markdown and text)
  const allowedTypes = ['text/markdown', 'text/plain', 'application/octet-stream'];
  const allowedExtensions = ['.md', '.txt', '.markdown'];
  const ext = path.extname(file.filename).toLowerCase();

  if (!allowedTypes.includes(file.mimeType) && !allowedExtensions.includes(ext)) {
    return { valid: false, error: 'Only markdown (.md) and text (.txt) files are allowed' };
  }

  // Check filename
  if (!file.filename || file.filename.length > 255) {
    return { valid: false, error: 'Invalid filename' };
  }

  // Check for potentially dangerous characters
  if (/[<>:"|?*\x00-\x1f]/g.test(file.filename)) {
    return { valid: false, error: 'Filename contains invalid characters' };
  }

  return { valid: true };
}

/**
 * Sanitize filename for safe storage
 */
export function sanitizeFilename(filename: string): string {
  // Remove path components
  const basename = path.basename(filename);

  // Replace spaces and special chars with hyphens
  let sanitized = basename
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9._-]/g, '');

  // Add timestamp to prevent collisions
  const timestamp = Date.now();
  const ext = path.extname(sanitized);
  const name = path.basename(sanitized, ext);

  return `${name}-${timestamp}${ext || '.md'}`;
}

/**
 * Get category directory path
 */
export function getCategoryPath(category: string): string {
  const knowledgeRoot = path.join(process.cwd(), '../knowledge');

  switch (category) {
    case 'fashion':
      return path.join(knowledgeRoot, 'fashion');
    case 'occasions':
      return path.join(knowledgeRoot, 'occasions');
    case 'brand':
      return path.join(knowledgeRoot, 'brand');
    case 'custom':
      return path.join(knowledgeRoot, 'custom');
    default:
      return path.join(knowledgeRoot, 'custom');
  }
}

/**
 * Save uploaded knowledge document to disk
 */
export async function saveKnowledgeDocument(file: UploadedFile): Promise<UploadResult> {
  try {
    // Validate file
    const validation = validateKnowledgeFile(file);
    if (!validation.valid) {
      return {
        success: false,
        filename: file.filename,
        category: file.category,
        path: '',
        error: validation.error
      };
    }

    // Get category directory
    const categoryDir = getCategoryPath(file.category);

    // Ensure directory exists
    if (!existsSync(categoryDir)) {
      await mkdir(categoryDir, { recursive: true });
    }

    // Sanitize filename
    const safeFilename = sanitizeFilename(file.filename);
    const filePath = path.join(categoryDir, safeFilename);

    // Ensure content is markdown formatted
    let content = file.content;
    if (!content.startsWith('---')) {
      // Add frontmatter if missing
      const frontmatter = `---
title: ${path.basename(file.filename, path.extname(file.filename))}
category: ${file.category}
importance: medium
last_updated: ${new Date().toISOString().split('T')[0]}
uploaded: true
---

`;
      content = frontmatter + content;
    }

    // Write file to disk
    await writeFile(filePath, content, 'utf-8');

    return {
      success: true,
      filename: safeFilename,
      category: file.category,
      path: filePath,
      message: 'Knowledge document uploaded successfully'
    };
  } catch (error) {
    console.error('Error saving knowledge document:', error);
    return {
      success: false,
      filename: file.filename,
      category: file.category,
      path: '',
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
}

/**
 * Upload multiple knowledge documents
 */
export async function uploadKnowledgeDocuments(files: UploadedFile[]): Promise<UploadResult[]> {
  const results: UploadResult[] = [];

  for (const file of files) {
    const result = await saveKnowledgeDocument(file);
    results.push(result);
  }

  return results;
}

/**
 * Trigger knowledge base reload after uploads
 */
export async function reloadKnowledgeBase(): Promise<{ success: boolean; error?: string }> {
  try {
    const kb = getKnowledgeBase();
    await kb.reload();
    return { success: true };
  } catch (error) {
    console.error('Error reloading knowledge base:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reload knowledge base'
    };
  }
}

/**
 * Upload and index knowledge documents in one operation
 */
export async function uploadAndIndex(files: UploadedFile[]): Promise<{
  uploadResults: UploadResult[];
  reloadResult: { success: boolean; error?: string };
}> {
  // Upload all files
  const uploadResults = await uploadKnowledgeDocuments(files);

  // Check if any uploads succeeded
  const anySuccess = uploadResults.some(r => r.success);

  let reloadResult = { success: false, error: 'No files uploaded successfully' };

  // Reload knowledge base if any upload succeeded
  if (anySuccess) {
    reloadResult = await reloadKnowledgeBase();
  }

  return {
    uploadResults,
    reloadResult
  };
}
