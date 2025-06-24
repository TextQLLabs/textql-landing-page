export interface DemoRequestFormProps {
  variant?: 'default' | 'compact' | 'small' | 'wide';
  theme?: 'dark' | 'light';
  onSubmit?: (email: string) => void;
  className?: string;
}