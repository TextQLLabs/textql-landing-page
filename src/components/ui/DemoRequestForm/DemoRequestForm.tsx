import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import { Input } from '../Input';
import type { DemoRequestFormProps } from './types';

export function DemoRequestForm({ 
  variant = 'default',
  theme = 'dark',
  onSubmit,
  className = ''
}: DemoRequestFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  // Common personal email domains to block
  const PERSONAL_EMAIL_DOMAINS = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'protonmail.com',
    'mail.com',
    'zoho.com',
    'yandex.com',
    'gmx.com',
    'live.com',
    'me.com',
    'inbox.com'
  ];

  const isWorkEmail = (email: string): boolean => {
    const domain = email.split('@')[1]?.toLowerCase();
    if (!domain) return false;
    
    if (PERSONAL_EMAIL_DOMAINS.includes(domain)) {
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(undefined);

    if (!isWorkEmail(email)) {
      setError('Please enter a valid work email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Store email in session storage for the /demo page to use
      sessionStorage.setItem('demo_email', email);
      onSubmit?.(email);
      navigate('/demo');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // unused
  const variants = {
    default: 'max-w-md w-full space-y-4',
    compact: 'max-w-sm w-full space-y-3',
    small: 'max-w-xs w-full space-y-2',
    wide: 'max-w-xl w-full space-y-4'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
            required
            error={error}
            disabled={isSubmitting}
            theme={theme}
            className={`backdrop-blur-lg ${variant === 'small' || variant === 'compact' ? 'pr-36' : 'pr-60'}`}
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <Button 
              type="submit"
              variant="primary"
              size={variant === 'small' || variant === 'compact' ? 'sm' : 'md'}
              loading={isSubmitting}
              // icon={ArrowRight}
              iconPosition="right"
              disabled={isSubmitting}
              theme={theme}
            >
              Request Demo
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}