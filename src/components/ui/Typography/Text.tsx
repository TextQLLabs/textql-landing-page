import { type ReactNode } from 'react';
import { getColorClass } from './utils';
import { type TextProps, variantStyles } from './types';
import { useComponentTheme } from '../../../hooks/useComponentTheme';

export function Text({
  children,
  variant = 'body',
  color = 'primary',
  theme,
  className = '',
  ...props
}: TextProps) {
  const globalTheme = useComponentTheme();
  const effectiveTheme = theme || globalTheme;
  return (
    <p
      className={`
        ${variantStyles[variant]}
        ${getColorClass(color, effectiveTheme)}
        ${className}
      `}
      {...props}
    >
      {children}
    </p>
  );
}