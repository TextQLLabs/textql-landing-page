import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react';

interface DebugElement {
  id: string;
  label: string;
  color: string;
  position: number;
  element?: HTMLElement;
  bounds?: DOMRect;
  zIndex?: number;
  isFixed?: boolean;
  conflicts?: string[];
}

interface DebugRegistryContextType {
  registerLabel: (id: string, label: string, color: string) => number;
  unregisterLabel: (id: string) => void;
  registerElement: (id: string, element: HTMLElement) => void;
  triggerConflictCheck: () => void;
  labels: DebugElement[];
  conflicts: Array<{ id1: string; id2: string; type: string; severity: 'low' | 'medium' | 'high' }>;
}

const DebugRegistryContext = createContext<DebugRegistryContextType | null>(null);

export function DebugRegistryProvider({ children }: { children: React.ReactNode }) {
  const [labels, setLabels] = useState<DebugElement[]>([]);
  const [conflicts, setConflicts] = useState<Array<{ id1: string; id2: string; type: string; severity: 'low' | 'medium' | 'high' }>>([]);
  const conflictCheckRef = useRef<number>();

  // Function to detect conflicts between elements
  const detectConflicts = useCallback(() => {
    setLabels(prev => {
      const elementsWithBounds = prev.filter(el => el.element && el.bounds);
      const newConflicts: Array<{ id1: string; id2: string; type: string; severity: 'low' | 'medium' | 'high' }> = [];

      for (let i = 0; i < elementsWithBounds.length; i++) {
        for (let j = i + 1; j < elementsWithBounds.length; j++) {
          const el1 = elementsWithBounds[i];
          const el2 = elementsWithBounds[j];
          
          if (!el1.bounds || !el2.bounds) continue;

          // Check for overlap
          const overlap = !(
            el1.bounds.right < el2.bounds.left ||
            el2.bounds.right < el1.bounds.left ||
            el1.bounds.bottom < el2.bounds.top ||
            el2.bounds.bottom < el1.bounds.top
          );

          if (overlap) {
            // Calculate overlap area to determine severity
            const overlapWidth = Math.min(el1.bounds.right, el2.bounds.right) - Math.max(el1.bounds.left, el2.bounds.left);
            const overlapHeight = Math.min(el1.bounds.bottom, el2.bounds.bottom) - Math.max(el1.bounds.top, el2.bounds.top);
            const overlapArea = overlapWidth * overlapHeight;
            const el1Area = el1.bounds.width * el1.bounds.height;
            const el2Area = el2.bounds.width * el2.bounds.height;
            const overlapPercentage = overlapArea / Math.min(el1Area, el2Area);

            let severity: 'low' | 'medium' | 'high' = 'low';
            let conflictType = 'overlap';

            if (overlapPercentage > 0.7) {
              severity = 'high';
              conflictType = 'major-overlap';
            } else if (overlapPercentage > 0.3) {
              severity = 'medium';
              conflictType = 'significant-overlap';
            }

            // Check for z-index conflicts
            if (el1.isFixed && el2.isFixed) {
              conflictType = 'fixed-position-conflict';
              severity = 'high';
            }

            newConflicts.push({
              id1: el1.id,
              id2: el2.id,
              type: conflictType,
              severity
            });
          }
        }
      }

      // Only update conflicts if they actually changed
      setConflicts(prevConflicts => {
        const conflictsChanged = JSON.stringify(prevConflicts) !== JSON.stringify(newConflicts);
        if (conflictsChanged) {
          // Log conflicts for debugging
          if (newConflicts.length > 0) {
            console.warn('Debug Border Conflicts Detected:', newConflicts);
          }
          return newConflicts;
        }
        return prevConflicts;
      });

      return prev; // Don't modify labels
    });
  }, []);

  // Update element bounds when requested
  const updateBounds = useCallback(() => {
    setLabels(prev => prev.map(el => {
      if (el.element) {
        const bounds = el.element.getBoundingClientRect();
        const computedStyle = window.getComputedStyle(el.element);
        const zIndex = parseInt(computedStyle.zIndex || '0');
        const isFixed = computedStyle.position === 'fixed';
        
        return {
          ...el,
          bounds,
          zIndex,
          isFixed
        };
      }
      return el;
    }));
  }, []);

  // Manual conflict detection trigger
  const triggerConflictCheck = useCallback(() => {
    updateBounds();
    detectConflicts();
  }, [updateBounds, detectConflicts]);

  // Disable automatic conflict detection for now
  // useEffect(() => {
  //   const handleResize = () => {
  //     triggerConflictCheck();
  //   };
  //   
  //   window.addEventListener('resize', handleResize);
  //   window.addEventListener('scroll', handleResize);
  //   
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //     window.removeEventListener('scroll', handleResize);
  //   };
  // }, [triggerConflictCheck]);

  const registerLabel = useCallback((id: string, label: string, color: string): number => {
    let assignedPosition = 0;
    
    setLabels(prev => {
      // Check if already registered
      const existing = prev.find(l => l.id === id);
      if (existing) {
        assignedPosition = existing.position;
        return prev;
      }

      // Find next available position
      const positions = prev.map(l => l.position).sort((a, b) => a - b);
      assignedPosition = 0;
      for (const pos of positions) {
        if (pos === assignedPosition) {
          assignedPosition++;
        } else {
          break;
        }
      }

      const newElement: DebugElement = { id, label, color, position: assignedPosition };
      return [...prev, newElement].sort((a, b) => a.position - b.position);
    });

    return assignedPosition;
  }, []);

  const registerElement = useCallback((id: string, element: HTMLElement) => {
    setLabels(prev => prev.map(el => 
      el.id === id ? { ...el, element } : el
    ));
  }, []);

  const unregisterLabel = useCallback((id: string) => {
    setLabels(prev => prev.filter(l => l.id !== id));
  }, []);

  return (
    <DebugRegistryContext.Provider value={{ registerLabel, unregisterLabel, registerElement, triggerConflictCheck, labels, conflicts }}>
      {children}
    </DebugRegistryContext.Provider>
  );
}

export function useDebugRegistry() {
  const context = useContext(DebugRegistryContext);
  if (!context) {
    throw new Error('useDebugRegistry must be used within a DebugRegistryProvider');
  }
  return context;
}