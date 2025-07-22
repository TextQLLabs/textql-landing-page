import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDebug } from '../contexts/DebugContext';

interface ImprovedDebugWrapperProps {
  children: React.ReactNode;
  label?: string;
  color?: string;
  showDimensions?: boolean;
  showMargin?: boolean;
  showPadding?: boolean;
  className?: string;
}

/**
 * Improved debug wrapper that uses modern CSS features and better performance
 * Inspired by browser dev tools and React DevTools
 */
export function ImprovedDebugWrapper({ 
  children, 
  label, 
  color = 'blue',
  showDimensions = false,
  showMargin = false,
  showPadding = false,
  className = '' 
}: ImprovedDebugWrapperProps) {
  const { debugMode } = useDebug();
  const elementRef = useRef<HTMLDivElement>(null);
  const [elementInfo, setElementInfo] = useState<{
    width: number;
    height: number;
    margin: string;
    padding: string;
  }>({ width: 0, height: 0, margin: '', padding: '' });

  // Calculate element info when needed
  const updateElementInfo = useCallback(() => {
    if (!elementRef.current) return;
    
    const rect = elementRef.current.getBoundingClientRect();
    const styles = window.getComputedStyle(elementRef.current);
    
    setElementInfo({
      width: rect.width,
      height: rect.height,
      margin: `${styles.marginTop} ${styles.marginRight} ${styles.marginBottom} ${styles.marginLeft}`,
      padding: `${styles.paddingTop} ${styles.paddingRight} ${styles.paddingBottom} ${styles.paddingLeft}`,
    });
  }, []);

  useEffect(() => {
    if (debugMode && (showDimensions || showMargin || showPadding)) {
      updateElementInfo();
      
      const resizeObserver = new ResizeObserver(updateElementInfo);
      if (elementRef.current) {
        resizeObserver.observe(elementRef.current);
      }
      
      return () => resizeObserver.disconnect();
    }
  }, [debugMode, showDimensions, showMargin, showPadding, updateElementInfo]);

  const colors = {
    blue: { 
      border: '#3b82f6', 
      bg: '#3b82f6', 
      text: '#ffffff',
      margin: '#fbbf24',
      padding: '#34d399'
    },
    red: { 
      border: '#ef4444', 
      bg: '#ef4444', 
      text: '#ffffff',
      margin: '#fbbf24',
      padding: '#34d399'
    },
    green: { 
      border: '#22c55e', 
      bg: '#22c55e', 
      text: '#ffffff',
      margin: '#fbbf24',
      padding: '#34d399'
    },
    yellow: { 
      border: '#eab308', 
      bg: '#eab308', 
      text: '#000000',
      margin: '#fbbf24',
      padding: '#34d399'
    },
    purple: { 
      border: '#a855f7', 
      bg: '#a855f7', 
      text: '#ffffff',
      margin: '#fbbf24',
      padding: '#34d399'
    },
    pink: { 
      border: '#ec4899', 
      bg: '#ec4899', 
      text: '#ffffff',
      margin: '#fbbf24',
      padding: '#34d399'
    },
    orange: { 
      border: '#f97316', 
      bg: '#f97316', 
      text: '#ffffff',
      margin: '#fbbf24',
      padding: '#34d399'
    },
  };

  const colorScheme = colors[color as keyof typeof colors] || colors.blue;

  // Don't render debug borders in production or when debug mode is off
  if (import.meta.env.PROD || !debugMode) {
    return <>{children}</>;
  }

  return (
    <div 
      ref={elementRef}
      className={`relative ${className}`}
      style={{
        // Use CSS custom properties for better performance
        '--debug-border-color': colorScheme.border,
        '--debug-bg-color': colorScheme.bg,
        '--debug-text-color': colorScheme.text,
        '--debug-margin-color': colorScheme.margin,
        '--debug-padding-color': colorScheme.padding,
        
        // Modern CSS outline approach
        outline: `2px solid var(--debug-border-color)`,
        outlineOffset: '0px',
        
        // Box shadow for margin/padding visualization
        ...(showMargin && {
          boxShadow: `0 0 0 2px var(--debug-margin-color)`,
        }),
        
        // Position for labels
        position: 'relative',
      }}
    >
      {/* Main label */}
      {label && (
        <div
          className="absolute pointer-events-none z-[100] whitespace-nowrap"
          style={{
            backgroundColor: colorScheme.bg,
            color: colorScheme.text,
            fontSize: '11px',
            fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
            padding: '2px 6px',
            borderRadius: '3px',
            top: '-20px',
            left: '0px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          {label}
        </div>
      )}
      
      {/* Dimensions info */}
      {showDimensions && (
        <div
          className="absolute pointer-events-none z-[100] whitespace-nowrap"
          style={{
            backgroundColor: '#1f2937',
            color: '#ffffff',
            fontSize: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
            padding: '2px 6px',
            borderRadius: '3px',
            bottom: '-18px',
            right: '0px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          {Math.round(elementInfo.width)}×{Math.round(elementInfo.height)}
        </div>
      )}
      
      {/* Margin info */}
      {showMargin && (
        <div
          className="absolute pointer-events-none z-[100] whitespace-nowrap"
          style={{
            backgroundColor: colorScheme.margin,
            color: '#000000',
            fontSize: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
            padding: '2px 6px',
            borderRadius: '3px',
            top: '-18px',
            right: '0px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          M: {elementInfo.margin}
        </div>
      )}
      
      {/* Padding info */}
      {showPadding && (
        <div
          className="absolute pointer-events-none z-[100] whitespace-nowrap"
          style={{
            backgroundColor: colorScheme.padding,
            color: '#000000',
            fontSize: '10px',
            fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
            padding: '2px 6px',
            borderRadius: '3px',
            bottom: '-18px',
            left: '0px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        >
          P: {elementInfo.padding}
        </div>
      )}
      
      {children}
    </div>
  );
}

/**
 * Global debug mode that applies universal CSS rules
 * More performant than individual wrappers for large DOMs
 */
export function GlobalDebugMode() {
  const { debugMode } = useDebug();
  
  useEffect(() => {
    if (debugMode) {
      // Create a style element with advanced CSS rules
      const style = document.createElement('style');
      style.id = 'global-debug-borders';
      style.textContent = `
        /* Universal debug borders */
        .debug-global-active * {
          outline: 1px solid rgba(255, 0, 0, 0.4) !important;
          outline-offset: 0px !important;
        }
        
        /* Different colors for different element types */
        .debug-global-active div {
          outline-color: rgba(59, 130, 246, 0.6) !important; /* Blue for divs */
        }
        
        .debug-global-active section {
          outline-color: rgba(34, 197, 94, 0.6) !important; /* Green for sections */
        }
        
        .debug-global-active header, .debug-global-active footer {
          outline-color: rgba(168, 85, 247, 0.6) !important; /* Purple for header/footer */
        }
        
        .debug-global-active nav {
          outline-color: rgba(234, 179, 8, 0.6) !important; /* Yellow for nav */
        }
        
        .debug-global-active main {
          outline-color: rgba(236, 72, 153, 0.6) !important; /* Pink for main */
        }
        
        .debug-global-active article {
          outline-color: rgba(249, 115, 22, 0.6) !important; /* Orange for articles */
        }
        
        /* Interactive elements */
        .debug-global-active button, .debug-global-active a {
          outline-color: rgba(239, 68, 68, 0.8) !important; /* Red for interactive */
          outline-width: 2px !important;
        }
        
        /* Form elements */
        .debug-global-active input, .debug-global-active textarea, .debug-global-active select {
          outline-color: rgba(34, 197, 94, 0.8) !important; /* Green for forms */
          outline-width: 2px !important;
        }
        
        /* Flexbox containers */
        .debug-global-active [class*="flex"] {
          background-color: rgba(59, 130, 246, 0.05) !important;
        }
        
        /* Grid containers */
        .debug-global-active [class*="grid"] {
          background-color: rgba(34, 197, 94, 0.05) !important;
        }
        
        /* Hover effect for better inspection */
        .debug-global-active *:hover {
          outline-width: 3px !important;
          outline-offset: 1px !important;
          z-index: 1000 !important;
          position: relative !important;
        }
      `;
      
      document.head.appendChild(style);
      document.body.classList.add('debug-global-active');
      
      return () => {
        document.getElementById('global-debug-borders')?.remove();
        document.body.classList.remove('debug-global-active');
      };
    }
  }, [debugMode]);
  
  return null;
}

/**
 * Component tree visualizer - shows component hierarchy
 */
export function ComponentTreeDebugger({ 
  children, 
  componentName,
  level = 0 
}: { 
  children: React.ReactNode;
  componentName: string;
  level?: number;
}) {
  const { debugMode } = useDebug();
  
  if (import.meta.env.PROD || !debugMode) {
    return <>{children}</>;
  }

  const colors = [
    '#3b82f6', // blue
    '#22c55e', // green
    '#eab308', // yellow
    '#a855f7', // purple
    '#ec4899', // pink
    '#f97316', // orange
  ];
  
  const color = colors[level % colors.length];
  
  return (
    <div 
      className="relative"
      style={{
        outline: `${Math.max(1, 3 - level)}px solid ${color}`,
        outlineOffset: `${level * 2}px`,
      }}
    >
      <div
        className="absolute pointer-events-none z-[100] whitespace-nowrap"
        style={{
          backgroundColor: color,
          color: '#ffffff',
          fontSize: '10px',
          fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
          padding: '2px 6px',
          borderRadius: '3px',
          top: `${-16 - (level * 20)}px`,
          left: `${level * 10}px`,
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        }}
      >
        {componentName} (L{level})
      </div>
      {children}
    </div>
  );
}