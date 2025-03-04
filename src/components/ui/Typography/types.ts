export interface TextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  variant?: 'body' | 'subheader' | 'header' | 'metrics';
  color?: 'primary' | 'secondary' | 'muted';
  theme?: 'dark' | 'light';
}

export interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: 'primary' | 'secondary';
  theme?: 'dark' | 'light';
  children: ReactNode;
}

export const variantStyles = {
  body: 'text-base leading-relaxed font-light',
  subheader: 'text-lg font-light',
  header: 'text-xl font-extralight',
  metrics: 'text-2xl font-light'
};

export const sizeStyles = {
  1: 'text-7xl font-extralight tracking-tight',
  2: 'text-6xl font-extralight tracking-tight',
  3: 'text-5xl font-light tracking-tight',
  4: 'text-4xl font-light',
  5: 'text-3xl font-light',
  6: 'text-2xl font-light'
};