import { type ReactNode } from 'react';
import { type BadgeProps } from './types';
import { baseStyles, variants, sizes } from './styles';

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  theme = 'dark',
  className = '',
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        ${baseStyles}
        ${variants[variant][theme]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}