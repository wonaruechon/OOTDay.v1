/**
 * Knowledge Uploader Component
 * Allows users to upload knowledge documents for the RAG system
 */

'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { Upload, FileText, CheckCircle, XCircle, Loader2, RefreshCw } from 'lucide-react';

interface UploadedFileInfo {
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  message?: string;
}

interface KnowledgeUploaderProps {
  onUploadComplete?: () => void;
}

export function KnowledgeUploader({ onUploadComplete }: KnowledgeUploaderProps) {
  const [files, setFiles] = useState<UploadedFileInfo[]>([]);
  const [category, setCategory] = useState<string>('custom');
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;

    const newFiles: UploadedFileInfo[] = Array.from(selectedFiles).map(file => ({
      file,
      status: 'pending'
    }));

    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleFileSelect(e.target.files);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    handleFileSelect(e.dataTransfer.files);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach(fileInfo => {
        formData.append('files', fileInfo.file);
      });
      formData.append('category', category);

      // Update all files to uploading status
      setFiles(prev => prev.map(f => ({ ...f, status: 'uploading' as const })));

      const response = await fetch('/api/knowledge/upload', {
        method: 'POST',
        body: formData
      });

      const result = await response.json();

      if (result.success) {
        // Update file statuses based on results
        setFiles(prev => prev.map((fileInfo, index) => {
          const uploadResult = result.uploadResults[index];
          return {
            ...fileInfo,
            status: uploadResult?.success ? 'success' : 'error',
            message: uploadResult?.message || uploadResult?.error
          };
        }));

        // Call callback after short delay to show success
        setTimeout(() => {
          onUploadComplete?.();
        }, 1500);
      } else {
        setFiles(prev => prev.map(f => ({
          ...f,
          status: 'error',
          message: result.error || 'Upload failed'
        })));
      }
    } catch (error) {
      console.error('Upload error:', error);
      setFiles(prev => prev.map(f => ({
        ...f,
        status: 'error',
        message: 'Network error'
      })));
    } finally {
      setIsUploading(false);
    }
  };

  const clearCompleted = () => {
    setFiles(prev => prev.filter(f => f.status !== 'success'));
  };

  const hasSuccess = files.some(f => f.status === 'success');
  const hasPending = files.some(f => f.status === 'pending');

  return (
    <div className="space-y-4">
      {/* Category Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Knowledge Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          disabled={isUploading}
        >
          <option value="fashion">Fashion (แฟชั่น)</option>
          <option value="occasions">Occasions (โอกาส)</option>
          <option value="brand">Brand Voice (ภาษาแบรนด์)</option>
          <option value="custom">Custom (อื่นๆ)</option>
        </select>
      </div>

      {/* Drop Zone */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept=".md,.txt,.markdown"
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />

        <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />

        <p className="text-lg font-medium text-gray-700 mb-2">
          Drop knowledge documents here
        </p>
        <p className="text-sm text-gray-500 mb-4">
          or click to browse (.md, .txt files)
        </p>

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Select Files
        </button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-700">
              Selected Files ({files.length})
            </h3>
            {hasSuccess && (
              <button
                onClick={clearCompleted}
                className="text-sm text-gray-600 hover:text-gray-800"
              >
                Clear completed
              </button>
            )}
          </div>

          <div className="space-y-2 max-h-64 overflow-y-auto">
            {files.map((fileInfo, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg"
              >
                <FileText className="w-5 h-5 text-gray-400 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {fileInfo.file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(fileInfo.file.size / 1024).toFixed(1)} KB
                  </p>
                  {fileInfo.message && (
                    <p className={`text-xs mt-1 ${
                      fileInfo.status === 'error' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {fileInfo.message}
                    </p>
                  )}
                </div>

                <div className="flex-shrink-0">
                  {fileInfo.status === 'pending' && (
                    <button
                      onClick={() => removeFile(index)}
                      disabled={isUploading}
                      className="text-gray-400 hover:text-red-600 disabled:opacity-50"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  )}
                  {fileInfo.status === 'uploading' && (
                    <Loader2 className="w-5 h-5 text-blue-600 animate-spin" />
                  )}
                  {fileInfo.status === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {fileInfo.status === 'error' && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Upload Button */}
      {hasPending && (
        <button
          onClick={uploadFiles}
          disabled={isUploading || files.length === 0}
          className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" />
              Upload {files.filter(f => f.status === 'pending').length} File(s)
            </>
          )}
        </button>
      )}
    </div>
  );
}
