import { forwardRef } from 'react';
import { type InputProps } from './types';
import { getBaseStyles } from './styles';
import { ExternalLinkIcon } from 'lucide-react';

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps & { link?: string }>(({
  label,
  error,
  hint,
  fullWidth = false,
  className = '',
  as = 'input',
  rows = 3,
  theme = 'dark',
  link,
  ...props
}, ref) => {
  const Component = as;
  const baseStyles = getBaseStyles(error, theme);

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (link ? (
        <label className={`block text-xs font-medium tracking-wide ${
          theme === 'dark' ? 'text-[#B8D8D0]/80' : 'text-[#2A3B35]/80'
        } mb-2`}>
        <a href={link} target="_blank" rel="noopener noreferrer" className="underline flex items-top">
          {label}
          <ExternalLinkIcon className="w-3 h-3 inline-block ml-1" />
        </a>
        </label>
      ) : (
        <label className={`block text-xs font-medium tracking-wide ${
          theme === 'dark' ? 'text-[#B8D8D0]/80' : 'text-[#2A3B35]/80'
        } mb-2`}>
          {label}
        </label>
      ))}
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