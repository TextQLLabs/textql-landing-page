export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'as'> {
  label?: string;
  error?: string;
  hint?: string;
  fullWidth?: boolean;
  as?: 'input' | 'textarea';
  rows?: number;
  theme?: 'dark' | 'light';
}