import React from 'react';
import { useComponentTheme } from '../../hooks/useComponentTheme';
import { themeBackgroundSecondary } from '../../utils/theme-utils';
import { Section } from '../ui/Section';

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

interface FaqSectionProps {
  name?: string;
  faqItems?: FaqItem[];
  rawText?: React.ReactNode;
}

export default function FaqSection({ name, faqItems, rawText }: FaqSectionProps) {
  const theme = useComponentTheme();
  
  // Don't render anything if no content is provided
  if (!rawText && (!faqItems || faqItems.length === 0)) {
    return null;
  }

  return (
    <Section
      variant="content"
      padding="md"
      background="secondary"
    >
      {/* Render raw text if provided */}
      {rawText && (
        <div className={`text-base lg:text-lg font-light leading-relaxed mb-8 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>
          {rawText}
        </div>
      )}

      {/* Render FAQ section if faqItems are provided */}
      {faqItems && faqItems.length > 0 && (
        <>
          {name && (
            <h2 className={`text-2xl lg:text-3xl text-center lg:text-left font-extralight mb-12 ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>FAQ on integrating with {name}</h2>
          )}
          
          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <details 
                key={index} 
                className={`border rounded-lg overflow-hidden group ${theme === 'light' ? 'border-[#2A3B35]/20' : 'border-[#0A1F1C]'}`}
              >
                <summary className={`flex justify-between items-center p-6 cursor-pointer text-base lg:text-xl font-light ${theme === 'light' ? 'text-[#2A3B35]' : 'text-[#B8D8D0]'}`}>
                  {item.question}
                  <span className="transform group-open:rotate-180 transition-transform duration-200">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 15L18 9L16.6 7.6L12 12.2L7.4 7.6L6 9L12 15Z" fill={theme === 'light' ? '#2A3B35' : '#B8D8D0'}/>
                    </svg>
                  </span>
                </summary>
                <div className={`p-6 pt-0 font-light border-t ${theme === 'light' ? 'text-[#4A665C] border-[#2A3B35]/20' : 'text-[#729E8C] border-[#0A1F1C]'}`}>
                  <p className={`text-xs lg:text-md font-light leading-relaxed mt-2 ${theme === 'light' ? 'text-[#4A665C]' : 'text-[#729E8C]'}`}>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </>
      )}
    </Section>
  );
} 