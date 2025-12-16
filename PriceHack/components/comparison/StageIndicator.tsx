'use client';

import { Check } from 'lucide-react';

interface StageIndicatorProps {
  currentStage: 'input' | 'selecting' | 'competitor_urls' | 'validation';
}

const STAGES = [
  { id: 'input', label: 'Input', number: 1 },
  { id: 'selecting', label: 'Select Retailers', number: 2 },
  { id: 'competitor_urls', label: 'Enter URLs', number: 3 },
  { id: 'validation', label: 'Validate', number: 4 },
] as const;

export function StageIndicator({ currentStage }: StageIndicatorProps) {
  const currentStageIndex = STAGES.findIndex((s) => s.id === currentStage);

  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between max-w-3xl mx-auto">
        {STAGES.map((stage, index) => {
          const isActive = stage.id === currentStage;
          const isCompleted = index < currentStageIndex;
          const isLast = index === STAGES.length - 1;

          return (
            <div key={stage.id} className="flex items-center flex-1">
              {/* Stage Circle */}
              <div className="flex flex-col items-center relative">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    transition-all duration-300
                    ${
                      isActive
                        ? 'bg-cyan-500 text-white shadow-md scale-110'
                        : isCompleted
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <span>{stage.number}</span>
                  )}
                </div>

                {/* Stage Label */}
                <span
                  className={`
                    mt-2 text-xs font-medium text-center whitespace-nowrap
                    hidden sm:block
                    ${
                      isActive
                        ? 'text-cyan-600'
                        : isCompleted
                        ? 'text-gray-700'
                        : 'text-gray-400'
                    }
                  `}
                >
                  {stage.label}
                </span>

                {/* Mobile Label - Show only for active stage */}
                <span
                  className={`
                    mt-2 text-xs font-medium text-center
                    block sm:hidden
                    ${isActive ? 'text-cyan-600' : 'hidden'}
                  `}
                >
                  {stage.label}
                </span>
              </div>

              {/* Connector Line */}
              {!isLast && (
                <div
                  className={`
                    flex-1 h-0.5 mx-2 transition-all duration-300
                    ${
                      index < currentStageIndex
                        ? 'bg-cyan-500'
                        : 'bg-gray-200'
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
