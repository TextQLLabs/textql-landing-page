export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  theme?: 'light' | 'dark';
  options: Array<{ value: string; label: string }>;
}