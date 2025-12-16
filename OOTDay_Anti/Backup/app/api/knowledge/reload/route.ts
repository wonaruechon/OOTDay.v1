/**
 * API Route: Reload Knowledge Base
 * POST /api/knowledge/reload
 */

import { NextRequest, NextResponse } from 'next/server';
import { reloadKnowledgeBase } from '@/lib/knowledge-uploader';
import { getKnowledgeBase } from '@/lib/rag/knowledge-base';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    console.log('Reloading knowledge base...');

    const result = await reloadKnowledgeBase();

    if (result.success) {
      const kb = getKnowledgeBase();
      const stats = kb.getStats();

      return NextResponse.json({
        success: true,
        message: 'Knowledge base reloaded successfully',
        stats: {
          totalDocuments: stats.totalDocuments,
          totalChunks: stats.totalChunks,
          totalEmbeddings: stats.totalEmbeddings,
          lastUpdated: stats.lastUpdated,
          documentsByCategory: stats.documentsByCategory
        }
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          error: result.error || 'Failed to reload knowledge base'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Reload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Reload failed'
      },
      { status: 500 }
    );
  }
}
