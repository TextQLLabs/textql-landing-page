import React, { useState } from 'react';
import { Settings, Bug, Sun, Moon, ChevronLeft, ChevronRight, AlertTriangle } from 'lucide-react';
import { useDebug } from '../contexts/DebugContext';
import { useDevToolsConfig } from '../contexts/DevToolsContext';
import { useDebugRegistry } from '../contexts/DebugRegistryContext';
import { StaticDebugWithTooltip } from './StaticDebugWithTooltip';

export function DevTools() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { debugMode: isDebugActive, toggleDebug } = useDebug();
  const { themeControls, customTools } = useDevToolsConfig();
  const { conflicts, labels, triggerConflictCheck } = useDebugRegistry();

  // Don't render in production
  if (import.meta.env.PROD) {
    return null;
  }

  const coreTools = [
    {
      id: 'debug',
      label: 'Debug Borders',
      icon: Bug,
      isActive: isDebugActive,
      onClick: toggleDebug,
    },
  ];

  // Add theme controls if provided
  if (themeControls) {
    coreTools.unshift({
      id: 'theme',
      label: themeControls.isLightMode ? 'Dark Mode' : 'Light Mode',
      icon: themeControls.isLightMode ? Moon : Sun,
      isActive: false,
      onClick: themeControls.toggleTheme,
    });
  }

  // Future tools (commented out for now, easy to enable later)
  const futureTools = [
    // {
    //   id: 'responsive',
    //   label: 'Responsive Preview',
    //   icon: Smartphone,
    //   isActive: false,
    //   onClick: () => console.log('Responsive tool'),
    // },
    // {
    //   id: 'components',
    //   label: 'Component Inspector',
    //   icon: Palette,
    //   isActive: false,
    //   onClick: () => console.log('Component tool'),
    // },
    // {
    //   id: 'performance',
    //   label: 'Performance Monitor',
    //   icon: Zap,
    //   isActive: false,
    //   onClick: () => console.log('Performance tool'),
    // },
  ];

  const allTools = [...coreTools, ...customTools, ...futureTools];

  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex items-end gap-2" data-debug-ignore>
      {/* Expanded Panel */}
      {isExpanded && (
        <div className="bg-gray-900 text-white rounded-lg shadow-2xl p-3 min-w-[200px] animate-in slide-in-from-right-2 duration-200" data-debug-ignore>
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">DevTools</span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white transition-colors p-1"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {allTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={tool.onClick}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2 rounded text-sm transition-all
                    ${tool.isActive 
                      ? 'bg-blue-600 text-white shadow-sm' 
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                    }
                  `}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tool.label}</span>
                  {tool.isActive && (
                    <div className="ml-auto w-2 h-2 bg-green-400 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Debug Info */}
          {isDebugActive && (
            <div className="mt-3 pt-2 border-t border-gray-700">
              <div className="text-sm font-medium text-gray-300 mb-2">Debug Info</div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>• Hover over elements to see tag names</div>
                <div>• Click any element to copy its info</div>
                <div>• Different colors for different elements</div>
                <div>• Static borders - no flashing</div>
              </div>
            </div>
          )}
          
          {/* Debug Conflicts Section */}
          {isDebugActive && (
            <div className="mt-3 pt-2 border-t border-gray-700">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-300">Debug Conflicts</span>
                  <span className="text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded">
                    {conflicts.length}
                  </span>
                </div>
                <button
                  onClick={triggerConflictCheck}
                  className="text-xs bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 transition-colors"
                >
                  Scan
                </button>
              </div>
              
              {conflicts.length > 0 ? (
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {conflicts.map((conflict, index) => {
                    const getLabelName = (id: string) => {
                      const label = labels.find(l => l.id === id);
                      return label?.label || id;
                    };
                    
                    const getSeverityColor = (severity: string) => {
                      switch (severity) {
                        case 'high': return 'text-red-400';
                        case 'medium': return 'text-yellow-400';
                        case 'low': return 'text-blue-400';
                        default: return 'text-gray-400';
                      }
                    };
                    
                    return (
                      <div key={index} className="bg-gray-800 rounded p-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-xs font-medium ${getSeverityColor(conflict.severity)}`}>
                            {conflict.severity.toUpperCase()}
                          </span>
                          <span className="text-xs text-gray-500">{conflict.type}</span>
                        </div>
                        <div className="text-xs text-gray-300">
                          <div className="truncate">{getLabelName(conflict.id1)}</div>
                          <div className="text-gray-500 my-1">↔</div>
                          <div className="truncate">{getLabelName(conflict.id2)}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-xs text-gray-500 text-center py-2">
                  No conflicts detected
                </div>
              )}
            </div>
          )}
          
          {/* Status Info */}
          <div className="mt-3 pt-2 border-t border-gray-700 text-xs text-gray-400">
            <div>Environment: Development</div>
            {isDebugActive && <div className="text-green-400">Debug Mode Active</div>}
          </div>
        </div>
      )}
      
      {/* Static Debug System with Tooltip */}
      <StaticDebugWithTooltip />

      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
          p-3 rounded-full shadow-lg transition-all duration-200 hover:scale-110
          ${isExpanded 
            ? 'bg-gray-900 text-white' 
            : isDebugActive 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }
        `}
        title={isExpanded ? 'Close DevTools' : 'Open DevTools'}
        data-debug-ignore
      >
        {isExpanded ? (
          <ChevronLeft className="w-5 h-5" />
        ) : (
          <Settings className="w-5 h-5" />
        )}
      </button>
    </div>
  );
}