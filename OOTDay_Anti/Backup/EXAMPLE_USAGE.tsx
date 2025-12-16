/**
 * Example Usage: Multi-Panel Test Mode Integration
 *
 * This file demonstrates how to integrate the Multi-Panel Test Mode
 * into your Next.js application with the chat orchestrator.
 */

'use client';

import { useState } from 'react';
import { MultiPanelTestMode } from '@/components/chat/MultiPanelTestMode';
import { exportResultsBoth } from '@/lib/test-result-exporter';
import { TestResult } from '@/lib/types/test-types';

/**
 * Example 1: Simple Page with Test Mode Only
 */
export function SimpleTestModePage() {
  const handleExport = (results: TestResult[]) => {
    console.log('Exporting', results.length, 'test results');
    exportResultsBoth(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          LLM Model Testing
        </h1>
        <MultiPanelTestMode
          onExportAll={handleExport}
          maxPanels={4}
        />
      </div>
    </div>
  );
}

/**
 * Example 2: Toggle Between Normal Chat and Test Mode
 */
export function ChatPageWithTestMode() {
  const [isTestMode, setIsTestMode] = useState(false);

  const handleExport = (results: TestResult[]) => {
    console.log('Exported results:', results);
    exportResultsBoth(results);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Toggle */}
      <header className="bg-white border-b border-gray-200 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">
            OOTDay Fashion Assistant
          </h1>
          <button
            onClick={() => setIsTestMode(!isTestMode)}
            className={`px-6 py-2 rounded-lg font-medium transition-colors ${
              isTestMode
                ? 'bg-orange-600 text-white hover:bg-orange-700'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {isTestMode ? 'Exit Test Mode' : 'Enter Test Mode'}
          </button>
        </div>
      </header>

      {/* Content Area */}
      <main className="p-6">
        <div className="max-w-7xl mx-auto">
          {isTestMode ? (
            <MultiPanelTestMode
              onExportAll={handleExport}
              maxPanels={4}
            />
          ) : (
            <NormalChatInterface />
          )}
        </div>
      </main>
    </div>
  );
}

/**
 * Example 3: Test Mode with Custom Export Handler
 */
export function TestModeWithCustomExport() {
  const [exportedCount, setExportedCount] = useState(0);

  const handleCustomExport = (results: TestResult[]) => {
    // Log statistics
    console.log('=== Test Results Summary ===');
    console.log('Total tests:', results.length);

    results.forEach((result, index) => {
      console.log(`\nTest ${index + 1}:`);
      console.log('- Model:', result.model.name);
      console.log('- Score:', result.evaluationScore.overallQuality.toFixed(1));
      console.log('- Cost:', `$${result.cost.toFixed(6)}`);
      console.log('- Time:', `${result.responseTime}ms`);
    });

    const totalCost = results.reduce((sum, r) => sum + r.cost, 0);
    const avgScore = results.reduce((sum, r) => sum + r.evaluationScore.overallQuality, 0) / results.length;

    console.log('\n=== Overall Statistics ===');
    console.log('Total Cost:', `$${totalCost.toFixed(6)}`);
    console.log('Average Score:', avgScore.toFixed(2));

    // Export to files
    exportResultsBoth(results);
    setExportedCount(exportedCount + results.length);

    // Show success message
    alert(`Exported ${results.length} test results!\nTotal cost: $${totalCost.toFixed(6)}\nAverage score: ${avgScore.toFixed(1)}/10`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Banner */}
        {exportedCount > 0 && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
            Successfully exported {exportedCount} test results this session
          </div>
        )}

        <MultiPanelTestMode
          onExportAll={handleCustomExport}
          maxPanels={4}
        />
      </div>
    </div>
  );
}

/**
 * Example 4: Test Mode with Limited Panels
 */
export function TwoPanelComparison() {
  const handleExport = (results: TestResult[]) => {
    exportResultsBoth(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Two-Model Comparison
          </h1>
          <p className="text-gray-600">
            Compare responses from two different LLM models side-by-side
          </p>
        </div>

        <MultiPanelTestMode
          onExportAll={handleExport}
          maxPanels={2}
        />
      </div>
    </div>
  );
}

/**
 * Placeholder Normal Chat Interface Component
 */
function NormalChatInterface() {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Normal Chat Mode
        </h2>
        <p className="text-gray-600 mb-6">
          This is where your normal chat interface would go.
          Click "Enter Test Mode" to access the multi-panel testing interface.
        </p>
        <div className="bg-gray-100 rounded-lg p-8 text-gray-500">
          Your chat interface components here...
        </div>
      </div>
    </div>
  );
}

/**
 * Example 5: Full Integration with API Route
 *
 * Create this API route: app/api/test/route.ts
 */
/*
import { NextResponse } from 'next/server';
import { processChatRequest } from '@/lib/chat-orchestrator';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { query, modelId } = body;

    // Use chat orchestrator with RAG and guardrails
    const response = await processChatRequest({
      query,
      modelId
    });

    return NextResponse.json({
      success: true,
      response: response.response,
      metadata: response.metadata
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
*/

/**
 * Example 6: Server Component with Client Wrapper
 *
 * app/test-mode/page.tsx
 */
/*
import { Metadata } from 'next';
import { TestModeClient } from './TestModeClient';

export const metadata: Metadata = {
  title: 'LLM Model Testing | OOTDay',
  description: 'Compare multiple LLM models for fashion recommendations',
};

export default function TestModePage() {
  return <TestModeClient />;
}
*/

/**
 * Example 7: Client Component Wrapper
 *
 * app/test-mode/TestModeClient.tsx
 */
/*
'use client';

import { MultiPanelTestMode } from '@/components/chat/MultiPanelTestMode';
import { exportResultsBoth } from '@/lib/test-result-exporter';

export function TestModeClient() {
  return (
    <div className="min-h-screen bg-gray-50">
      <MultiPanelTestMode
        onExportAll={(results) => {
          console.log('Exporting', results.length, 'results');
          exportResultsBoth(results);
        }}
        maxPanels={4}
      />
    </div>
  );
}
*/

/**
 * Example 8: Environment Variables
 *
 * .env.local
 */
/*
# Required: OpenRouter API Key
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxx

# Optional: OpenAI for embeddings (RAG)
OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Optional: Enable test mode in production
NEXT_PUBLIC_ENABLE_TEST_MODE=true
*/

/**
 * How to Use:
 *
 * 1. Copy one of the examples above
 * 2. Create a new page in your Next.js app
 * 3. Import and use the component
 * 4. Add your API key to .env.local
 * 5. Run `pnpm dev` and test!
 *
 * Example file structure:
 *
 * app/
 * ├── test-mode/
 * │   ├── page.tsx           ← Server component
 * │   └── TestModeClient.tsx ← Client component (use Example 2 or 3)
 * ├── api/
 * │   └── test/
 * │       └── route.ts       ← API route (use Example 5)
 * └── layout.tsx
 */

export default ChatPageWithTestMode;
