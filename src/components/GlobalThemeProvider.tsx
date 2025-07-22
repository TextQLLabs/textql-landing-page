import React, { createContext, useContext, useState, useEffect } from 'react';

interface GlobalThemeContextType {
  isLightMode: boolean;
  toggleTheme: () => void;
}

const GlobalThemeContext = createContext<GlobalThemeContextType | undefined>(undefined);

export function GlobalThemeProvider({ children }: { children: React.ReactNode }) {
  // Global theme state with localStorage persistence
  const [isLightMode, setIsLightMode] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('globalThemeMode');
        return saved ? saved === 'light' : true; // default to light
      } catch (e) {
        return true;
      }
    }
    return true;
  });

  const toggleTheme = () => {
    setIsLightMode(prev => !prev);
  };

  // Save theme preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('globalThemeMode', isLightMode ? 'light' : 'dark');
      } catch (e) {
        console.warn('Failed to save theme preference:', e);
      }
    }
  }, [isLightMode]);

  // Apply global theme class to body
  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add('global-light-mode');
      document.body.classList.remove('global-dark-mode');
    } else {
      document.body.classList.add('global-dark-mode');
      document.body.classList.remove('global-light-mode');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('global-light-mode', 'global-dark-mode');
    };
  }, [isLightMode]);

  return (
    <GlobalThemeContext.Provider value={{ isLightMode, toggleTheme }}>
      {children}
    </GlobalThemeContext.Provider>
  );
}

export function useGlobalTheme() {
  const context = useContext(GlobalThemeContext);
  if (context === undefined) {
    throw new Error('useGlobalTheme must be used within a GlobalThemeProvider');
  }
  return context;
}