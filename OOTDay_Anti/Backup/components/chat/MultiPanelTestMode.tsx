'use client';

/**
 * Multi-Panel Test Mode Component
 * Allows testing up to 4 LLM models simultaneously with shared budget
 */

import React, { useState, useEffect } from 'react';
import { Model, TestScenario, TestResult, BudgetStatus } from '@/lib/types/test-types';
import { getTestScenarios } from '@/lib/test-scenarios';
import { processChatRequest } from '@/lib/chat-orchestrator';
import { evaluateResponse } from '@/lib/test-evaluator';
import modelsConfig from '@/config/models.json';

interface ChatPanel {
  id: string;
  modelId: string;
  result: TestResult | null;
  isRunning: boolean;
  error: string | null;
}

interface MultiPanelTestModeProps {
  onExportAll?: (results: TestResult[]) => void;
  maxPanels?: number;
}

export function MultiPanelTestMode({ onExportAll, maxPanels = 4 }: MultiPanelTestModeProps) {
  const [models] = useState<Model[]>(modelsConfig.models);
  const [scenarios, setScenarios] = useState<TestScenario[]>([]);
  const [selectedScenarioId, setSelectedScenarioId] = useState('');
  const [customQuery, setCustomQuery] = useState('');

  // Panel management
  const [panels, setPanels] = useState<ChatPanel[]>([
    { id: 'panel-1', modelId: '', result: null, isRunning: false, error: null },
    { id: 'panel-2', modelId: '', result: null, isRunning: false, error: null }
  ]);

  // Budget tracking (shared across all panels)
  const [budgetStatus, setBudgetStatus] = useState<BudgetStatus>({
    currentCost: 0,
    remainingBudget: 5,
    totalBudget: 5,
    percentageUsed: 0,
    warningThreshold: false
  });

  const [isTestModeActive, setIsTestModeActive] = useState(false);

  // Load scenarios on mount
  useEffect(() => {
    getTestScenarios().then(setScenarios);
  }, []);

  // Load budget from session storage
  useEffect(() => {
    const savedCost = sessionStorage.getItem('multi-panel-test-cost');
    if (savedCost) {
      const cost = parseFloat(savedCost);
      updateBudgetStatus(cost);
    }
  }, []);

  const updateBudgetStatus = (currentCost: number) => {
    const totalBudget = 5;
    const remaining = totalBudget - currentCost;
    const percentage = (currentCost / totalBudget) * 100;

    setBudgetStatus({
      currentCost,
      remainingBudget: remaining,
      totalBudget,
      percentageUsed: percentage,
      warningThreshold: percentage >= 80
    });
  };

  const addPanel = () => {
    if (panels.length < maxPanels) {
      setPanels([...panels, {
        id: `panel-${panels.length + 1}`,
        modelId: '',
        result: null,
        isRunning: false,
        error: null
      }]);
    }
  };

  const removePanel = (panelId: string) => {
    if (panels.length > 1) {
      setPanels(panels.filter(p => p.id !== panelId));
    }
  };

  const updatePanelModel = (panelId: string, modelId: string) => {
    setPanels(panels.map(p =>
      p.id === panelId ? { ...p, modelId } : p
    ));
  };

  const runAllTests = async () => {
    // Validation
    const activePanels = panels.filter(p => p.modelId);
    if (activePanels.length === 0) {
      alert('Please select at least one model');
      return;
    }

    if (!selectedScenarioId && !customQuery) {
      alert('Please select a scenario or enter a custom query');
      return;
    }

    if (budgetStatus.percentageUsed >= 100) {
      alert('Budget exceeded. Please reset budget to continue testing.');
      return;
    }

    setIsTestModeActive(true);

    // Get the query
    let scenario: TestScenario;
    const query = customQuery || scenarios.find(s => s.id === selectedScenarioId)?.query || '';

    if (customQuery) {
      scenario = {
        id: 'custom',
        occasion: 'Custom',
        query: customQuery,
        expectedCategory: 'CLOTHS',
        expectedTemplate: 'Template A',
        referenceOutput: ''
      };
    } else {
      const foundScenario = scenarios.find(s => s.id === selectedScenarioId);
      if (!foundScenario) {
        alert('Scenario not found');
        setIsTestModeActive(false);
        return;
      }
      scenario = foundScenario;
    }

    // Run tests for all panels in parallel
    const testPromises = activePanels.map(async (panel) => {
      setPanels(prev => prev.map(p =>
        p.id === panel.id ? { ...p, isRunning: true, error: null } : p
      ));

      try {
        const model = models.find(m => m.id === panel.modelId);
        if (!model) throw new Error('Model not found');

        const startTime = Date.now();

        // Use chat orchestrator with RAG and guardrails
        const chatResponse = await processChatRequest({
          query,
          modelId: model.id
        });

        const responseTime = Date.now() - startTime;

        // Calculate cost (estimate based on response length)
        const estimatedTokens = Math.ceil(query.length / 4) + Math.ceil(chatResponse.response.length / 4);
        const cost =
          (estimatedTokens * model.inputPricePerMillion) / 1000000 +
          (estimatedTokens * model.outputPricePerMillion) / 1000000;

        // Update budget
        const newCost = budgetStatus.currentCost + cost;
        sessionStorage.setItem('multi-panel-test-cost', newCost.toString());
        updateBudgetStatus(newCost);

        // Evaluate response
        const evaluation = evaluateResponse(chatResponse.response, scenario);

        // Create test result
        const testResult: TestResult = {
          id: `test-${Date.now()}-${panel.id}`,
          timestamp: new Date().toISOString(),
          model,
          scenario,
          query,
          response: chatResponse.response,
          tokenUsage: {
            promptTokens: estimatedTokens,
            completionTokens: estimatedTokens,
            totalTokens: estimatedTokens * 2
          },
          cost,
          responseTime,
          evaluationScore: evaluation.scores
        };

        setPanels(prev => prev.map(p =>
          p.id === panel.id ? { ...p, result: testResult, isRunning: false } : p
        ));

      } catch (error: any) {
        setPanels(prev => prev.map(p =>
          p.id === panel.id ? { ...p, error: error.message, isRunning: false } : p
        ));
      }
    });

    await Promise.all(testPromises);
    setIsTestModeActive(false);
  };

  const handleResetBudget = () => {
    sessionStorage.removeItem('multi-panel-test-cost');
    updateBudgetStatus(0);
    setPanels(panels.map(p => ({ ...p, result: null, error: null })));
  };

  const handleExportAll = () => {
    const results = panels.filter(p => p.result).map(p => p.result!);
    if (onExportAll && results.length > 0) {
      onExportAll(results);
    }
  };

  const getPanelBorderColor = (index: number) => {
    const colors = ['border-blue-500', 'border-green-500', 'border-yellow-500', 'border-red-500'];
    return colors[index % colors.length];
  };

  return (
    <div className="space-y-4 p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border-2 border-orange-400 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="px-4 py-2 bg-orange-600 text-white font-bold rounded-lg text-sm shadow-md">
            INTERACTIVE TEST MODE
          </span>
          <span className="text-sm font-medium text-gray-700">
            Multi-Panel Model Comparison
          </span>
        </div>
        <button
          onClick={() => setIsTestModeActive(false)}
          className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-medium shadow-md"
        >
          Exit Test Mode
        </button>
      </div>

      {/* Scenario Selection */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Select Test Scenario
        </label>
        <select
          value={selectedScenarioId}
          onChange={(e) => {
            setSelectedScenarioId(e.target.value);
            if (e.target.value !== 'custom') setCustomQuery('');
          }}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          disabled={isTestModeActive}
        >
          <option value="">-- Select Scenario --</option>
          {scenarios.map(s => (
            <option key={s.id} value={s.id}>
              {s.occasion}: {s.query.substring(0, 60)}...
            </option>
          ))}
          <option value="custom">Custom Query</option>
        </select>

        {(selectedScenarioId === 'custom' || customQuery) && (
          <textarea
            value={customQuery}
            onChange={(e) => setCustomQuery(e.target.value)}
            placeholder="Enter your custom fashion query..."
            className="w-full mt-3 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            rows={2}
            disabled={isTestModeActive}
          />
        )}
      </div>

      {/* Panel Controls */}
      <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={addPanel}
            disabled={panels.length >= maxPanels || isTestModeActive}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
          >
            + Add Panel ({panels.length}/{maxPanels})
          </button>
          <button
            onClick={runAllTests}
            disabled={isTestModeActive || budgetStatus.percentageUsed >= 100}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
          >
            {isTestModeActive ? 'Running Tests...' : 'Run All Tests'}
          </button>
        </div>
        <button
          onClick={handleExportAll}
          disabled={!panels.some(p => p.result)}
          className="px-4 py-2 border-2 border-green-600 text-green-700 rounded-lg hover:bg-green-50 disabled:opacity-50 disabled:cursor-not-allowed font-medium shadow-sm"
        >
          Export All
        </button>
      </div>

      {/* Shared Budget Tracker */}
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-800">Shared Budget</span>
          <div className="text-right">
            <span className={`text-xl font-bold ${budgetStatus.warningThreshold ? 'text-red-600' : 'text-gray-800'}`}>
              ${budgetStatus.currentCost.toFixed(6)}
            </span>
            <span className="text-gray-500"> / ${budgetStatus.totalBudget.toFixed(2)}</span>
            <p className="text-xs text-gray-600 mt-1">
              ${budgetStatus.remainingBudget.toFixed(6)} remaining
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${
              budgetStatus.percentageUsed >= 100
                ? 'bg-red-600'
                : budgetStatus.warningThreshold
                ? 'bg-yellow-500'
                : 'bg-green-500'
            }`}
            style={{ width: `${Math.min(budgetStatus.percentageUsed, 100)}%` }}
          />
        </div>
        <button
          onClick={handleResetBudget}
          className="mt-3 px-4 py-1 text-sm border border-gray-400 text-gray-700 rounded hover:bg-gray-100"
        >
          Reset Budget
        </button>
      </div>

      {/* Test Panels Grid */}
      <div className={`grid ${panels.length === 1 ? 'grid-cols-1' : panels.length === 2 ? 'grid-cols-2' : 'grid-cols-2'} gap-4`}>
        {panels.map((panel, index) => (
          <div
            key={panel.id}
            className={`bg-white p-4 rounded-lg shadow-lg border-2 ${getPanelBorderColor(index)}`}
          >
            {/* Panel Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${getPanelBorderColor(index).replace('border-', 'bg-')}`} />
                <span className="font-semibold text-gray-700">Panel {index + 1}</span>
              </div>
              {panels.length > 1 && (
                <button
                  onClick={() => removePanel(panel.id)}
                  disabled={isTestModeActive}
                  className="text-red-600 hover:text-red-800 disabled:opacity-50"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Model Selector */}
            <select
              value={panel.modelId}
              onChange={(e) => updatePanelModel(panel.id, e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isTestModeActive}
            >
              <option value="">Select Model</option>
              {models.map(m => (
                <option key={m.id} value={m.id}>
                  {m.name} ({m.provider})
                </option>
              ))}
            </select>

            {/* Panel Status */}
            {panel.isRunning && (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
                <span className="ml-3 text-sm text-gray-600">Running test...</span>
              </div>
            )}

            {panel.error && (
              <div className="p-3 bg-red-50 border border-red-300 text-red-700 rounded text-xs">
                {panel.error}
              </div>
            )}

            {panel.result && (
              <div className="space-y-3">
                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Tokens:</span>
                    <span className="ml-1 font-semibold">{panel.result.tokenUsage.totalTokens}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Cost:</span>
                    <span className="ml-1 font-semibold">${panel.result.cost.toFixed(6)}</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Time:</span>
                    <span className="ml-1 font-semibold">{panel.result.responseTime}ms</span>
                  </div>
                  <div className="bg-gray-50 p-2 rounded">
                    <span className="text-gray-600">Score:</span>
                    <span className="ml-1 font-semibold">{panel.result.evaluationScore.overallQuality.toFixed(1)}/10</span>
                  </div>
                </div>

                {/* Response Preview */}
                <div className="border border-gray-200 rounded">
                  <div className="px-3 py-2 bg-gray-100 text-xs font-semibold text-gray-700">
                    Response Preview
                  </div>
                  <div className="p-3 bg-white text-xs max-h-48 overflow-auto">
                    {panel.result.response.substring(0, 300)}...
                  </div>
                </div>
              </div>
            )}

            {!panel.result && !panel.isRunning && !panel.error && (
              <div className="text-center py-8 text-sm text-gray-500">
                Select a model to begin
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
