import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
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
      
      // Submit the hidden form to open in new tab
      const hiddenForm = document.getElementById('hidden-demo-form') as HTMLFormElement;
      hiddenForm.submit();
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const variants = {
    default: 'max-w-md w-full space-y-4',
    compact: 'max-w-sm w-full space-y-3',
    wide: 'max-w-xl w-full space-y-4'
  };

  return (
    <div className={`${variants[variant]} ${className}`}>
      {/* Hidden form for new tab submission */}
      <form id="hidden-demo-form" action="/demo" target="_blank" className="hidden" />
      
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
            className="bg-opacity-10 backdrop-blur-lg"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <Button 
              type="submit"
              variant="primary"
              size="sm"
              loading={isSubmitting}
              icon={ArrowRight}
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