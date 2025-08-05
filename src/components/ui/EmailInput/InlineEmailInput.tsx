import { useState } from 'react';
import { Button } from '../Button';
import { trackButtonClick } from '../../../utils/analytics';
import { handleEmailDemoRequest } from '../../../utils/demo-requests/with-email';
import { DEMO_CONFIG } from '../../../utils/constants';

interface InlineEmailInputProps {
  theme: 'light' | 'dark';
  placeholder?: string;
  buttonText?: string;
  onSubmit?: (email: string) => void;
}

export function InlineEmailInput({ 
  theme = 'dark', 
  placeholder = "Enter your email", 
  buttonText = "Get Started",
  onSubmit
}: InlineEmailInputProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!isValidEmail(email.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      // Track the button click
      trackButtonClick(buttonText, 'inline_email_input', { destination: 'demo_with_email', email });

      // Send email to Slack and get form URL
      const result = await handleEmailDemoRequest({
        email: email.trim(),
        pathname: '/home-hero'
      });

      // Call onSubmit callback if provided
      if (onSubmit) {
        onSubmit(email.trim());
      }

      // Redirect to the form (this will be the second page since we already have the email)
      window.location.href = result.formUrl;
    } catch (error) {
      console.error('Error submitting email:', error);
      setError('Something went wrong. Please try again.');
      setIsSubmitting(false);
    }
  };

  const inputClasses = theme === 'light' 
    ? 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[#2A3B35] focus:ring-[#2A3B35]'
    : 'bg-gray-900 border-gray-600 text-white placeholder-gray-400 focus:border-[#729E8C] focus:ring-[#729E8C]';

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg">
      <div className="flex flex-col sm:flex-row gap-3 items-start">
        <div className="flex-1">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(''); // Clear error when user starts typing
            }}
            placeholder={placeholder}
            className={`
              w-full px-4 py-3 rounded-lg border-2 transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-opacity-50 h-[48px]
              ${inputClasses}
              ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}
            `}
            disabled={isSubmitting}
          />
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
        <Button
          type="submit"
          variant="primary"
          theme={theme}
          disabled={isSubmitting}
          className="whitespace-nowrap h-[48px]"
        >
          {isSubmitting ? 'Submitting...' : buttonText}
        </Button>
      </div>
    </form>
  );
}