export interface DemoRequestFormProps {
  theme?: 'dark' | 'light';
  onSubmit?: (email: string) => void;
  className?: string;
}