import { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { type SelectProps } from './types';
import { getBaseStyles } from './styles';

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  error,
  hint,
  fullWidth = false,
  options,
  className = '',
  ...props
}, ref) => {
  const baseStyles = getBaseStyles(error);

  return (
    <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && (
        <label className="block text-sm font-light text-[#B8D8D0] mb-2">
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
              className="bg-[#004D40] text-[#B8D8D0]"
            >
              {label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#B8D8D0]/60" />
      </div>
      {(error || hint) && (
        <p className={`mt-2 text-sm font-light ${
          error ? 'text-red-400' : 'text-[#B8D8D0]/60'
        }`}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

Select.displayName = 'Select';