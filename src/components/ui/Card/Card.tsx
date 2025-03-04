import { type ReactNode } from 'react';
import { type CardProps } from './types';
import { baseStyles, variants, paddings } from './styles';

export function Card({
  children,
  variant = 'default',
  padding = 'md',
  theme = 'dark',
  className = '',
  ...props
}: CardProps) {
  return (
    <div
      className={`
        ${baseStyles[theme]}
        ${variant === 'elevated' ? variants.elevated[theme] : ''}
        ${paddings[padding]}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
}