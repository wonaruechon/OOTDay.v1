'use client';

import { ThaiWatsuduInput } from '@/lib/types/manual-comparison';
import { THAI_WATSADU_COLOR } from '@/lib/constants/competitors';

interface ThaiWatsuduInputCardProps {
  value: ThaiWatsuduInput;
  onChange: (value: ThaiWatsuduInput) => void;
  disabled?: boolean;
  errors?: {
    sku?: string;
    url?: string;
  };
}

export function ThaiWatsuduInputCard({
  value,
  onChange,
  disabled = false,
  errors,
}: ThaiWatsuduInputCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header with Thai Watsadu branding */}
      <div
        className="px-4 py-2"
        style={{ backgroundColor: THAI_WATSADU_COLOR }}
      >
        <span className="text-sm font-semibold text-white">Thai Watsadu</span>
      </div>

      {/* Input Fields */}
      <div className="p-4 space-y-4">
        {/* SKU Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            SKU <span className="text-red-500">*</span>
          </label>
          <div
            className="bg-gray-100 rounded-lg px-4 py-3 min-h-[48px] cursor-text"
            onClick={() => {
              const input = document.getElementById('thai-watsadu-sku');
              input?.focus();
            }}
          >
            <input
              id="thai-watsadu-sku"
              type="text"
              value={value.sku}
              onChange={(e) => onChange({ ...value, sku: e.target.value })}
              placeholder="1 SKU"
              disabled={disabled}
              className={`
                w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400
                disabled:cursor-not-allowed
              `}
            />
          </div>
          {errors?.sku && (
            <p className="text-xs text-red-600">{errors.sku}</p>
          )}
        </div>

        {/* URL Input */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            URL <span className="text-red-500">*</span>
          </label>
          <div
            className="bg-gray-100 rounded-lg px-4 py-3 min-h-[48px] cursor-text"
            onClick={() => {
              const input = document.getElementById('thai-watsadu-url');
              input?.focus();
            }}
          >
            <input
              id="thai-watsadu-url"
              type="url"
              value={value.url}
              onChange={(e) => onChange({ ...value, url: e.target.value })}
              placeholder="1 URL"
              disabled={disabled}
              className={`
                w-full bg-transparent border-none outline-none text-gray-700 placeholder-gray-400
                disabled:cursor-not-allowed
              `}
            />
          </div>
          {errors?.url && (
            <p className="text-xs text-red-600">{errors.url}</p>
          )}
        </div>
      </div>
    </div>
  );
}
