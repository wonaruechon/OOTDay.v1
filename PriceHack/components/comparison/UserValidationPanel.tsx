'use client';

import { CompetitorMatchResult, CompetitorRetailer } from '@/lib/types/manual-comparison';
import { COMPETITORS } from '@/lib/constants/competitors';
import { RefreshCw, Check, Loader2, AlertCircle } from 'lucide-react';
import { EmptyState } from './EmptyState';

interface UserValidationPanelProps {
  results: CompetitorMatchResult[];
  onRetry: () => void;
  onConfirm: () => void;
  isProcessing?: boolean;
}

export function UserValidationPanel({
  results,
  onRetry,
  onConfirm,
  isProcessing = false,
}: UserValidationPanelProps) {
  const hasPending = results.some((r) => r.status === 'pending');

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">User validate</h3>
      </div>

      {/* Results List */}
      <div className="divide-y divide-gray-100">
        {results.length === 0 ? (
          <EmptyState
            icon={AlertCircle}
            title="No results yet"
            description="Click Compare to process the comparison and see the results here."
          />
        ) : (
          results.map((result) => (
            <CompetitorValidationRow key={result.competitor} result={result} />
          ))
        )}
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-gray-200 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={onRetry}
          disabled={isProcessing || hasPending}
          className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <RefreshCw className="w-4 h-4" />
          )}
          <span>Retry</span>
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={isProcessing || hasPending}
          className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isProcessing ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          <span>Confirm</span>
        </button>
      </div>
    </div>
  );
}

interface CompetitorValidationRowProps {
  result: CompetitorMatchResult;
}

function CompetitorValidationRow({ result }: CompetitorValidationRowProps) {
  const competitor = COMPETITORS[result.competitor];
  const matchCount = result.matchCount ?? (result.status === 'match' ? 1 : 0);
  const notMatchCount = result.notMatchCount ?? (result.status === 'not_match' ? 1 : 0);
  const totalUrls = matchCount + notMatchCount;
  const isPending = result.status === 'pending';

  return (
    <div className="p-4">
      {/* Competitor Header */}
      <div
        className="rounded-t-lg px-4 py-2"
        style={{ backgroundColor: competitor.color }}
      >
        <span className="text-sm font-semibold text-white">{competitor.name}</span>
      </div>

      {/* Results Content */}
      <div className="bg-gray-50 rounded-b-lg p-4 space-y-2">
        {isPending ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-5 h-5 text-gray-400 animate-spin" />
            <span className="ml-2 text-sm text-gray-500">Processing...</span>
          </div>
        ) : (
          <>
            {/* Match Results */}
            {matchCount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {matchCount} URL Match
                </span>
                <span className="text-sm font-medium text-green-600">
                  {result.confidence}%
                </span>
              </div>
            )}

            {/* Not Match Results */}
            {notMatchCount > 0 && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">
                  {notMatchCount} URL Not Match
                </span>
                <span className="text-sm font-medium text-red-600">
                  {result.status === 'not_match' ? '0%' : `${100 - result.confidence}%`}
                </span>
              </div>
            )}

            {/* When there are no results yet */}
            {totalUrls === 0 && result.status === 'error' && (
              <div className="text-sm text-red-600">
                {result.errorMessage || 'Error processing comparison'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
