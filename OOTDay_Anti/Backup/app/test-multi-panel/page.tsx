'use client';

import { MultiPanelTestMode } from '@/components/chat/MultiPanelTestMode';
import { exportResultsBoth } from '@/lib/test-result-exporter';

export default function TestMultiPanelPage() {
  const handleExport = (results: any[]) => {
    console.log('Exporting', results.length, 'results');
    exportResultsBoth(results);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <MultiPanelTestMode
          onExportAll={handleExport}
          maxPanels={4}
        />
      </div>
    </div>
  );
}
