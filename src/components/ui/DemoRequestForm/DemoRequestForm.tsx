import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Button';
import type { DemoRequestFormProps } from './types';
import { useComponentTheme } from '../../../hooks/useComponentTheme';
import { getThemeClasses } from '../../../utils/theme-utils';
import { COLORS } from '../../../styles/constants';
import { trackButtonClick } from '../../../utils/analytics';

export function DemoRequestForm({ 
  theme,
  onSubmit,
  className = '',
  buttonText = 'Request Demo'
}: DemoRequestFormProps) {
  const globalTheme = useComponentTheme();
  const effectiveTheme = theme || globalTheme;
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
      sessionStorage.setItem('demo_email', email);
      sessionStorage.setItem('demo_source', window.location.pathname);
      onSubmit?.(email);
      trackButtonClick('Demo Form Submit', 'demo_request_form', { email_domain: email.split('@')[1], destination: 'demo' });
      navigate('/demo');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const themeClasses = getThemeClasses(effectiveTheme === 'light');
  
  const inputStyles = `
    w-full
    bg-white
    border border-gray-300
    !text-gray-900 text-md font-light
    placeholder:text-gray-500
    px-4 py-4 pr-24
    focus:outline-none focus:ring-2 focus:ring-primary-500/30 focus:border-primary-500
    backdrop-blur-md
    transition-colors
    ${error ? 'border-red-400 focus:ring-red-400/30' : ''}
  `;

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="email"
            placeholder="Enter your work email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(undefined);
            }}
            required
            disabled={isSubmitting}
            className={inputStyles.replace(/\s+/g, ' ').trim()}
          />
          <div className="absolute right-2 top-4 bottom-4 flex items-center">
            <Button 
              type="submit"
              variant="primary"
              size="sm"
              loading={isSubmitting}
              disabled={isSubmitting}
              theme={effectiveTheme}
            >
              {buttonText}
            </Button>
          </div>
        </div>
        
        {/* Error message with reserved space */}
        <div className="h-6">
          {error && (
            <p className={`text-sm font-light transition-opacity duration-200 ${
              effectiveTheme === 'dark' ? 'text-red-400' : 'text-red-500'
            }`}>
              {error}
            </p>
          )}
        </div>
      </form>
    </div>
  );
}