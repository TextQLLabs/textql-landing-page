import React from 'react';
import { useDebug } from '../contexts/DebugContext';

interface DebugWrapperProps {
  children: React.ReactNode;
  label?: string;
  color?: string;
  className?: string;
}

export function DebugWrapper({ children, label, color = 'red', className = '' }: DebugWrapperProps) {
  const { debugMode } = useDebug();

  if (!debugMode) {
    return <>{children}</>;
  }

  const colors = {
    red: 'border-red-500 bg-red-500/10',
    blue: 'border-blue-500 bg-blue-500/10',
    green: 'border-green-500 bg-green-500/10',
    yellow: 'border-yellow-500 bg-yellow-500/10',
    purple: 'border-purple-500 bg-purple-500/10',
    pink: 'border-pink-500 bg-pink-500/10',
    orange: 'border-orange-500 bg-orange-500/10',
  };

  return (
    <div className={`relative ${className}`}>
      <div className={`absolute inset-0 border-2 ${colors[color as keyof typeof colors]} pointer-events-none z-10`}>
        {label && (
          <div className={`absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-${color}-500`}>
            {label}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}