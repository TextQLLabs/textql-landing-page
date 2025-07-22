import { type ReactNode } from 'react';
import { type CardProps } from './types';
import { baseStyles, variants, paddings } from './styles';
import { useComponentTheme } from '../../../hooks/useComponentTheme';

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  theme,
  className = '',
  ...props
}: CardProps) {
  const globalTheme = useComponentTheme();
  const effectiveTheme = theme || globalTheme;
  return (
    <div
      className={`
        ${baseStyles[effectiveTheme]}
        ${variant === 'elevated' ? variants.elevated[effectiveTheme] : ''}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}