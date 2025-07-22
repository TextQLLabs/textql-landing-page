import React, { useEffect, useState } from 'react';
import { useDebug } from '../contexts/DebugContext';
import styles from '../styles/debug.module.css';

/**
 * Simple, clean debug system that just shows tag names on hover
 * No complex modes, no inspector madness - just one toggle
 */
export function SimpleDebugSystem() {
  const { debugMode } = useDebug();
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!debugMode) {
      // Clean up when debug mode is off
      setHoveredElement(null);
      setTooltip(null);
      return;
    }

    // Apply simple debug active class to body
    document.body.classList.add(styles.simpleDebugActive);

    // Mouse move handler to show tooltips
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target && target !== hoveredElement) {
        setHoveredElement(target);
        
        // Get element info
        const tagName = target.tagName.toLowerCase();
        const className = typeof target.className === 'string' ? target.className : '';
        const id = target.id || '';
        
        // Build tooltip text - simplified for better visibility
        let tooltipText = tagName;
        if (id) tooltipText += `#${id}`;
        if (className) {
          const classes = className.split(' ').filter(c => c && c.length > 0);
          if (classes.length > 0) {
            tooltipText += `.${classes.slice(0, 2).join('.')}`;
            if (classes.length > 2) tooltipText += '...';
          }
        }
        
        // Fallback if no meaningful content
        if (!tooltipText || tooltipText.length === 0) {
          tooltipText = tagName || 'element';
        }
        
        // Position tooltip
        setTooltip({
          x: e.clientX + 10,
          y: e.clientY - 30,
          text: tooltipText,
        });
        
      }
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setHoveredElement(null);
      setTooltip(null);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.body.classList.remove(styles.simpleDebugActive);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [debugMode, hoveredElement]);

  if (import.meta.env.PROD || !debugMode) {
    return null;
  }

  return (
    <>
      {/* Tooltip */}
      {tooltip && (
        <div
          className={styles.debugTooltip}
          style={{
            left: tooltip.x,
            top: tooltip.y,
            transform: 'translateY(-100%)',
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}

/**
 * Simple wrapper for individual components if needed
 */
interface SimpleDebugProps {
  children: React.ReactNode;
  label?: string;
}

export function SimpleDebug({ children, label }: SimpleDebugProps) {
  const { debugMode } = useDebug();
  
  if (import.meta.env.PROD || !debugMode) {
    return <>{children}</>;
  }

  return (
    <div 
      className="relative"
      style={{
        outline: '2px solid #3b82f6',
        outlineOffset: '0px',
      }}
      data-debug-label={label}
    >
      {label && (
        <div
          className="absolute -top-5 left-0 bg-blue-500 text-white px-2 py-1 text-xs font-mono rounded z-[100]"
          style={{ fontSize: '11px' }}
        >
          {label}
        </div>
      )}
      {children}
    </div>
  );
}