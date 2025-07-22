import React from 'react';
import { Section, sectionPresets } from '../../ui/Section.enhanced';
import { Button } from '../../ui/Button';
import { Check } from 'lucide-react';

/**
 * Example of multiple pricing sections refactored to use Section component
 * Shows how to handle different section patterns within the same page
 */

// Header section with dark background and animation
export function RefactoredPricingHeader() {
  return (
    <Section
      variant="narrow"
      paddingTop="navbar"
      paddingBottom="xl"
      background="black"
      overflow="hidden"
      animate
    >
      {/* Wave animation background */}
      <div className="absolute inset-0 opacity-20">
        <div className="wave-animation" />
      </div>

      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Simple, Transparent Pricing
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Choose the plan that's right for your team. All plans include a 14-day free trial.
        </p>
      </div>
    </Section>
  );
}

// Main pricing plans section
export function RefactoredPricingPlans() {
  return (
    <Section
      variant="content"
      padding="lg"
      background="secondary"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={plan.name}
            className={`
              rounded-lg p-8 border-2 transition-all
              ${index === 1 
                ? 'border-green-600 shadow-xl scale-105' 
                : 'border-gray-200 dark:border-gray-700'
              }
            `}
          >
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-4xl font-bold">${plan.price}</span>
              <span className="text-gray-600 dark:text-gray-400">/month</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start">
                  <Check className="h-5 w-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={index === 1 ? 'primary' : 'outline'}
              className="w-full"
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
}

// FAQ section with narrow width
export function RefactoredPricingFAQ() {
  return (
    <Section
      variant="narrower"
      padding="xl"
      background="accent"
    >
      <h2 className="text-3xl font-bold text-center mb-12">
        Frequently Asked Questions
      </h2>

      <div className="space-y-8">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
            <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
            <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

// CTA section at the bottom
export function RefactoredPricingCTA() {
  return (
    <Section {...sectionPresets.cta} className="text-center">
      <h2 className="text-3xl font-bold mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
        Join thousands of teams already using TextQL to transform their data workflows.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg">Start Free Trial</Button>
        <Button variant="outline" size="lg">Contact Sales</Button>
      </div>
    </Section>
  );
}

// Sample data
const pricingPlans = [
  {
    name: 'Starter',
    price: 29,
    cta: 'Start Free Trial',
    features: [
      'Up to 5 team members',
      '10GB data storage',
      'Basic analytics',
      'Email support',
    ],
  },
  {
    name: 'Professional',
    price: 99,
    cta: 'Start Free Trial',
    features: [
      'Up to 20 team members',
      '100GB data storage',
      'Advanced analytics',
      'Priority support',
      'API access',
      'Custom integrations',
    ],
  },
  {
    name: 'Enterprise',
    price: 299,
    cta: 'Contact Sales',
    features: [
      'Unlimited team members',
      'Unlimited storage',
      'Enterprise analytics',
      'Dedicated support',
      'Full API access',
      'Custom deployment',
    ],
  },
];

const faqs = [
  {
    question: 'Can I change plans later?',
    answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, ACH transfers, and wire transfers for enterprise accounts.',
  },
  {
    question: 'Is there a setup fee?',
    answer: 'No, there are no setup fees. You only pay for your monthly or annual subscription.',
  },
];