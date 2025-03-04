import { type ReactNode } from 'react';
import { getColorClass } from './utils';
import { type HeadingProps, sizeStyles } from './types';

export function Heading({
  children,
  level = 1,
  color = 'primary',
  theme = 'dark',
  className = '',
  ...props
}: HeadingProps) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  return (
    <Tag
      className={`
        ${sizeStyles[level]}
        ${getColorClass(color, theme)}
        ${className}
      `}
      {...props}
    >
      {children}
    </Tag>
  );
}