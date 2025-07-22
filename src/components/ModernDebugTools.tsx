import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDebug } from '../contexts/DebugContext';

/**
 * Modern debug tools inspired by browser dev tools, React DevTools, and Replit
 * Combines multiple debugging approaches for different use cases
 */

interface ModernDebugToolsProps {
  mode?: 'outline' | 'highlight' | 'inspector' | 'performance';
}

export function ModernDebugTools({ mode = 'outline' }: ModernDebugToolsProps) {
  const { debugMode } = useDebug();
  const [inspectorMode, setInspectorMode] = useState(false);
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [elementInfo, setElementInfo] = useState<{
    tagName: string;
    className: string;
    dimensions: { width: number; height: number };
    position: { x: number; y: number };
  } | null>(null);

  // Global click handler for inspector mode
  const handleInspectorClick = useCallback((e: MouseEvent) => {
    if (!inspectorMode) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    const target = e.target as Element;
    if (target) {
      const rect = target.getBoundingClientRect();
      const styles = window.getComputedStyle(target);
      
      console.log('🔍 Element Inspector:', {
        element: target,
        tagName: target.tagName,
        className: target.className,
        id: target.id,
        dimensions: {
          width: rect.width,
          height: rect.height,
        },
        position: {
          x: rect.left,
          y: rect.top,
        },
        styles: {
          display: styles.display,
          position: styles.position,
          zIndex: styles.zIndex,
          background: styles.background,
          border: styles.border,
          margin: styles.margin,
          padding: styles.padding,
        },
        content: target.textContent?.slice(0, 100) + '...',
      });
    }
  }, [inspectorMode]);

  // Mouse move handler for hover effects
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!inspectorMode) return;
    
    const target = e.target as Element;
    if (target && target !== hoveredElement) {
      setHoveredElement(target);
      
      const rect = target.getBoundingClientRect();
      setElementInfo({
        tagName: target.tagName,
        className: target.className,
        dimensions: {
          width: rect.width,
          height: rect.height,
        },
        position: {
          x: rect.left,
          y: rect.top,
        },
      });
    }
  }, [inspectorMode, hoveredElement]);

  // Set up event listeners
  useEffect(() => {
    if (debugMode && inspectorMode) {
      document.addEventListener('click', handleInspectorClick, true);
      document.addEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'crosshair';
      
      return () => {
        document.removeEventListener('click', handleInspectorClick, true);
        document.removeEventListener('mousemove', handleMouseMove);
        document.body.style.cursor = '';
      };
    }
  }, [debugMode, inspectorMode, handleInspectorClick, handleMouseMove]);

  // Apply global debug styles based on mode
  useEffect(() => {
    if (!debugMode) return;
    
    const style = document.createElement('style');
    style.id = 'modern-debug-tools';
    
    let css = '';
    
    switch (mode) {
      case 'outline':
        css = `
          .debug-outline-active * {
            outline: 1px solid rgba(59, 130, 246, 0.6) !important;
            outline-offset: 0px !important;
          }
          
          .debug-outline-active div { outline-color: rgba(59, 130, 246, 0.6) !important; }
          .debug-outline-active section { outline-color: rgba(34, 197, 94, 0.6) !important; }
          .debug-outline-active header, .debug-outline-active footer { outline-color: rgba(168, 85, 247, 0.6) !important; }
          .debug-outline-active nav { outline-color: rgba(234, 179, 8, 0.6) !important; }
          .debug-outline-active main { outline-color: rgba(236, 72, 153, 0.6) !important; }
          .debug-outline-active article { outline-color: rgba(249, 115, 22, 0.6) !important; }
          .debug-outline-active button, .debug-outline-active a { outline-color: rgba(239, 68, 68, 0.8) !important; outline-width: 2px !important; }
          .debug-outline-active input, .debug-outline-active textarea, .debug-outline-active select { outline-color: rgba(34, 197, 94, 0.8) !important; outline-width: 2px !important; }
        `;
        break;
        
      case 'highlight':
        css = `
          .debug-highlight-active * {
            background-color: rgba(59, 130, 246, 0.05) !important;
            border: 1px solid rgba(59, 130, 246, 0.2) !important;
          }
          
          .debug-highlight-active div { background-color: rgba(59, 130, 246, 0.05) !important; }
          .debug-highlight-active section { background-color: rgba(34, 197, 94, 0.05) !important; }
          .debug-highlight-active header, .debug-highlight-active footer { background-color: rgba(168, 85, 247, 0.05) !important; }
          .debug-highlight-active nav { background-color: rgba(234, 179, 8, 0.05) !important; }
          .debug-highlight-active main { background-color: rgba(236, 72, 153, 0.05) !important; }
          .debug-highlight-active article { background-color: rgba(249, 115, 22, 0.05) !important; }
        `;
        break;
        
      case 'inspector':
        css = `
          .debug-inspector-active * {
            position: relative !important;
          }
          
          .debug-inspector-active *:hover {
            outline: 2px solid #ff0000 !important;
            outline-offset: 2px !important;
            z-index: 10000 !important;
            cursor: crosshair !important;
          }
          
          .debug-inspector-active *:hover::before {
            content: attr(data-debug-info);
            position: absolute;
            top: -30px;
            left: 0;
            background: #000;
            color: #fff;
            padding: 4px 8px;
            font-size: 12px;
            font-family: monospace;
            border-radius: 4px;
            z-index: 10001;
            white-space: nowrap;
            pointer-events: none;
          }
        `;
        break;
        
      case 'performance':
        css = `
          .debug-performance-active * {
            animation: debug-performance-pulse 2s infinite;
          }
          
          @keyframes debug-performance-pulse {
            0% { outline: 1px solid rgba(59, 130, 246, 0.3); }
            50% { outline: 1px solid rgba(59, 130, 246, 0.8); }
            100% { outline: 1px solid rgba(59, 130, 246, 0.3); }
          }
        `;
        break;
    }
    
    style.textContent = css;
    document.head.appendChild(style);
    document.body.classList.add(`debug-${mode}-active`);
    
    return () => {
      document.getElementById('modern-debug-tools')?.remove();
      document.body.classList.remove(`debug-${mode}-active`);
    };
  }, [debugMode, mode]);

  if (import.meta.env.PROD || !debugMode) {
    return null;
  }

  return (
    <>
      {/* Inspector overlay */}
      {inspectorMode && hoveredElement && elementInfo && (
        <div
          className="fixed pointer-events-none z-[10000] bg-black text-white p-2 rounded shadow-lg text-xs font-mono"
          style={{
            left: elementInfo.position.x + 10,
            top: elementInfo.position.y - 50,
          }}
        >
          <div>{elementInfo.tagName.toLowerCase()}</div>
          {elementInfo.className && (
            <div className="text-blue-300">.{elementInfo.className}</div>
          )}
          <div className="text-gray-400">
            {Math.round(elementInfo.dimensions.width)}×{Math.round(elementInfo.dimensions.height)}
          </div>
        </div>
      )}
      
      {/* Debug controls */}
      <div className="fixed bottom-20 right-4 z-[10000] bg-gray-900 text-white p-2 rounded shadow-lg">
        <div className="text-xs font-mono mb-2">Debug Mode: {mode}</div>
        <button
          onClick={() => setInspectorMode(!inspectorMode)}
          className={`text-xs px-2 py-1 rounded ${
            inspectorMode 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Inspector {inspectorMode ? 'ON' : 'OFF'}
        </button>
      </div>
    </>
  );
}

/**
 * Simple wrapper for component-specific debugging
 */
interface QuickDebugProps {
  children: React.ReactNode;
  label?: string;
  color?: string;
}

export function QuickDebug({ children, label, color = 'blue' }: QuickDebugProps) {
  const { debugMode } = useDebug();
  
  if (import.meta.env.PROD || !debugMode) {
    return <>{children}</>;
  }

  const colors = {
    blue: '#3b82f6',
    red: '#ef4444',
    green: '#22c55e',
    yellow: '#eab308',
    purple: '#a855f7',
    pink: '#ec4899',
    orange: '#f97316',
  };

  const borderColor = colors[color as keyof typeof colors] || colors.blue;

  return (
    <div 
      className="relative"
      style={{
        outline: `2px solid ${borderColor}`,
        outlineOffset: '0px',
      }}
    >
      {label && (
        <div
          className="absolute -top-6 left-0 px-2 py-1 text-xs font-mono text-white rounded z-[100]"
          style={{
            backgroundColor: borderColor,
            fontSize: '11px',
          }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}

/**
 * Layout debugger - shows flexbox and grid layouts
 */
export function LayoutDebugger() {
  const { debugMode } = useDebug();
  
  useEffect(() => {
    if (debugMode) {
      const style = document.createElement('style');
      style.id = 'layout-debugger';
      style.textContent = `
        .debug-layout-active [class*="flex"] {
          outline: 2px dashed #3b82f6 !important;
          outline-offset: 2px !important;
          background-color: rgba(59, 130, 246, 0.05) !important;
        }
        
        .debug-layout-active [class*="grid"] {
          outline: 2px dashed #22c55e !important;
          outline-offset: 2px !important;
          background-color: rgba(34, 197, 94, 0.05) !important;
        }
        
        .debug-layout-active [class*="flex"] > * {
          outline: 1px solid #3b82f6 !important;
          outline-offset: 1px !important;
        }
        
        .debug-layout-active [class*="grid"] > * {
          outline: 1px solid #22c55e !important;
          outline-offset: 1px !important;
        }
        
        .debug-layout-active [class*="flex"]::before {
          content: "FLEX";
          position: absolute;
          top: -20px;
          left: 0;
          background: #3b82f6;
          color: white;
          padding: 2px 6px;
          font-size: 10px;
          font-family: monospace;
          border-radius: 2px;
          z-index: 1000;
        }
        
        .debug-layout-active [class*="grid"]::before {
          content: "GRID";
          position: absolute;
          top: -20px;
          left: 0;
          background: #22c55e;
          color: white;
          padding: 2px 6px;
          font-size: 10px;
          font-family: monospace;
          border-radius: 2px;
          z-index: 1000;
        }
      `;
      
      document.head.appendChild(style);
      document.body.classList.add('debug-layout-active');
      
      return () => {
        document.getElementById('layout-debugger')?.remove();
        document.body.classList.remove('debug-layout-active');
      };
    }
  }, [debugMode]);
  
  return null;
}