import React from 'react';
import { Bug } from 'lucide-react';
import { useDebug } from '../contexts/DebugContext';

export function DebugToggle() {
  const { debugMode, toggleDebug } = useDebug();

  return (
    <button
      onClick={toggleDebug}
      className={`fixed bottom-4 right-4 z-50 p-3 rounded-full shadow-lg transition-all ${
        debugMode 
          ? 'bg-red-500 text-white hover:bg-red-600' 
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
      title={debugMode ? 'Debug Mode ON' : 'Debug Mode OFF'}
    >
      <Bug className="w-5 h-5" />
    </button>
  );
}