'use client';

/**
 * Budget Tracker Component
 * Displays current cost, remaining budget, and progress
 */

import React from 'react';
import { BudgetStatus } from '@/lib/types/test-types';

interface BudgetTrackerProps {
  budgetStatus: BudgetStatus;
  onReset?: () => void;
}

export function BudgetTracker({ budgetStatus, onReset }: BudgetTrackerProps) {
  const { currentCost, remainingBudget, totalBudget, percentageUsed, warningThreshold } =
    budgetStatus;

  const getProgressColor = () => {
    if (percentageUsed >= 100) return 'bg-red-500';
    if (warningThreshold) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getTextColor = () => {
    if (percentageUsed >= 100) return 'text-red-600';
    if (warningThreshold) return 'text-orange-600';
    return 'text-green-600';
  };

  return (
    <div className="flex flex-col gap-3 p-4 border rounded-md bg-gray-50">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold">Budget Tracker</h3>
        {onReset && (
          <button
            onClick={onReset}
            className="text-xs px-2 py-1 border rounded hover:bg-white transition"
          >
            Reset
          </button>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Used:</span>
          <span className={`font-semibold ${getTextColor()}`}>
            ${currentCost.toFixed(3)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Remaining:</span>
          <span className="font-semibold">
            ${remainingBudget.toFixed(3)}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Total:</span>
          <span className="font-semibold">
            ${totalBudget.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${getProgressColor()} transition-all duration-300`}
          style={{ width: `${Math.min(percentageUsed, 100)}%` }}
        />
      </div>

      <div className="text-xs text-center">
        {percentageUsed.toFixed(1)}% used
      </div>

      {warningThreshold && percentageUsed < 100 && (
        <div className="text-xs text-orange-600 text-center font-medium">
          ⚠️ Warning: 80% budget threshold reached
        </div>
      )}

      {percentageUsed >= 100 && (
        <div className="text-xs text-red-600 text-center font-medium">
          🚫 Budget exceeded - testing disabled
        </div>
      )}
    </div>
  );
}
