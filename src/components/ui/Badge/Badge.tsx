import { type ReactNode } from 'react';
import { type BadgeProps } from './types';
import { baseStyles, variants, sizes } from './styles';
import { useComponentTheme } from '../../../hooks/useComponentTheme';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  theme,
  className = '',
  ...props
}: BadgeProps) {
  const globalTheme = useComponentTheme();
  const effectiveTheme = theme || globalTheme;
  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant][effectiveTheme]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}