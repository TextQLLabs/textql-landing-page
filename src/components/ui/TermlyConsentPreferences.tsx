import React from 'react';

interface TermlyConsentPreferencesProps {
  children?: React.ReactNode;
  className?: string;
}

/**
 * Termly Consent Preferences Link Component
 * 
 * This component renders a link that opens Termly's consent management preference center.
 * Required by GDPR and other regulations to allow visitors to change their consent preferences.
 * 
 * @param children - Custom content for the link (defaults to "Consent Preferences")
 * @param className - Additional CSS classes to apply to the link
 */
export default function TermlyConsentPreferences({ 
  children = "Consent Preferences", 
  className = "" 
}: TermlyConsentPreferencesProps) {
  return (
    <a 
      href="#" 
      className={`termly-display-preferences ${className}`}
      role="button"
      aria-label="Open consent preferences to manage your privacy settings"
    >
      {children}
    </a>
  );
}