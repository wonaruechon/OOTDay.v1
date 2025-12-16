/**
 * Knowledge Upload Integration Example
 * Demonstrates how to integrate the Knowledge Manager into your application
 */

'use client';

import { useState } from 'react';
import { KnowledgeManager } from '@/components/chat/KnowledgeManager';
import { Database, MessageSquare, X } from 'lucide-react';

/**
 * Example 1: Standalone Knowledge Manager Page
 * Perfect for admin/settings pages
 */
export function KnowledgeManagerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Knowledge Base Management
          </h1>
          <p className="text-gray-600">
            Upload and manage knowledge documents for your AI fashion assistant
          </p>
        </div>

        <KnowledgeManager />
      </div>
    </div>
  );
}

/**
 * Example 2: Modal/Sidebar Knowledge Manager
 * Opens as overlay on top of existing page
 */
export function ChatWithKnowledgeModal() {
  const [showKnowledgeManager, setShowKnowledgeManager] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            Fashion Assistant Chat
          </h1>
          <button
            onClick={() => setShowKnowledgeManager(true)}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
          >
            <Database className="w-4 h-4" />
            Manage Knowledge
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Chat Interface</h2>
            <p className="text-gray-600">Your chat interface goes here...</p>
          </div>
        </div>
      </main>

      {/* Knowledge Manager Modal */}
      {showKnowledgeManager && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Knowledge Manager</h2>
              <button
                onClick={() => setShowKnowledgeManager(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
              <KnowledgeManager />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Example 3: Split View - Chat and Knowledge Side by Side
 * Great for desktop applications
 */
export function SplitViewChatAndKnowledge() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            Fashion Assistant - Knowledge & Chat
          </h1>
        </div>
      </header>

      {/* Split View */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Chat Side - 60% */}
        <div className="w-3/5 border-r border-gray-200 p-6 overflow-y-auto">
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Chat Interface</h2>
              </div>
              <p className="text-gray-600">
                Your chat interface with AI assistant goes here.
                The AI will use knowledge from uploaded documents.
              </p>
            </div>
          </div>
        </div>

        {/* Knowledge Manager Side - 40% */}
        <div className="w-2/5 bg-gray-50 overflow-y-auto">
          <div className="p-6">
            <KnowledgeManager />
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 4: Tabbed Interface
 * Switch between chat and knowledge management
 */
export function TabbedChatAndKnowledge() {
  const [activeTab, setActiveTab] = useState<'chat' | 'knowledge'>('chat');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Tabs */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Fashion Assistant Platform
            </h1>
          </div>
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('chat')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'chat'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <MessageSquare className="w-4 h-4 inline-block mr-2" />
              Chat
            </button>
            <button
              onClick={() => setActiveTab('knowledge')}
              className={`px-6 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'knowledge'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Database className="w-4 h-4 inline-block mr-2" />
              Knowledge Base
            </button>
          </nav>
        </div>
      </header>

      {/* Tab Content */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'chat' ? (
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Chat with AI Assistant
              </h2>
              <p className="text-gray-600">
                Your chat interface goes here. The AI uses knowledge from the Knowledge Base tab.
              </p>
            </div>
          ) : (
            <KnowledgeManager />
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * Example 5: Minimal Floating Button
 * Quick access from anywhere
 */
export function ChatWithFloatingKnowledge() {
  const [showKnowledge, setShowKnowledge] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Chat Interface</h1>
          <p className="text-gray-600">Your chat interface here...</p>
        </div>
      </div>

      {/* Floating Action Button */}
      <button
        onClick={() => setShowKnowledge(!showKnowledge)}
        className="fixed bottom-8 right-8 w-14 h-14 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-all hover:scale-110 flex items-center justify-center z-40"
        title="Knowledge Manager"
      >
        <Database className="w-6 h-6" />
      </button>

      {/* Sliding Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          showKnowledge ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 border-b border-gray-200 p-4 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Knowledge Manager</h2>
            <button
              onClick={() => setShowKnowledge(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
          <KnowledgeManager />
        </div>
      </div>

      {/* Overlay */}
      {showKnowledge && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setShowKnowledge(false)}
        />
      )}
    </div>
  );
}

/**
 * How to Use:
 *
 * 1. Choose the layout that fits your application:
 *    - Standalone Page: Best for admin/settings areas
 *    - Modal: Quick access without leaving current page
 *    - Split View: Desktop-first, see both at once
 *    - Tabbed: Clean mobile-friendly interface
 *    - Floating Button: Minimal, always accessible
 *
 * 2. Create a new page in your Next.js app:
 *    app/knowledge/page.tsx (Server Component)
 *
 * 3. Import and use the client component:
 *    import { KnowledgeManagerPage } from '@/KNOWLEDGE_UPLOAD_EXAMPLE'
 *    export default KnowledgeManagerPage;
 *
 * 4. Make sure your API routes are accessible:
 *    - /api/knowledge/upload
 *    - /api/knowledge/list
 *    - /api/knowledge/reload
 *
 * 5. Set up environment variables in .env.local:
 *    OPENAI_API_KEY=sk-... (for embeddings)
 *
 * 6. Test the upload flow:
 *    - Upload a .md or .txt file
 *    - Check the Files tab to see uploaded documents
 *    - View Statistics to see indexing results
 *    - Click "Reload Knowledge Base" to apply changes
 *
 * The uploaded documents will automatically be indexed and used
 * by the RAG system when users ask questions in the chat.
 */

// Export default for easy importing
export default KnowledgeManagerPage;
