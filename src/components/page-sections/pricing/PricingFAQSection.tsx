import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Text, Section } from '../../ui';

const faqs = [
  {
    question: 'Are there limits on Seats or Data Sources?',
    answer: 'No limits. You get infinite seats and can connect as many data sources as you need.'
  },
  {
    question: 'What is the impact on Warehouse Costs?',
    answer: 'The impact is minimal. You will only pay approximately $0.01 in warehouse costs for every $1.00 of TextQL work.'
  },
  {
    question: 'What happens if we run out of ACUs?',
    answer: 'We provide optimized usage assistance and plan expansion options. For mission-critical workloads, we can provide temporary ACU credits to ensure business continuity.'
  },
  {
    question: 'Are there Software Implementation Fees?',
    answer: 'No additional fees for extensive commitments. For multi-year agreements, we offer Forward Deployed AI Engineering services to ensure successful implementation.'
  },
  {
    question: 'Do unused ACUs roll over?',
    answer: 'Yes, unused ACUs roll over to the next year, ensuring you never lose the value of your investment.'
  },
  {
    question: 'Can we control Always-On Feature Usage?',
    answer: 'Yes, customization settings allow you to have full control over ACU usage for always-on features.'
  }
];

export function PricingFAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <Section
      variant="narrower"
      padding="lg"
      background="accent"
    >
        <Text variant="header" theme="light" className="text-3xl text-center mb-12">
          Frequently Asked Questions
        </Text>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <button
              key={index}
              onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
              className="w-full text-left bg-white border border-[#2A3B35]/10 shadow-sm hover:border-[#2A3B35]/20 transition-colors"
            >
              <div className="p-6 flex justify-between items-center">
                <Text theme="light" className="font-medium">{faq.question}</Text>
                <ChevronDown
                  className={`
                    w-5 h-5 text-[#2A3B35] transition-transform
                    ${expandedFaq === index ? 'rotate-180' : ''}
                  `}
                />
              </div>
              {expandedFaq === index && (
                <div className="px-6 pb-6">
                  <Text theme="light" color="muted">{faq.answer}</Text>
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Text theme="light" color="muted">
            Additional Questions? Contact us at{' '}
            <a href="mailto:support@textql.com" className="text-[#2A3B35] hover:underline">
              support@textql.com
            </a>
            {' '}for more information.
          </Text>
        </div>
    </Section>
  );
}