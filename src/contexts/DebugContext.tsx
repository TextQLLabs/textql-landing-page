import React, { createContext, useContext, useState, useEffect } from 'react';

interface DebugContextType {
  debugMode: boolean;
  toggleDebug: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: React.ReactNode }) {
  const [debugMode, setDebugMode] = useState(() => {
    // Safely check localStorage only in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        const saved = localStorage.getItem('debugMode');
        return saved === 'true';
      } catch (e) {
        console.warn('Failed to access localStorage:', e);
        return false;
      }
    }
    return false;
  });

  useEffect(() => {
    // Safely write to localStorage only in browser environment
    if (typeof window !== 'undefined' && window.localStorage) {
      try {
        localStorage.setItem('debugMode', debugMode.toString());
      } catch (e) {
        console.warn('Failed to write to localStorage:', e);
      }
    }
  }, [debugMode]);

  useEffect(() => {
    // Listen for ESC key toggle event
    const handleToggleEvent = () => {
      if (debugMode) {
        setDebugMode(false);
      }
    };

    document.addEventListener('toggleDebugMode', handleToggleEvent);
    
    return () => {
      document.removeEventListener('toggleDebugMode', handleToggleEvent);
    };
  }, [debugMode]);

  const toggleDebug = () => {
    setDebugMode(prev => !prev);
  };

  return (
    <DebugContext.Provider value={{ debugMode, toggleDebug }}>
      {children}
    </DebugContext.Provider>
  );
}

export function useDebug() {
  const context = useContext(DebugContext);
  if (context === undefined) {
    throw new Error('useDebug must be used within a DebugProvider');
  }
  return context;
}