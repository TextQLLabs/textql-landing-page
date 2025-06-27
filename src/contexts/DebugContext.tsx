import React, { createContext, useContext, useState, useEffect } from 'react';

interface DebugContextType {
  debugMode: boolean;
  toggleDebug: () => void;
}

const DebugContext = createContext<DebugContextType | undefined>(undefined);

export function DebugProvider({ children }: { children: React.ReactNode }) {
  const [debugMode, setDebugMode] = useState(() => {
    const saved = localStorage.getItem('debugMode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('debugMode', debugMode.toString());
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