export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'solid';
  size?: 'sm' | 'md';
  theme?: 'dark' | 'light';
  children: ReactNode;
}