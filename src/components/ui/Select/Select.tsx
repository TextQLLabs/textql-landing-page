import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { type SelectProps } from './types';
import { getBaseStyles } from './styles';
import { useComponentTheme } from '../../../hooks/useComponentTheme';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  hint,
  fullWidth = false,
  options,
  theme,
  className = '',
  ...props
}, ref) => {
  const globalTheme = useComponentTheme();
  const effectiveTheme = theme || globalTheme;
  const baseStyles = getBaseStyles(error, effectiveTheme);

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className={`block text-sm font-light mb-2 ${
          effectiveTheme === 'dark' ? 'text-[#B8D8D0]' : 'text-[#2A3B35]'
        }`}>
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={`${baseStyles} ${className}`}
          {...props}
        >
          {options.map(({ value, label }) => (
            <option 
              key={value} 
              value={value}
              className={effectiveTheme === 'dark' ? 'bg-[#004D40] text-[#B8D8D0]' : 'bg-white text-[#2A3B35]'}
            >
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${
          effectiveTheme === 'dark' ? 'text-[#B8D8D0]/60' : 'text-[#2A3B35]/60'
        }`} />
      </div>
      {(error || hint) && (
        <p className={`mt-2 text-sm font-light ${
          error ? 'text-red-400' : effectiveTheme === 'dark' ? 'text-[#B8D8D0]/60' : 'text-[#2A3B35]/60'
        }`}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';