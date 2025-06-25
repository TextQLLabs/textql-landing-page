import React from 'react';
import { motion } from 'framer-motion';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  theme?: 'light' | 'dark';
  disabled?: boolean;
}

export const Toggle: React.FC<ToggleProps> = ({ 
  checked, 
  onChange, 
  theme = 'dark',
  disabled = false 
}) => {
  const handleClick = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  const bgColor = checked 
    ? (theme === 'dark' ? 'bg-[#B8D8D0]' : 'bg-[#2A3B35]')
    : (theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300');
    
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <div
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${bgColor} ${disabledClass}`}
      onClick={handleClick}
    >
      <motion.div
        className="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm"
        animate={{
          x: checked ? 24 : 4,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />
    </div>
  );
};

interface ToggleLabelProps {
  children: React.ReactNode;
  htmlFor?: string;
  className?: string;
}

export const ToggleLabel: React.FC<ToggleLabelProps> = ({ 
  children, 
  htmlFor, 
  className = '' 
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${className}`}
    >
      {children}
    </label>
  );
};