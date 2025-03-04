export interface DemoRequestFormProps {
  variant?: 'default' | 'compact' | 'wide';
  theme?: 'dark' | 'light';
  onSubmit?: (email: string) => void;
  className?: string;
}