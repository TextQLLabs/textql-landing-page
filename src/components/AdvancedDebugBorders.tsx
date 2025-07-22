import React, { useEffect, useRef, useState } from 'react';
import { useDebug } from '../contexts/DebugContext';

interface AdvancedDebugBordersProps {
  children: React.ReactNode;
  label?: string;
  color?: string;
  showDimensions?: boolean;
  className?: string;
}

// Modern debug borders inspired by browser dev tools
export function AdvancedDebugBorders({ 
  children, 
  label, 
  color = 'blue', 
  showDimensions = false,
  className = '' 
}: AdvancedDebugBordersProps) {
  const { debugMode } = useDebug();
  const elementRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  
  // Update dimensions when debug mode changes
  useEffect(() => {
    if (debugMode && elementRef.current && showDimensions) {
      const updateDimensions = () => {
        const rect = elementRef.current?.getBoundingClientRect();
        if (rect) {
          setDimensions({ width: rect.width, height: rect.height });
        }
      };
      
      updateDimensions();
      window.addEventListener('resize', updateDimensions);
      
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, [debugMode, showDimensions]);

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

  // Don't render debug borders in production or when debug mode is off
  if (import.meta.env.PROD || !debugMode) {
    return <>{children}</>;
  }

  return (
    <div 
      ref={elementRef}
      className={`relative ${className}`}
      style={{
        // Use outline instead of border to avoid layout shifts
        outline: `2px solid ${borderColor}`,
        outlineOffset: '0px',
      }}
    >
      {/* Label overlay - positioned like browser dev tools */}
      {label && (
        <div
          className="absolute pointer-events-none z-[100] px-2 py-1 text-xs font-medium text-white rounded-sm shadow-sm"
          style={{
            backgroundColor: borderColor,
            top: '-24px',
            left: '0px',
            whiteSpace: 'nowrap',
            fontSize: '11px',
            fontFamily: 'monospace',
          }}
        >
          {label}
          {showDimensions && (
            <span className="ml-2 opacity-90">
              {Math.round(dimensions.width)}×{Math.round(dimensions.height)}
            </span>
          )}
        </div>
      )}
      
      {/* Dimensions tooltip - shows on hover like browser dev tools */}
      {showDimensions && (
        <div
          className="absolute pointer-events-none z-[100] px-2 py-1 text-xs text-white bg-gray-800 rounded shadow-sm opacity-0 hover:opacity-100 transition-opacity"
          style={{
            bottom: '-24px',
            right: '0px',
            fontSize: '11px',
            fontFamily: 'monospace',
          }}
        >
          {Math.round(dimensions.width)}px × {Math.round(dimensions.height)}px
        </div>
      )}
      
      {children}
    </div>
  );
}

// Simple CSS-based debug borders for maximum performance
export function SimpleCSSDebugBorders() {
  const { debugMode } = useDebug();
  
  useEffect(() => {
    if (debugMode) {
      // Inject CSS rule for universal debug borders
      const style = document.createElement('style');
      style.id = 'debug-borders-css';
      style.textContent = `
        .debug-active * {
          outline: 1px solid rgba(255, 0, 0, 0.3) !important;
          outline-offset: 0px !important;
        }
        .debug-active *:nth-child(odd) {
          outline-color: rgba(0, 255, 0, 0.3) !important;
        }
        .debug-active *:nth-child(even) {
          outline-color: rgba(0, 0, 255, 0.3) !important;
        }
      `;
      document.head.appendChild(style);
      document.body.classList.add('debug-active');
      
      return () => {
        document.getElementById('debug-borders-css')?.remove();
        document.body.classList.remove('debug-active');
      };
    }
  }, [debugMode]);
  
  return null;
}

// Component boundary highlighter - like React DevTools
export function ComponentBoundaryHighlighter({ 
  children, 
  componentName,
  color = 'blue' 
}: { 
  children: React.ReactNode;
  componentName: string;
  color?: string;
}) {
  const { debugMode } = useDebug();
  
  if (import.meta.env.PROD || !debugMode) {
    return <>{children}</>;
  }

  const colors = {
    blue: 'border-blue-500 bg-blue-500/10',
    red: 'border-red-500 bg-red-500/10',
    green: 'border-green-500 bg-green-500/10',
    yellow: 'border-yellow-500 bg-yellow-500/10',
    purple: 'border-purple-500 bg-purple-500/10',
    pink: 'border-pink-500 bg-pink-500/10',
    orange: 'border-orange-500 bg-orange-500/10',
  };

  const colorClass = colors[color as keyof typeof colors] || colors.blue;

  return (
    <div className={`relative border-2 ${colorClass}`}>
      {/* Component name label */}
      <div className={`absolute -top-6 left-0 px-2 py-1 text-xs font-mono text-white bg-${color}-500 rounded-sm z-[100]`}>
        {componentName}
      </div>
      {children}
    </div>
  );
}