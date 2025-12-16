/**
 * API Route: List Knowledge Documents
 * GET /api/knowledge/list
 */

import { NextRequest, NextResponse } from 'next/server';
import { readdir, stat } from 'fs/promises';
import path from 'path';
import { getCategoryPath } from '@/lib/knowledge-uploader';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

interface KnowledgeFile {
  filename: string;
  category: string;
  size: number;
  lastModified: Date;
  path: string;
}

async function listFilesInCategory(category: string): Promise<KnowledgeFile[]> {
  const files: KnowledgeFile[] = [];
  const categoryPath = getCategoryPath(category);

  try {
    const entries = await readdir(categoryPath);

    for (const entry of entries) {
      const fullPath = path.join(categoryPath, entry);
      const stats = await stat(fullPath);

      if (stats.isFile() && (entry.endsWith('.md') || entry.endsWith('.txt'))) {
        files.push({
          filename: entry,
          category,
          size: stats.size,
          lastModified: stats.mtime,
          path: fullPath
        });
      }
    }
  } catch (error) {
    // Category directory might not exist, that's ok
    console.log(`Category ${category} not found or empty`);
  }

  return files;
}

export async function GET(request: NextRequest) {
  try {
    const categories = ['fashion', 'occasions', 'brand', 'custom'];
    const allFiles: KnowledgeFile[] = [];

    for (const category of categories) {
      const categoryFiles = await listFilesInCategory(category);
      allFiles.push(...categoryFiles);
    }

    // Sort by last modified (newest first)
    allFiles.sort((a, b) => b.lastModified.getTime() - a.lastModified.getTime());

    // Group by category
    const byCategory = categories.reduce((acc, cat) => {
      acc[cat] = allFiles.filter(f => f.category === cat);
      return acc;
    }, {} as Record<string, KnowledgeFile[]>);

    return NextResponse.json({
      success: true,
      files: allFiles,
      byCategory,
      stats: {
        total: allFiles.length,
        byCategory: categories.reduce((acc, cat) => {
          acc[cat] = byCategory[cat].length;
          return acc;
        }, {} as Record<string, number>)
      }
    });
  } catch (error) {
    console.error('List error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to list files'
      },
      { status: 500 }
    );
  }
}
