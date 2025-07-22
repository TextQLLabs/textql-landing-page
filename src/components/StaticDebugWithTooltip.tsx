import React, { useEffect, useState } from 'react';
import { useDebug } from '../contexts/DebugContext';
import styles from '../styles/debug.module.css';

/**
 * Static debug system with stable tooltip that doesn't cause flashing
 * Click to copy element info to clipboard
 */
export function StaticDebugWithTooltip() {
  const { debugMode } = useDebug();
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    text: string;
    visible: boolean;
  }>({ x: 0, y: 0, text: '', visible: false });

  useEffect(() => {
    if (!debugMode) {
      setTooltip(prev => ({ ...prev, visible: false }));
      return;
    }

    // Apply debug active class to body
    document.body.classList.add(styles.debugActive);

    // Stable mouse move handler - only updates position, doesn't cause re-renders
    let currentTarget: Element | null = null;
    
    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Skip debug tools
      if (target.closest('[data-debug-ignore]') || target.closest(`.${styles.debugTooltipContainer}`)) {
        if (tooltip.visible) {
          setTooltip(prev => ({ ...prev, visible: false }));
        }
        return;
      }
      
      // Update position for existing tooltip
      if (currentTarget === target && tooltip.visible) {
        setTooltip(prev => ({ 
          ...prev, 
          x: e.clientX + 15, 
          y: e.clientY - 35 
        }));
        return;
      }
      
      // New target
      if (target && target !== currentTarget) {
        currentTarget = target;
        
        const tagName = target.tagName.toLowerCase();
        const className = target.className;
        const id = target.id;
        
        // Build enhanced element info
        let text = tagName;
        if (id) text += `#${id}`;
        if (className && typeof className === 'string' && className.trim()) {
          const classes = className.trim().split(/\s+/).filter(c => c && c.length > 0).slice(0, 3);
          if (classes.length > 0) {
            text += `.${classes.join('.')}`;
          }
        }
        
        // Add text content if available
        const textContent = target.textContent?.trim().slice(0, 30) || '';
        if (textContent) {
          text += ` "${textContent}${textContent.length > 30 ? '...' : ''}"`;
        }
        
        setTooltip({
          x: e.clientX + 15,
          y: e.clientY - 35,
          text,
          visible: true
        });
      }
    };

    // Click handler to copy element info
    const handleClick = async (e: MouseEvent) => {
      const target = e.target as Element;
      
      // Skip debug tools
      if (target.closest('[data-debug-ignore]') || target.closest(`.${styles.debugTooltipContainer}`)) {
        return;
      }
      
      e.preventDefault();
      e.stopPropagation();
      
      const tagName = target.tagName.toLowerCase();
      const className = target.className;
      const id = target.id;
      
      // Build comprehensive element info
      const textContent = target.textContent?.trim().slice(0, 50) || '';
      
      // Build DOM path
      const buildPath = (element: Element): string => {
        const path = [];
        let current = element;
        
        while (current && current !== document.body) {
          let selector = current.tagName.toLowerCase();
          
          if (current.id) {
            selector += `#${current.id}`;
          } else if (current.className && typeof current.className === 'string') {
            const classes = current.className.trim().split(/\s+/).slice(0, 2);
            if (classes.length > 0) {
              selector += `.${classes.join('.')}`;
            }
          }
          
          // Add position if there are siblings with same tag
          const siblings = Array.from(current.parentElement?.children || []);
          const sameTagSiblings = siblings.filter(s => s.tagName === current.tagName);
          if (sameTagSiblings.length > 1) {
            const index = sameTagSiblings.indexOf(current) + 1;
            selector += `[${index}]`;
          }
          
          path.unshift(selector);
          current = current.parentElement!;
        }
        
        return path.join(' > ');
      };
      
      // Get position among siblings
      const siblings = Array.from(target.parentElement?.children || []);
      const position = siblings.indexOf(target) + 1;
      const totalSiblings = siblings.length;
      
      // Build CSS selector
      const buildCssSelector = (element: Element): string => {
        const path = [];
        let current = element;
        
        while (current && current !== document.body) {
          let selector = current.tagName.toLowerCase();
          
          if (current.id) {
            selector += `#${current.id}`;
            path.unshift(selector);
            break; // ID is unique, no need to go further
          } else if (current.className && typeof current.className === 'string') {
            const classes = current.className.trim().split(/\s+/).slice(0, 2);
            if (classes.length > 0) {
              selector += `.${classes.join('.')}`;
            }
          }
          
          // Add nth-child if needed
          const siblings = Array.from(current.parentElement?.children || []);
          const sameTagSiblings = siblings.filter(s => s.tagName === current.tagName);
          if (sameTagSiblings.length > 1) {
            const index = sameTagSiblings.indexOf(current) + 1;
            selector += `:nth-child(${index})`;
          }
          
          path.unshift(selector);
          current = current.parentElement!;
        }
        
        return path.join(' > ');
      };
      
      // Get key attributes
      const getKeyAttributes = (element: Element): string => {
        const attrs = [];
        if (element.getAttribute('src')) attrs.push(`src="${element.getAttribute('src')}"`);
        if (element.getAttribute('href')) attrs.push(`href="${element.getAttribute('href')}"`);
        if (element.getAttribute('alt')) attrs.push(`alt="${element.getAttribute('alt')}"`);
        if (element.getAttribute('title')) attrs.push(`title="${element.getAttribute('title')}"`);
        if (element.getAttribute('value')) attrs.push(`value="${element.getAttribute('value')}"`);
        if (element.getAttribute('placeholder')) attrs.push(`placeholder="${element.getAttribute('placeholder')}"`);
        return attrs.length > 0 ? ` ${attrs.join(' ')}` : '';
      };
      
      // Build concise copy text
      let copyText = `${tagName}${id ? `#${id}` : ''}${className && typeof className === 'string' && className.trim() ? `.${className.trim().split(/\s+/).slice(0, 2).join('.')}` : ''}${getKeyAttributes(target)}
${textContent ? `"${textContent}${textContent.length > 50 ? '...' : ''}"` : ''}
${buildPath(target)}
${window.location.pathname}`;
      
      // Copy to clipboard
      try {
        await navigator.clipboard.writeText(copyText);
        
        // Show copy confirmation
        setTooltip(prev => ({ 
          ...prev, 
          text: 'Copied to clipboard! ✓',
          x: e.clientX + 15,
          y: e.clientY - 35
        }));
        
        // Reset tooltip after 1 second
        setTimeout(() => {
          if (currentTarget) {
            const tagName = currentTarget.tagName.toLowerCase();
            const className = currentTarget.className;
            const id = currentTarget.id;
            
            let text = tagName;
            if (id) text += `#${id}`;
            if (className && typeof className === 'string' && className.trim()) {
              const classes = className.trim().split(/\s+/).filter(c => c && c.length > 0).slice(0, 3);
              if (classes.length > 0) {
                text += `.${classes.join('.')}`;
              }
            }
            
            setTooltip(prev => ({ ...prev, text }));
          }
        }, 1000);
      } catch (err) {
        console.log('Failed to copy to clipboard:', err);
      }
    };

    // Mouse leave handler
    const handleMouseLeave = () => {
      setTooltip(prev => ({ ...prev, visible: false }));
      currentTarget = null;
    };

    // ESC key handler to exit debug mode
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Toggle debug mode off
        if (debugMode) {
          document.dispatchEvent(new CustomEvent('toggleDebugMode'));
        }
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('click', handleClick, true);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.classList.remove(styles.debugActive);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [debugMode, tooltip.visible]);

  if (import.meta.env.PROD || !debugMode) {
    return null;
  }

  return (
    <>
      {/* Stable tooltip that doesn't cause re-renders */}
      {tooltip.visible && (
        <div
          className={`${styles.debugTooltip} ${styles.debugTooltipContainer}`}
          style={{
            left: `${tooltip.x}px`,
            top: `${tooltip.y}px`
          }}
        >
          {tooltip.text}
        </div>
      )}
    </>
  );
}