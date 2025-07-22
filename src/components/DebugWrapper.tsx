import React, { useEffect, useId, useState, useRef } from 'react';
import { useDebug } from '../contexts/DebugContext';
import { useDebugRegistry } from '../contexts/DebugRegistryContext';

interface DebugWrapperProps {
  children: React.ReactNode;
  label?: string;
  color?: string;
  className?: string;
}

const LABEL_WIDTH = 120; // Approximate width of each debug label

export function DebugWrapper({ children, label, color = 'red', className = '' }: DebugWrapperProps) {
  const uniqueId = useId();
  const [labelPosition, setLabelPosition] = useState(0);
  const [hasConflicts, setHasConflicts] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  // In production, always just render children without debug borders
  if (import.meta.env.PROD) {
    return <>{children}</>;
  }

  // In development, use the debug context
  const { debugMode } = useDebug();

  // Try to use debug registry if available
  let debugRegistry = null;
  try {
    debugRegistry = useDebugRegistry();
  } catch {
    // Registry not available, fall back to basic positioning
  }

  // Register with debug registry if available and label exists
  useEffect(() => {
    if (debugRegistry && label && debugMode) {
      const position = debugRegistry.registerLabel(uniqueId, label, color);
      setLabelPosition(position);

      return () => {
        debugRegistry.unregisterLabel(uniqueId);
      };
    }
  }, [debugRegistry, uniqueId, label, color, debugMode]);

  // Register DOM element for conflict detection
  useEffect(() => {
    if (debugRegistry && elementRef.current && debugMode) {
      debugRegistry.registerElement(uniqueId, elementRef.current);
    }
  }, [debugRegistry, uniqueId, debugMode]);

  // Disable automatic conflict checking for now to avoid infinite loops
  // useEffect(() => {
  //   if (debugRegistry && debugMode) {
  //     const conflictsForThisElement = debugRegistry.conflicts.filter(
  //       conflict => conflict.id1 === uniqueId || conflict.id2 === uniqueId
  //     );
  //     setHasConflicts(conflictsForThisElement.length > 0);
  //   }
  // }, [debugRegistry, uniqueId, debugMode]);

  if (!debugMode) {
    return <>{children}</>;
  }

  const colors = {
    red: { outline: 'outline-red-500', bg: 'bg-red-500', text: 'text-red-500' },
    blue: { outline: 'outline-blue-500', bg: 'bg-blue-500', text: 'text-blue-500' },
    green: { outline: 'outline-green-500', bg: 'bg-green-500', text: 'text-green-500' },
    yellow: { outline: 'outline-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-500' },
    purple: { outline: 'outline-purple-500', bg: 'bg-purple-500', text: 'text-purple-500' },
    pink: { outline: 'outline-pink-500', bg: 'bg-pink-500', text: 'text-pink-500' },
    orange: { outline: 'outline-orange-500', bg: 'bg-orange-500', text: 'text-orange-500' },
  };

  // Calculate progressive offset for nested elements
  const getDebugOffset = () => {
    const baseOffset = labelPosition * 3; // 3px per nesting level
    return baseOffset;
  };

  // Get label position with proper stacking
  const getLabelOffset = () => {
    const topOffset = labelPosition * 24; // 24px per label to prevent overlap
    return topOffset;
  };

  // Enhanced styling for conflicted elements
  const getConflictStyling = () => {
    if (!hasConflicts) return '';
    return 'animate-pulse';
  };

  const currentColor = colors[color as keyof typeof colors] || colors.red;
  const offset = getDebugOffset();
  const labelOffset = getLabelOffset();

  // Special handling for viewport debug border
  const isViewportBorder = label === 'Viewport';

  return (
    <div ref={elementRef} className={`relative ${className}`}>
      {isViewportBorder ? (
        // Viewport gets corner indicators only
        <div className="absolute inset-0 pointer-events-none z-[45]">
          <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500"></div>
          {label && (
            <div className="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-red-500 z-[9999]">
              {label}
            </div>
          )}
        </div>
      ) : (
        // Progressive nested borders with proper spacing
        <div 
          className={`absolute pointer-events-none z-[9999] ${getConflictStyling()}`}
          style={{
            top: `${offset}px`,
            left: `${offset}px`,
            right: `${offset}px`,
            bottom: `${offset}px`,
            border: `2px solid ${hasConflicts ? '#dc2626' : 
              color === 'red' ? '#ef4444' :
              color === 'blue' ? '#3b82f6' :
              color === 'green' ? '#22c55e' :
              color === 'yellow' ? '#eab308' :
              color === 'purple' ? '#a855f7' :
              color === 'pink' ? '#ec4899' :
              color === 'orange' ? '#f97316' : '#ef4444'
            }`,
            backgroundColor: hasConflicts ? 'rgba(220, 38, 38, 0.1)' : 'transparent'
          }}
        >
          {label && (
            <div 
              className={`absolute px-2 py-1 text-xs font-bold text-white ${hasConflicts ? 'bg-red-600' : currentColor.bg} z-[9999] ${getConflictStyling()}`}
              style={{ 
                top: `${labelOffset}px`, // Stack labels inside the border area
                left: '4px',
                whiteSpace: 'nowrap'
              }}
            >
              {label}
              {hasConflicts && (
                <span className="ml-1 text-yellow-300">⚠️</span>
              )}
            </div>
          )}
        </div>
      )}
      {children}
    </div>
  );
}