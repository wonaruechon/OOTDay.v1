'use client';

import { useState } from 'react';
import { CompetitorRetailer, CompetitorUrlEntry } from '@/lib/types/manual-comparison';
import { COMPETITORS } from '@/lib/constants/competitors';
import { Plus, X } from 'lucide-react';

interface CompetitorInputCardProps {
  entry: CompetitorUrlEntry;
  onChange: (entry: CompetitorUrlEntry) => void;
  onRemove: () => void;
  disabled?: boolean;
  error?: string;
}

export function CompetitorInputCard({
  entry,
  onChange,
  onRemove,
  disabled = false,
  error,
}: CompetitorInputCardProps) {
  const competitor = COMPETITORS[entry.retailer];

  const handleAddUrl = () => {
    onChange({
      ...entry,
      urls: [...entry.urls, ''],
    });
  };

  const handleUrlChange = (index: number, url: string) => {
    const newUrls = [...entry.urls];
    newUrls[index] = url;
    onChange({ ...entry, urls: newUrls });
  };

  const handleRemoveUrl = (index: number) => {
    if (entry.urls.length <= 1) return;
    const newUrls = entry.urls.filter((_, i) => i !== index);
    onChange({ ...entry, urls: newUrls });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header with competitor branding */}
      <div
        className="px-4 py-2 flex items-center justify-between"
        style={{ backgroundColor: competitor.color }}
      >
        <span className="text-sm font-semibold text-white">{competitor.name}</span>
        <button
          type="button"
          onClick={onRemove}
          disabled={disabled}
          className="text-white/80 hover:text-white disabled:cursor-not-allowed transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* URL Inputs */}
      <div className="p-4 space-y-3">
        <label className="block text-sm font-medium text-gray-700">URL</label>

        {entry.urls.map((url, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="flex-1 bg-gray-100 rounded-lg px-4 py-3 min-h-[48px] cursor-text"
              onClick={() => {
                const input = document.getElementById(`${entry.id}-url-${index}`);
                input?.focus();
              }}
            >
              <input
                id={`${entry.id}-url-${index}`}
                type="url"
                value={url}
                onChange={(e) => handleUrlChange(index, e.target.value)}
                placeholder={index === 0 ? '> 1 URL' : `Additional URL ${index + 1}`}
                disabled={disabled}
                className="w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 disabled:cursor-not-allowed"
              />
            </div>
            {entry.urls.length > 1 && (
              <button
                type="button"
                onClick={() => handleRemoveUrl(index)}
                disabled={disabled}
                className="p-2 text-gray-400 hover:text-red-500 disabled:cursor-not-allowed"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        ))}

        {/* Add URL Button */}
        <button
          type="button"
          onClick={handleAddUrl}
          disabled={disabled}
          className="flex items-center gap-2 text-sm text-cyan-600 hover:text-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add another URL</span>
        </button>

        {error && (
          <p className="text-xs text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
