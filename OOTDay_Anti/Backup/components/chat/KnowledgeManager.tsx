/**
 * Knowledge Manager Component
 * Complete knowledge management interface with upload, list, and stats
 */

'use client';

import { useState, useEffect } from 'react';
import { KnowledgeUploader } from './KnowledgeUploader';
import {
  Upload,
  Database,
  RefreshCw,
  FileText,
  TrendingUp,
  Clock,
  Folder,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

interface KnowledgeFile {
  filename: string;
  category: string;
  size: number;
  lastModified: string;
}

interface KnowledgeStats {
  totalDocuments: number;
  totalChunks: number;
  totalEmbeddings: number;
  lastUpdated: string;
  documentsByCategory: Record<string, number>;
}

export function KnowledgeManager() {
  const [activeTab, setActiveTab] = useState<'upload' | 'files' | 'stats'>('upload');
  const [files, setFiles] = useState<KnowledgeFile[]>([]);
  const [stats, setStats] = useState<KnowledgeStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/knowledge/list');
      const data = await response.json();

      if (data.success) {
        setFiles(data.files);
      }
    } catch (error) {
      console.error('Failed to load files:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch('/api/knowledge/reload', { method: 'POST' });
      const data = await response.json();

      if (data.success && data.stats) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    }
  };

  const handleReload = async () => {
    setReloading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/knowledge/reload', { method: 'POST' });
      const data = await response.json();

      if (data.success) {
        setMessage({ type: 'success', text: 'Knowledge base reloaded successfully!' });
        if (data.stats) {
          setStats(data.stats);
        }
        await loadFiles();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to reload' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Network error occurred' });
    } finally {
      setReloading(false);
    }
  };

  const handleUploadComplete = async () => {
    setMessage({ type: 'success', text: 'Files uploaded and indexed successfully!' });
    await loadFiles();
    await loadStats();
  };

  useEffect(() => {
    if (activeTab === 'files') {
      loadFiles();
    } else if (activeTab === 'stats') {
      loadStats();
    }
  }, [activeTab]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Knowledge Management
            </h2>
            <p className="text-purple-100">
              Upload and manage knowledge documents for the AI assistant
            </p>
          </div>
          <Database className="w-12 h-12 text-white opacity-80" />
        </div>
      </div>

      {/* Message Banner */}
      {message && (
        <div
          className={`p-4 ${
            message.type === 'success'
              ? 'bg-green-50 border-l-4 border-green-500'
              : 'bg-red-50 border-l-4 border-red-500'
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5 text-green-600" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-600" />
            )}
            <p
              className={`text-sm font-medium ${
                message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {message.text}
            </p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px">
          <button
            onClick={() => setActiveTab('upload')}
            className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'upload'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <Upload className="w-4 h-4 inline-block mr-2" />
            Upload
          </button>
          <button
            onClick={() => setActiveTab('files')}
            className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'files'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FileText className="w-4 h-4 inline-block mr-2" />
            Files ({files.length})
          </button>
          <button
            onClick={() => setActiveTab('stats')}
            className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'stats'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline-block mr-2" />
            Statistics
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'upload' && (
          <div>
            <KnowledgeUploader onUploadComplete={handleUploadComplete} />
          </div>
        )}

        {activeTab === 'files' && (
          <div>
            {loading ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Loading files...</p>
              </div>
            ) : files.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p className="text-gray-500 mb-2">No knowledge documents yet</p>
                <p className="text-sm text-gray-400">
                  Upload some documents in the Upload tab
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="w-6 h-6 text-blue-600 flex-shrink-0" />

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {file.filename}
                      </p>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Folder className="w-3 h-3" />
                          {file.category}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatDate(file.lastModified)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'stats' && (
          <div>
            {!stats ? (
              <div className="text-center py-12">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
                <p className="text-gray-500">Loading statistics...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-blue-900">Documents</p>
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-3xl font-bold text-blue-900">
                      {stats.totalDocuments}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-purple-900">Chunks</p>
                      <Database className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-3xl font-bold text-purple-900">
                      {stats.totalChunks}
                    </p>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium text-green-900">Embeddings</p>
                      <TrendingUp className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-3xl font-bold text-green-900">
                      {stats.totalEmbeddings}
                    </p>
                  </div>
                </div>

                {/* Category Breakdown */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Documents by Category
                  </h3>
                  <div className="space-y-2">
                    {Object.entries(stats.documentsByCategory).map(([category, count]) => (
                      <div key={category} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Folder className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-700 capitalize">
                            {category}
                          </span>
                        </div>
                        <span className="text-sm font-medium text-gray-900">
                          {count}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  Last updated: {formatDate(stats.lastUpdated)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="border-t border-gray-200 p-4 bg-gray-50">
        <button
          onClick={handleReload}
          disabled={reloading}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center gap-2"
        >
          <RefreshCw className={`w-5 h-5 ${reloading ? 'animate-spin' : ''}`} />
          {reloading ? 'Reloading Knowledge Base...' : 'Reload Knowledge Base'}
        </button>
        <p className="text-xs text-gray-500 text-center mt-2">
          Reload to apply changes and update statistics
        </p>
      </div>
    </div>
  );
}
