/**
 * File System Utilities for RAG Knowledge Base
 * Handles reading markdown files recursively from the knowledge directory
 */

import { promises as fs } from 'fs';
import path from 'path';
import crypto from 'crypto';

/**
 * File information
 */
export interface FileInfo {
  /** Absolute file path */
  filePath: string;
  /** Relative path from knowledge root */
  relativePath: string;
  /** File name */
  fileName: string;
  /** File size in bytes */
  size: number;
  /** Last modified timestamp */
  modifiedTime: Date;
  /** File content hash (for cache invalidation) */
  hash: string;
}

/**
 * Check if a path is a directory
 */
export async function isDirectory(filePath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(filePath);
    return stats.isDirectory();
  } catch (error) {
    return false;
  }
}

/**
 * Check if a file exists
 */
export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Read markdown files recursively from a directory
 * @param dirPath - Directory path to search
 * @param rootPath - Root directory for relative path calculation
 * @returns Array of FileInfo objects for markdown files
 */
export async function readMarkdownFilesRecursively(
  dirPath: string,
  rootPath?: string
): Promise<FileInfo[]> {
  const root = rootPath || dirPath;
  const results: FileInfo[] = [];

  try {
    // Check if directory exists
    if (!(await fileExists(dirPath))) {
      console.warn(`Directory not found: ${dirPath}`);
      return results;
    }

    // Read directory contents
    const entries = await fs.readdir(dirPath, { withFileTypes: true });

    // Process each entry
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);

      if (entry.isDirectory()) {
        // Recursively read subdirectories
        const subResults = await readMarkdownFilesRecursively(fullPath, root);
        results.push(...subResults);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        // Get file stats
        const stats = await fs.stat(fullPath);

        // Read file content for hash calculation
        const content = await fs.readFile(fullPath, 'utf-8');
        const hash = calculateFileHash(content);

        // Create FileInfo object
        const fileInfo: FileInfo = {
          filePath: fullPath,
          relativePath: path.relative(root, fullPath),
          fileName: entry.name,
          size: stats.size,
          modifiedTime: stats.mtime,
          hash
        };

        results.push(fileInfo);
      }
    }

    return results;
  } catch (error) {
    console.error(`Error reading directory ${dirPath}:`, error);
    throw error;
  }
}

/**
 * Read markdown files from multiple directories
 * @param dirPaths - Array of directory paths to search
 * @returns Array of FileInfo objects for all markdown files found
 */
export async function readMarkdownFilesFromDirectories(
  dirPaths: string[]
): Promise<FileInfo[]> {
  const allFiles: FileInfo[] = [];

  for (const dirPath of dirPaths) {
    try {
      const files = await readMarkdownFilesRecursively(dirPath);
      allFiles.push(...files);
    } catch (error) {
      console.error(`Error reading directory ${dirPath}:`, error);
      // Continue with other directories even if one fails
    }
  }

  return allFiles;
}

/**
 * Read file content
 * @param filePath - File path to read
 * @returns File content as string
 */
export async function readFileContent(filePath: string): Promise<string> {
  try {
    return await fs.readFile(filePath, 'utf-8');
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error);
    throw error;
  }
}

/**
 * Calculate hash for file content (for cache invalidation)
 * @param content - File content
 * @returns SHA-256 hash
 */
export function calculateFileHash(content: string): string {
  return crypto.createHash('sha256').update(content).digest('hex');
}

/**
 * Get file stats
 * @param filePath - File path
 * @returns File statistics
 */
export async function getFileStats(filePath: string) {
  try {
    return await fs.stat(filePath);
  } catch (error) {
    console.error(`Error getting stats for ${filePath}:`, error);
    throw error;
  }
}

/**
 * Check if file has been modified since a given timestamp
 * @param filePath - File path to check
 * @param since - Timestamp to compare against
 * @returns True if file was modified after the timestamp
 */
export async function isFileModifiedSince(
  filePath: string,
  since: Date
): Promise<boolean> {
  try {
    const stats = await fs.stat(filePath);
    return stats.mtime > since;
  } catch (error) {
    console.error(`Error checking modification time for ${filePath}:`, error);
    return false;
  }
}

/**
 * Group files by directory
 * @param files - Array of FileInfo objects
 * @returns Map of directory path to files
 */
export function groupFilesByDirectory(
  files: FileInfo[]
): Map<string, FileInfo[]> {
  const grouped = new Map<string, FileInfo[]>();

  for (const file of files) {
    const dir = path.dirname(file.relativePath);
    if (!grouped.has(dir)) {
      grouped.set(dir, []);
    }
    grouped.get(dir)!.push(file);
  }

  return grouped;
}

/**
 * Get file category from relative path
 * @param relativePath - Relative file path
 * @returns Category (fashion, occasions, brand) or unknown
 */
export function getCategoryFromPath(relativePath: string): string {
  const parts = relativePath.split(path.sep);
  if (parts.length > 0) {
    const category = parts[0].toLowerCase();
    if (['fashion', 'occasions', 'brand'].includes(category)) {
      return category;
    }
  }
  return 'unknown';
}
