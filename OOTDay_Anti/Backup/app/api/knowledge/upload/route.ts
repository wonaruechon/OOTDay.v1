/**
 * API Route: Upload Knowledge Documents
 * POST /api/knowledge/upload
 */

import { NextRequest, NextResponse } from 'next/server';
import { uploadAndIndex, UploadedFile } from '@/lib/knowledge-uploader';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = formData.get('category') as string || 'custom';

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No files provided' },
        { status: 400 }
      );
    }

    // Convert File objects to UploadedFile format
    const uploadedFiles: UploadedFile[] = await Promise.all(
      files.map(async (file) => {
        const content = await file.text();
        return {
          filename: file.name,
          content,
          category: category as any,
          size: file.size,
          mimeType: file.type
        };
      })
    );

    // Upload and index documents
    const result = await uploadAndIndex(uploadedFiles);

    // Check overall success
    const successCount = result.uploadResults.filter(r => r.success).length;
    const failCount = result.uploadResults.filter(r => !r.success).length;

    return NextResponse.json({
      success: successCount > 0,
      message: `Uploaded ${successCount} file(s) successfully${failCount > 0 ? `, ${failCount} failed` : ''}`,
      uploadResults: result.uploadResults,
      reloadResult: result.reloadResult,
      stats: {
        total: files.length,
        success: successCount,
        failed: failCount
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      },
      { status: 500 }
    );
  }
}
