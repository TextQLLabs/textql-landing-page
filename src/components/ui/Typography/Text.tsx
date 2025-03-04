import { type ReactNode } from 'react';
import { getColorClass } from './utils';
import { type TextProps, variantStyles } from './types';

export function Text({
  children,
  variant = 'body',
  color = 'primary',
  theme = 'dark',
  className = '',
  ...props
}: TextProps) {
  return (
    <p
      className={`
        ${variantStyles[variant]}
        ${getColorClass(color, theme)}
        ${className}
      `}
      {...props}
    >
      {children}
    </p>
  );
}