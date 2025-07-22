import React from 'react';
import { useDebug } from '../contexts/DebugContext';
import { DebugWrapper } from './DebugWrapper';

interface PageDebugWrapperProps {
  children: React.ReactNode;
  pageName: string;
}

export function PageDebugWrapper({ children, pageName }: PageDebugWrapperProps) {
  // In production, always just render children
  if (import.meta.env.PROD) {
    return <>{children}</>;
  }

  const { debugMode } = useDebug();

  if (!debugMode) {
    return <>{children}</>;
  }

  return (
    <DebugWrapper label={`Page: ${pageName}`} color="yellow" className="min-h-screen">
      <div className="relative">
        {/* Page content with additional debug sections */}
        <DebugWrapper label="Page Content" color="blue" className="relative">
          {children}
        </DebugWrapper>
      </div>
    </DebugWrapper>
  );
}