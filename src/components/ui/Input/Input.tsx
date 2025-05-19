import { forwardRef } from 'react';
import { type InputProps } from './types';
import { getBaseStyles } from './styles';

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  label,
  error,
  hint,
  fullWidth = false,
  className = '',
  as = 'input',
  rows = 3,
  theme = 'dark',
  ...props
}, ref) => {
  const Component = as;
  const baseStyles = getBaseStyles(error, theme);

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className={`block text-xs font-medium tracking-wide ${
          theme === 'dark' ? 'text-[#B8D8D0]/80' : 'text-[#2A3B35]/80'
        } mb-2`}>
          {label}
        </label>
      )}
      <Component
        ref={ref as any}
        className={`${baseStyles} ${className}`}
        rows={as === 'textarea' ? rows : undefined}
        {...props}
      />
      {(error || hint) && (
        <p className={`mt-2 text-sm font-light ${
          error ? 'text-red-400' : theme === 'dark' ? 'text-[#B8D8D0]/60' : 'text-[#2A3B35]/60'
        }`}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';