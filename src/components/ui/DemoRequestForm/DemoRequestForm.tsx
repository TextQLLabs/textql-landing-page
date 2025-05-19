import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { Button } from '../Button';
import { Input } from '../Input';
import { handleEmailDemoRequest } from '../../../utils/demo-requests/with-email';
import type { DemoRequestFormProps } from './types';

export function DemoRequestForm({ 
  variant = 'default',
  theme = 'dark',
  onSubmit,
  className = ''
}: DemoRequestFormProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

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
    setError(null);

    if (!isWorkEmail(email)) {
      setError('Please enter a valid work email address');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const result = await handleEmailDemoRequest({
        email,
        pathname: window.location.pathname
      });

      if (result.success) {
        window.open(result.formUrl, '_blank');
        setIsSuccess(true);
        setEmail('');
        onSubmit?.(email);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
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

  const successColors = {
    dark: 'text-emerald-400',
    light: 'text-emerald-600'
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
              setError(null);
              setIsSuccess(false);
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
      
      {isSuccess && (
        <div className={`flex items-center gap-2 text-sm ${successColors[theme]}`}>
          <Check className="w-4 h-4" />
          <p>Successfully submitted! Please check your new tab to complete the form.</p>
        </div>
      )}
    </div>
  );
}