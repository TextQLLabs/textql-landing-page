import React, { createContext, useContext, useState, useCallback } from 'react';

interface ThemeControls {
  isLightMode: boolean;
  toggleTheme: () => void;
}

interface CustomTool {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive?: boolean;
  onClick: () => void;
}

interface DevToolsContextType {
  themeControls: ThemeControls | null;
  customTools: CustomTool[];
  setThemeControls: (controls: ThemeControls | null) => void;
  addCustomTool: (tool: CustomTool) => void;
  removeCustomTool: (toolId: string) => void;
}

const DevToolsContext = createContext<DevToolsContextType | undefined>(undefined);

export function DevToolsProvider({ children }: { children: React.ReactNode }) {
  const [themeControls, setThemeControls] = useState<ThemeControls | null>(null);
  const [customTools, setCustomTools] = useState<CustomTool[]>([]);

  const addCustomTool = useCallback((tool: CustomTool) => {
    setCustomTools(prev => {
      // Replace if tool with same ID exists
      const filtered = prev.filter(t => t.id !== tool.id);
      return [...filtered, tool];
    });
  }, []);

  const removeCustomTool = useCallback((toolId: string) => {
    setCustomTools(prev => prev.filter(t => t.id !== toolId));
  }, []);

  return (
    <DevToolsContext.Provider value={{
      themeControls,
      customTools,
      setThemeControls,
      addCustomTool,
      removeCustomTool,
    }}>
      {children}
    </DevToolsContext.Provider>
  );
}

export function useDevToolsConfig() {
  const context = useContext(DevToolsContext);
  if (context === undefined) {
    throw new Error('useDevToolsConfig must be used within a DevToolsProvider');
  }
  return context;
}