'use client';

import { CompetitorRetailer } from '@/lib/types/manual-comparison';
import { COMPETITORS, COMPETITOR_LIST } from '@/lib/constants/competitors';
import { Check } from 'lucide-react';

interface RetailerSelectorProps {
  selectedRetailers: CompetitorRetailer[];
  onSelect: (retailer: CompetitorRetailer) => void;
  disabled?: boolean;
}

export function RetailerSelector({
  selectedRetailers,
  onSelect,
  disabled = false,
}: RetailerSelectorProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900">Select Retailer</h3>
      </div>
      <div className="p-4 space-y-2">
        {COMPETITOR_LIST.map((competitor) => {
          const isSelected = selectedRetailers.includes(competitor.id);
          return (
            <button
              key={competitor.id}
              type="button"
              onClick={() => onSelect(competitor.id)}
              disabled={disabled}
              className={`
                w-full flex items-center justify-between px-4 py-3 rounded-lg border transition-colors
                ${isSelected
                  ? 'border-cyan-500 bg-cyan-50'
                  : 'border-gray-200 bg-white hover:bg-gray-50'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <span className="text-sm font-medium text-gray-700">
                {competitor.name.toLowerCase()}
              </span>
              {isSelected && (
                <Check className="w-4 h-4 text-cyan-500" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
